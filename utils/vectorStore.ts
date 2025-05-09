import { Document } from "langchain/document";
import fs from "fs";
import path from "path";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Create a singleton instance of MemoryVectorStore
const vectorStore = new MemoryVectorStore(embeddings);

// Function to chunk text into smaller pieces with overlap
function chunkText(
  text: string,
  chunkSize: number = 1000,
  overlap: number = 200
): string[] {
  const chunks: string[] = [];
  let currentChunk = "";
  let currentLength = 0;

  // Split into sentences while preserving sentence boundaries
  const sentences = text.split(/(?<=[.!?])\s+/);

  for (const sentence of sentences) {
    const sentenceLength = sentence.length;

    if (currentLength + sentenceLength > chunkSize) {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
        // Keep the last part of the chunk for overlap
        const words = currentChunk.split(/\s+/);
        const overlapWords = words.slice(-Math.floor(overlap / 5)).join(" ");
        currentChunk = overlapWords + " " + sentence;
        currentLength = currentChunk.length;
      } else {
        currentChunk = sentence;
        currentLength = sentenceLength;
      }
    } else {
      currentChunk += (currentChunk ? " " : "") + sentence;
      currentLength += sentenceLength;
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

// Function to process JSON files and store them in memory
export async function processAndStoreJsonFiles() {
  const dataDir = path.join(process.cwd(), "public", "data");
  const files = fs.readdirSync(dataDir);

  for (const file of files) {
    if (file.endsWith(".json")) {
      console.log(`Processing ${file}`);
      const filePath = path.join(dataDir, file);
      const content = fs.readFileSync(filePath, "utf-8");
      const data = JSON.parse(content);

      // Convert the data to a string representation with better formatting
      const textContent = JSON.stringify(data, null, 2);

      // Split the content into chunks with overlap
      const chunks = chunkText(textContent);

      // Create documents for each chunk with enhanced metadata
      const documents = chunks.map(
        (chunk, i) =>
          new Document({
            pageContent: chunk,
            metadata: {
              source: file,
              chunkIndex: i,
              totalChunks: chunks.length,
              fileType: path.basename(file, ".json"),
            },
          })
      );

      // Add documents to vector store
      await vectorStore.addDocuments(documents);
    }
  }
}

// Function to search for relevant content with improved relevance scoring
export async function searchRelevantContent(query: string, topK: number = 5) {
  // Search in memory with similarity scores
  const searchResults = await vectorStore.similaritySearchWithScore(
    query,
    topK
  );

  // Filter and format results based on relevance threshold
  const relevanceThreshold = 0.7;
  const relevantResults = searchResults
    .filter(([_, score]) => score > relevanceThreshold)
    .map(([doc, score]) => ({
      content: doc.pageContent,
      score,
      metadata: doc.metadata,
    }));

  // Sort results by score and format context
  const sortedResults = relevantResults.sort((a, b) => b.score - a.score);

  // Format context with source information and relevance scores
  const context = sortedResults
    .map(
      (result) =>
        `[Source: ${result.metadata.fileType}, Relevance: ${(
          result.score * 100
        ).toFixed(1)}%]\n${result.content}`
    )
    .join("\n\n");

  return context;
}
