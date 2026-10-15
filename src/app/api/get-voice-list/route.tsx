import axios from "axios";
import { NextResponse } from "next/server";



export async function GET(req: any) {

    try {
        const result = await axios.get('https://api.heygen.com/v3/voices',{
            headers: {
                    "x-api-key": ` ${process.env.HEYGEN_API_KEY!}`,
            }
        });

        return NextResponse.json(result.data?.data)

    } catch (err: any) {
        console.error("Heygen Error: ", err?.response?.data || err.message );
        return NextResponse.json(
            {
                error: "Failed to fetch voice list from Heygen API",
                details: err?.response?.data,
            },
            { status: 500 }
        );
    }

    



    
}