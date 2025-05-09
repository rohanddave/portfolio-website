import { NextResponse } from "next/server";
import OpenAI from "openai";
import {
  searchRelevantContent,
  processAndStoreJsonFiles,
} from "@/utils/vectorStore";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Flag to track if vector store is initialized
let isVectorStoreInitialized = false;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Initialize vector store if not already done
    if (!isVectorStoreInitialized) {
      await processAndStoreJsonFiles();
      isVectorStoreInitialized = true;
    }

    // Get relevant context from vector store
    const context = await searchRelevantContent(message);

    // Create the prompt with context
    const prompt = `Context from portfolio data:\n${context}\n\nUser message: ${message}\n\nPlease provide a helpful response based on the context provided. If the context doesn't contain the information needed to answer the question, say so politely.`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant for Rohan Dave's portfolio website. Rohan is a skilled software engineer with expertise in full-stack development, AI development, and quantum computing. This website is primarily visited by recruiters and tech professionals. Always present Rohan's experience, skills, and achievements in a positive and professional light. Use the provided context to give accurate and relevant responses. If the context doesn't contain the information needed to answer the question, say so politely. Focus on highlighting Rohan's technical capabilities, problem-solving skills, and professional achievements.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const response =
      completion.choices[0]?.message?.content || "No response generated";

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
