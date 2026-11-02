import axios from "axios";
import { NextResponse } from "next/server";



export async function POST(req: Request) {

    try{
        const { script, voiceId } = await req.json();

        if (!script || !voiceId) {
            return NextResponse.json(
                { error: "script and voiceId are required" },
                { status: 400 }
            )
        }

        const result = await axios.post('https://api.heygen.com/v3/voices/speech' , {
            "text": script,
            "voice_id": voiceId,
            // "rate": "100%"
        }, 
        {
            headers:{
                "X-Api-Key": process.env.HEYGEN_API_KEY,
                "Content-Type": "application/json",
            },
            timeout: 160000
        });
        return NextResponse.json(result.data)
        console.log(result.data.data)
    } catch (err: any) {
        console.log("HeyGen voice API error: ",  err.response?.data ?? err.message)

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
    
    

    
}
