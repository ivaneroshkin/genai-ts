import { PromptTemplate } from '@langchain/core/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableSequence } from '@langchain/core/runnables';

import dotenv from 'dotenv';

dotenv.config();

export async function personalisedPitchFromLcel(
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

    // Option 2 LCEL chain
    // const lcelChain = promptTemplate.pipe(llm).pipe(outputParser);
    const lcelChain = RunnableSequence.from([promptTemplate, llm, outputParser]);
    const lcelResponse = await lcelChain.invoke({
        course,
        role,
        wordLimit,
    });

    console.log("Answer from LCEL Chain:", lcelResponse);
}

