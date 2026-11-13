// import axios from "axios";
// import { NextResponse } from "next/server";




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



// import axios from "axios";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

// export const createVoiceApi = new OpenAI({
//     baseURL: 'https://openrouter.ai/api/v1/audio/speech',
//     apiKey: process.env.OPENROUTER_API_KEY,
//     // defaultHeaders: {

//     // }
// })


function pcmToWav(pcm: Buffer, sampleRate = 44100, channels = 1 ) {
    const header = Buffer.alloc(44);


    header.write("RIFF", 0);
    header.writeUInt32LE(36 + pcm.length, 4);
    header.write("WAVE", 8);
    header.write("fmt ", 12);
    header.writeUInt32LE(16, 16);
    header.writeUInt16LE(1, 20);
    header.writeUInt16LE(channels, 22);
    header.writeUInt32LE(sampleRate, 24);
    header.writeUInt32LE(sampleRate * channels * 2, 28);
    header.writeUInt16LE(channels * 2, 32);
    header.writeUInt16LE(16, 34);
    header.write("data", 36);
    header.writeUInt32LE(pcm.length, 40);

    return Buffer.concat([header, pcm]);
}


export async function POST(req: Request) {


    try{
        const body = await req.json();

        console.log("========== VOICE API DEBUG ==========");
        console.log("Request body:", JSON.stringify(body, null, 2));
        console.log("Script type:", typeof body.script);
        console.log("Script length:", body.script?.length);
        console.log("Voice ID:", body.voiceId);
        console.log("=====================================");

        
        const { script, voiceId } = body;

        if (!script || !voiceId) {
            return NextResponse.json(
                { error: "script and voiceId are required" ,
                    received: { script: !!script, voiceId: !!voiceId }
                },
                { status: 400 }
            )
        }

        if ( typeof script !== "string" || typeof voiceId !== "string" ) {
            return NextResponse.json(
                { error: "Invalid script or voiceId"},
                { status: 400 }
            )
        }

        // if ( script.length > 5000 ) {
        //     return NextResponse.json (
        //         { error: "Script cannot exceed 5000 characters" },
        //         { status: 400 }
        //     )
        // }

        const apiKey = process.env.OPENROUTER_API_KEY;

        if (!apiKey) {
            throw new Error("OPENROUTER_API_KEY is missing");
        }

        const response = await fetch('https://openrouter.ai/api/v1/audio/speech' , {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "heygen/heygen-voice-1-turbo:free",
                input: script,
                voice: voiceId,
                response_format: "pcm",
            }),
            signal: AbortSignal.timeout(120000)
        },
        )


        if (!response.ok) {
            const errorData = await response.text();

            console.log("OpenRouter TTS Error: ", errorData)

            return NextResponse.json(
                { error: "Voice Generation failed", details: errorData },
                { status: 502 }
            )
        }

        const pcm = Buffer.from(await response.arrayBuffer());

        if (!pcm.length) {
            throw new Error("Empty PCM audio response");

        }

        const wavBuffer = pcmToWav(pcm, 44100, 1);

        return new Response(new Uint8Array(wavBuffer), {
            status: 200,
            headers: {
                "Content-Type": "audio/wav",
                "Content-Disposition": `attachment; filename="generated_voice.wav"`,
                "Content-Length": String(wavBuffer.length),
            }
        });

        // const poll = async (retries = 10, interval =2000) => {
        //     for(let i=0; i<retries; i++){
        //         const pollRes = await axios.get('' + generatedVoiceId,
        //             {
        //                 headers: {
        //                     "Authorization": ``,
                                    
        //                 }
        //             }
        //         );

        //         const status = pollRes?.data?.data.status

        //         if(status === 3){
        //             return pollRes?.data?.url;
        //         } else if (status === 4) {
        //             throw new Error("Audio Processing Failed")
        //         } 

        //         await new Promise(resolve => setTimeout(resolve, interval))

        //     }

            
        // }

        // const audioUrl = await poll(10, 2000)
        
        // return NextResponse.json({ audioUrl: audioUrl})
        

        
    } catch (err: any) {
        console.log("HeyGen voice API error: ",  err.response?.data ?? err.message)

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
    
    

    
}
