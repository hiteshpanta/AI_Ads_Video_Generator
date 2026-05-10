import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'

interface ScriptItem {
    content: string;
}

interface VideoDataInterfce {
    _id: string;
    topic: string;
    context: string;
    script: string;
    scriptVariant: ScriptItem[];

}
interface ScriptProps {
    videoData: VideoDataInterfce | null;
    onHandleInputChange: <K extends keyof VideoDataInterfce>(
        field: K,
        value: VideoDataInterfce[K]
    ) => void;
}

function Script({videoData, onHandleInputChange }:  ScriptProps) {
    if (!videoData) return <div>Loading script..</div>
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectedScriptContent = videoData.scriptVariant[selectedIndex]?.content ?? '';

    const handleTextareaChange =(value: string) => {
        const updatedScripts = [...videoData.scriptVariant]
        if (updatedScripts[selectedIndex]) updatedScripts[selectedIndex].content = value
        onHandleInputChange('scriptVariant', updatedScripts)
    }

  return (
    <div className='p-5 shadow rounded-xl'>
      <h2 className='font-bold text-2xl'>Video Ads Script</h2>
      <hr className='my-3'/>
      <div className=''>
        <label className='text-gray-500'> Video Project Topic </label>
        <Input 
            className='text-lg'
            value={videoData?.topic}
            onChange={(e) => onHandleInputChange('topic', e.target.value)}
        />
      </div>

      <div className='mt-3'>
        <label className='text-gray-500'>Video Script</label>
        <Textarea 
            className='text-lg'
            value={selectedScriptContent}
            onChange={(e) => handleTextareaChange(e.target.value)}
        />
      </div>

      <div className='grid gap-3 mt-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
        {videoData?.scriptVariant?.map((script, index) => (
            <div key={index} className={`p-5 text-sm border rounded-lg cursor-pointer  transition-all duration-300 hover:bg-blue-100
                ${script?.content == videoData?.script && 'border-primary bg-blue-100'}`}
                onClick={() => setSelectedIndex(index)}
                >
                <h2 className='line-clamp-3'>{script.content}</h2>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Script