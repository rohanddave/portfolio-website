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

// Function to chunk text into smaller pieces
function chunkText(text: string, chunkSize: number = 1000): string[] {
  const chunks: string[] = [];
  let currentChunk = "";

  const sentences = text.split(/[.!?]+/);

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > chunkSize) {
      if (currentChunk) chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += (currentChunk ? " " : "") + sentence;
    }
  }

  if (currentChunk) chunks.push(currentChunk.trim());
  return chunks;
}

// Function to process JSON files and store them in memory
export async function processAndStoreJsonFiles() {
  const dataDir = path.join(process.cwd(), "public", "data");
  const files = fs.readdirSync(dataDir);

  for (const file of files) {
    if (file.endsWith(".json")) {
      const filePath = path.join(dataDir, file);
      const content = fs.readFileSync(filePath, "utf-8");
      const data = JSON.parse(content);

      // Convert the data to a string representation
      const textContent = JSON.stringify(data, null, 2);

      // Split the content into chunks
      const chunks = chunkText(textContent);

      // Create documents for each chunk
      const documents = chunks.map(
        (chunk, i) =>
          new Document({
            pageContent: chunk,
            metadata: {
              source: file,
              chunkIndex: i,
            },
          })
      );

      // Add documents to vector store
      await vectorStore.addDocuments(documents);
    }
  }
}

// Function to search for relevant content
export async function searchRelevantContent(query: string, topK: number = 3) {
  // Search in memory
  const searchResults = await vectorStore.similaritySearch(query, topK);

  // Combine the results into a single context string
  const context = searchResults
    .map((result) => result.pageContent)
    .join("\n\n");

  return context;
}
