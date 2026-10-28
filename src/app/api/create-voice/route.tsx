import axios from "axios";
import { NextResponse } from "next/server";



export async function POST(req: Request) {

    try{
        const { script,voiceId } = await req.json();

        if (!script || !voiceId) {
            return NextResponse.json(
                { error: "script and voiceId are required" },
                { status: 400 }
            )
        }

        const result = await axios.post('https://api.heygen.com/v3/voices', {
            script,
            "voice_id": voiceId,
            "rate": "100%"
        }, 
        {
            headers:{
                Authorization: `Bearer ${process.env.HEYGEN_API_KEY}`,
                "Content-Type": "application/json",
            }
        });
        return NextResponse.json(result.data)
    } catch (err: any) {
        console.log("HeyGen voice API error: ",  err.response?.data ?? err.message)

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
    
    

    
}