import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Video } from 'lucide-react';
import { useEffect, useState } from 'react'

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
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
      if (!videoData?.scriptVariant?.length) {
        setSelectedIndex(0);
        return;
      }

      const matchingIndex = videoData.scriptVariant.findIndex((item) =>
        item.content === videoData.script);

      if (matchingIndex !== -1) {
        setSelectedIndex(matchingIndex);
      } else {
        setSelectedIndex((current) => Math.min(current, videoData.scriptVariant.length -1));
      }
    }, [videoData?._id, videoData?.scriptVariant, videoData?.script]);

    if(!videoData) {
      return <div>Loading script...</div>
    }
    
    const scripts = videoData.scriptVariant ?? [];

    const selectedScriptContent = scripts[selectedIndex]?.content ?? videoData.script ?? "";

    const handleTextareaChange =(value: string) => {
        const updatedScripts = [...scripts];

        if (updatedScripts[selectedIndex]) {
          updatedScripts[selectedIndex] = {
            ...updatedScripts[selectedIndex],
            content: value,
          };
        } else {
          updatedScripts.push({ content: value });
          setSelectedIndex(0);
        }

        onHandleInputChange("scriptVariant", updatedScripts);
        onHandleInputChange('script', value);
    }

    const handleSelectScript = (index: number) => {
      setSelectedIndex(index);
      onHandleInputChange('script', scripts[index].content);
    }

  return (
    <div className='p-5 shadow rounded-xl'>
      <h2 className='font-bold text-lg flex gap-2 items-center'>
        <Video className='p-2 bg-green-600 text-white h-10 w-10 rounded-md'/> Video Ads Script</h2>
      <hr className='my-3'/>
      <div className=''>
        <label className='text-gray-500'> Video Project Topic </label>
        <Input 
            className='text-lg'
            value={videoData.topic ?? ""}
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
        {scripts.map((script, index) => (
            <button type='button' key={index} onClickCapture={() => handleSelectScript(index)} className={`p-5 text-sm border rounded-lg cursor-pointer  transition-all duration-300 hover:bg-blue-100
                ${selectedIndex === index ? 'border-primary bg-blue-100' : ''}`}
                >
                <span className='line-clamp-3'>{script.content}</span>
            </button>
        ))}
      </div>
    </div>
  )
}

export default Script
