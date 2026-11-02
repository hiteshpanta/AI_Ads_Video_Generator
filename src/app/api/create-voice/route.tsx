import axios from "axios";
import { NextResponse } from "next/server";
import OpenAI from "openai";



// export async function POST(req: Request) {

//     try{
//         const { script, voiceId } = await req.json();

//         if (!script || !voiceId) {
//             return NextResponse.json(
//                 { error: "script and voiceId are required" },
//                 { status: 400 }
//             )
//         }

//         const result = await axios.post('https://api.heygen.com/v3/voices/speech' , {
//             "text": script,
//             "voice_id": voiceId,
//             // "rate": "100%"
//         }, 
//         {
//             headers:{
//                 "X-Api-Key": process.env.HEYGEN_API_KEY,
//                 "Content-Type": "application/json",
//             },
//             timeout: 160000
//         });
//         return NextResponse.json(result.data)
//         console.log(result.data.data)

//         const generatedVoiceId = result?.data?.data?._id
//     } catch (err: any) {
//         console.log("HeyGen voice API error: ",  err.response?.data ?? err.message)

//         return NextResponse.json(
//             { error: "Internal server error" },
//             { status: 500 }
//         )
//     }
    
    

    
// }




export const createVoiceApi = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1/audio/speech',
    apiKey: process.env.OPENROUTER_API_KEY,
    // defaultHeaders: {

    // }
})


export async function POST(req: Request) {


    try{

        
        const { script, voiceId } = await req.json();

        if (!script || !voiceId) {
            return NextResponse.json(
                { error: "script and voiceId are required" },
                { status: 400 }
            )
        }

        const result = await createVoiceApi.audio.speech.create('https://api.heygen.com/v3/voices/speech' , {
            "model": 'heygen/heygen-voice-1-turbo:free',
            "input": script,
            "voice_id": voiceId,
            // "rate": "100%"
        })

        const generatedVoiceId = result?.data?.data?._id;

        const poll = async (retries = 10, interval =2000) => {
            for(let i=0; i<retries; i++){
                const pollRes = await axios.get('' + generatedVoiceId,
                    {
                        headers: {
                            "Authorization": ``,
                                    
                        }
                    }
                );

                const status = pollRes?.data?.data.status

                if(status === 3){
                    return pollRes?.data?.url;
                } else if (status === 4) {
                    throw new Error("Audio Processing Failed")
                } 

                await new Promise(resolve => setTimeout(resolve, interval))

            }

            
        }

        const audioUrl = await poll(10, 2000)
        
        return NextResponse.json({ audioUrl: audioUrl})
        

        
    } catch (err: any) {
        console.log("HeyGen voice API error: ",  err.response?.data ?? err.message)

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
    
    

    
}
