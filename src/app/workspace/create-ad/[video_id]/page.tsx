"use client"
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { api } from '../../../../../convex/_generated/api';
import Script from './_components/Script';
import UploadFiles from './_components/UploadFiles';
import AvatarList from './_components/AvatarList';
import VoiceList from './_components/VoiceList';
import { Button } from '@/components/ui/button';
import { Sparkle } from 'lucide-react';

interface ScriptItem {
    content: string;
}

interface VideoDataInterface {
    _id: string;
    uid: string;
    topic: string;
    scriptVariant: ScriptItem[];
    voice?: any;
    avatar?: any;
    rawFiles?: File[];
    [key: string]: any;

}
function CreateVideo() {
    const { video_id } = useParams<{ video_id: string }>();
    const convex = useConvex();
    const [videoData, setVideoData] = useState<VideoDataInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [ isGenerateButtonClick, setIsGenerateButtonClick] = useState<boolean>(false);

    useEffect(() => {
        if (video_id) {
            getVidoeData();
        }
        
    },[video_id]);

    const getVidoeData = async () => {
        try {
            setLoading(true);
             const result = await convex.query(api.videoData.GetVideoDataById, {
                    vid : video_id,
            });
            setVideoData(result);
            // console.log("Video Data:",result)

        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const onHandleInputChange = (field: string, value: any) => {
        setVideoData((prev) =>
            prev ? {...prev,
            [field]: value} : prev
        );
        console.log(videoData)
    }

   

  
   

  return (
    <div>
      <h2 className='font-bold text-2xl'>Create Video Ads</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 sm:grid-cols-1 mt-8'>
        <div className='md:col-span-2'>
            <Script videoData={videoData} onHandleInputChange={onHandleInputChange} />
            <UploadFiles videoData={videoData} onHandleInputChange={onHandleInputChange}/>
            <AvatarList videoData={videoData} onHandleInputChange={onHandleInputChange}/>
            <VoiceList videoData={videoData} onHandleInputChange={onHandleInputChange}/>
            <Button className={'mt-7 w-full'}> <Sparkle/> Generate</Button>
        </div>

        <div>
            Preview
        </div>

      </div>
    </div>
  )
}

export default CreateVideo
