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
    const context = await searchRelevantContent(message, 25);

    const contactEmail = "dave.ro@northeastern.edu";
    const contactLinkedin = "linkedin.com/in/rohandave";

    // Create the prompt with context
    const prompt = `You are an AI assistant for Rohan Dave's portfolio website. Use the following context to provide accurate and relevant responses about Rohan's education, experience, projects, skills, and achievements.

Context from portfolio data:
${context}

User message: ${message}

Instructions:
1. Base your response primarily on the provided context. Do not mention the context in your response.
2. If the context doesn't contain relevant information, respond with: "I don't have enough information to answer that question. Please contact Rohan directly at ${contactEmail} or connect with him on LinkedIn at ${contactLinkedin}."
3. If the user asks about Rohan's contact information, respond with: "You can contact Rohan directly at ${contactEmail} or connect with him on LinkedIn at ${contactLinkedin}."
3. Present information in a clear, concise and professional manner suitable for recruiters and tech professionals
4. Provide examples of Rohan's education, work experience, projects, skills, achievements and testimonials when relevant
5. Keep responses under 3-4 sentences unless specifically asked for more detail
6. Focus on the most relevant information only

Please provide a helpful response based on these guidelines.`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant for Rohan Dave's portfolio website. Rohan is a skilled software engineer with expertise in full-stack development, AI development, and quantum computing. This website is primarily visited by recruiters and tech professionals. Always present Rohan's experience, skills, and achievements in a positive and professional light. Use the provided context to give accurate and relevant responses. If the context doesn't contain the information needed to answer the question, say so politely. Keep responses concise and to the point.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 250,
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
