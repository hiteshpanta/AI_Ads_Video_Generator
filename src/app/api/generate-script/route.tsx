
import { NextResponse } from "next/server"
import OpenAI from "openai"
import { GENERATE_SCRIPT_PROMPT } from "../../../../services/prompt";

export const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
    })

export async function POST(req: Request) {
    const body = await req.json()
    const { topic } = await body;

    if (!topic) {
        return NextResponse.json(
            { error: "Topic is required" },
            { status: 400 }
        );
    }

    const PROMPT = GENERATE_SCRIPT_PROMPT.replace('{topic}', topic)

    try {
        const completion = await openai.chat.completions.create({
        model: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
        messages: [
            { role: "user", content: PROMPT }
            ],
        })


        const content = completion?.choices[0]?.message?.content;

        console.log("AI RESPONSE:", content);

        if (!content) {
            return NextResponse.json(
                {error: "No response from AI"},
                { status: 500 }
            )
        }

        return NextResponse.json(content);
        
    } catch (err: any) {
        console.error("API ERROR:", err);

        return NextResponse.json(
            { error: err.message || "Internal Server Error"},
            { status: 500 }
        );
        
    }
    
    



    
}