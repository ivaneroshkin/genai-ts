import { PromptTemplate } from '@langchain/core/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { LLMChain } from '@langchain/classic/chains';

import dotenv from 'dotenv';

dotenv.config();

export async function personalisedPitch(
    course: string,
    role: string,
    wordLimit: number
) {
    const promptTemplate = new PromptTemplate({
        template: "Describe the importance of learning {course} for a {role}. Limit your output to {wordLimit} words.",
        inputVariables: ["course", "role", "wordLimit"],
    });

    const formattedPrompt = await promptTemplate.format({
        course,
        role,
        wordLimit,
    });

    console.log("Formatted Prompt:", formattedPrompt);

    const llm = new ChatGoogleGenerativeAI({
        model: "gemini-3.5-flash-lite",
    })

    const outputParser = new StringOutputParser();

    // Option 1 - Langchain Legacy Chain
    const legacyLlmChain = new LLMChain({
        llm,
        prompt: promptTemplate,
        outputParser,
    })

    const answer = await legacyLlmChain.invoke({
        course,
        role,
        wordLimit,
    })

    console.log("Answer from Legacy LLM Chain:", answer);
}

