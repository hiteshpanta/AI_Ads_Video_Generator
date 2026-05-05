"use client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {  FileVideoCameraIcon, Sparkles } from "lucide-react"
import { useState } from "react"


function CreateAd() {
  const [ userInput, setUserInput ] = useState();

  return (
    <div className="mt-32 flex flex-col items-center justify-center w-full p-7 rounded-2xl border-dotted">
      <h2 className="flex font-bold text-2xl text-center items-center"><FileVideoCameraIcon/> Create AI Video Ads in Just One Click</h2>
      <p className="mt-3 text-lg text-gray-500">Turn your ideas into stunning, scroll-stopping videos -instantly, effortlessly, and withut editing sills!</p>

      <Input
        placeholder="Enter the topic or product info"
        className="w-lg text-lg"
        onChange={(e) => {}}/>

        <Button className={'mt-5 w-md bg-blue-600'}> <Sparkles/> Generate</Button>
    </div>
  )
}

export default CreateAd
