import axios from 'axios'
import { Mars, Mic, PlayCircleIcon, Venus } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'

export default function VoiceList({videoData, onHandleInputChange}: {videoData: any, onHandleInputChange: (field: string, value: any) => void}) {

  const [ voiceList, setVoiceList ] = useState<any[]>([]);
  const [ playAudio, setPlayAudio] = useState<any>();
  const audioRef = useRef<any>(null);

  useEffect(() => {
    GetVoiceList();
  },[]);

  useEffect(() => {
    if (audioRef.current && playAudio) {
      audioRef.current.load();
      audioRef?.current?.play()

    }
  }, [playAudio]);

    const GetVoiceList = async () => {

      try {
        const result = await axios.get('/api/get-voice-list');
        const voices = result.data?.data ?? [];
        console.log(voices)
        setVoiceList(voices);
      } catch (err) {
        console.log("failed to fetch voices:", err);
      }
        

    }
  return (
    <div className='p-5 shadow rounded-2xl mt-6'>
      <h2 className='font-bold text-lg flex gap-2 items-center'>
        <Mic className='p-2 bg-purple-500 text-white h-10 w-10 rounded-md'/>
        Select Voice
        
      </h2>
      <hr className='my-3'/>

      <div>
        <label>Select Voice for your video ad</label>
        <div className='grid grid-cols-2 gap-5 w-full h-[200px] overflow-auto'>
          {voiceList.map((voice, index) => (
            <div key={index} className={`p-3 flex items-center justify-between border rounded-lg cursor-pointer hover:bg-purple-100 transition-all duration-300${videoData?.voice?._id == voice?._id &&'bg-blue-100 text-primary border-primary'}`}
              onClick={() => onHandleInputChange('voice', voice)}
            >
              <div className='flex gap-3 items-center'>
                <PlayCircleIcon className='text-primary' onClick={() => setPlayAudio(voice?.preview_audio_url)}/>

                <div className=''>
                  <h2 className='font-medium'>{voice.name}</h2>
                  <h2 className='text-xs text-gray-500'>{voice.accent} {voice.description}</h2>
                </div>
              </div>
              

              <div>
                {voice?.gender == 'male' ? <Mars  className='text-blue-600'/> : <Venus className='text-pink-600'/>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <audio controls ref={audioRef} className='hidden'>
        <source src={playAudio} type="audio/mp3"/>
      </audio>
    </div>
  )
}
