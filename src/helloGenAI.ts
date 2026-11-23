import dotenv from "dotenv";
import { ChatOpenAI } from "@langchain/openai";
import {ChatGoogleGenerativeAI} from "@langchain/google-genai";

dotenv.config();

// const llm = new ChatOpenAI();
const llm = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite",
  streaming: true,
});

console.log("Sending request to model...");
const response = await llm.invoke("Describe role of AI engineer in 50 words?", {
//   signal: AbortSignal.timeout(10_000),
});

console.log(response.content);