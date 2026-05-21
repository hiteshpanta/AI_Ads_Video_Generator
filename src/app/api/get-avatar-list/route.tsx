import axios from "axios";
import { NextResponse } from "next/server";



export async function GET(req: any) {

    const result = await axios.get('https://api.heygen.com/v3/avatars',{
        headers: {
            	"x-api-key": `${process.env.HEYGEN_API_KEY}`
        }
    });

    return NextResponse.json(result.data?.data)
    
}