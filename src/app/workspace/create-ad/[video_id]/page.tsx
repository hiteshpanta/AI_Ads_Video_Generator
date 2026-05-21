"use client"
import { useConvex, useQuery } from 'convex/react';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { api } from '../../../../../convex/_generated/api';
import Script from './_components/Script';
import UploadFiles from './_components/UploadFiles';
import AvatarList from './_components/AvatarList';

interface ScriptItem {
    content: string;
}

interface VideoDataInterfce {
    _id: string;
    uid: string;
    topic: string;
    scriptVariant: ScriptItem[];

}
function CreateVideo() {
    const { video_id } = useParams();
    const convex = useConvex();
    const [videoData, setVideoData] = useState<VideoDataInterfce | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    console.log(video_id);

    useEffect(() => {
        if (video_id) {
            getVidoeData();
        }
        
    },[video_id]);

    const getVidoeData = async () => {
        try {
            setLoading(true);
             const result: VideoDataInterfce | null = await convex.query(api.videoData.GetVideoDataById, {
                    vid: video_id,
            })
            setVideoData(result);
            console.log("Video Data:",result)

        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const onHandleInputChange = <K extends keyof VideoDataInterfce>(field: K, value: VideoDataInterfce[K]) => {
        setVideoData((prev) =>
            prev ? {...prev,
            [field]: value} : prev
        )
    }

  
   

  return (
    <div>
      <h2 className='font-bold text-2xl'>Create Video Ads</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 sm:grid-cols-1 mt-8'>
        <div className='md:col-span-2'>
            <Script videoData={videoData} onHandleInputChange={onHandleInputChange} />
            <UploadFiles videoData={videoData}/>
            <AvatarList videoData={videoData}/>
        </div>

        <div>
            Preview
        </div>

      </div>
    </div>
  )
}

export default CreateVideo
