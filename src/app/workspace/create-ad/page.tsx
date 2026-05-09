"use client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios";
import {  FileVideoCameraIcon, LoaderCircle, Sparkles } from "lucide-react"
import { useContext, useState } from "react"
import { UserDetailContext } from "../../../../context/UserDetailContext";
import { CreateNewVideoData } from "../../../../convex/videoData";


function CreateAd() {
  const [ userInput, setUserInput ] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false)
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const GenerateAIVideoScript = async() => {
    setLoading(true)
    const result = await axios.post('/api/generate-script', {
      topic: userInput
    });
    console.log(result.data);
    
    //save script to db


    const RAWResult = (result?.data).replace('```json','').replace('```','');
    const JSONResult = JSON.parse(RAWResult);

    const res = await CreateNewVideoData({
      uid: userDetail?._id,
      topic: userInput,
      scriptVariant: JSONResult
    });
    console.log(res);
    setLoading(false);

  }

  return (
    <div className="mt-32 flex flex-col items-center justify-center w-full p-7 rounded-2xl border-dotted">
      <h2 className="flex font-bold text-2xl text-center items-center"><FileVideoCameraIcon/> Create AI Video Ads in Just One Click</h2>
      <p className="mt-3 text-lg text-gray-500">Turn your ideas into stunning, scroll-stopping videos -instantly, effortlessly, and without editing sills!</p>

      <Input
        placeholder="Enter the topic or product info"
        className={'w-lg text-lg mt-5'}
        onChange={(e) => setUserInput(e.target.value)}/>

        <Button className={'mt-5 w-md bg-blue-600'} onClick={GenerateAIVideoScript}
        disabled={loading}>{loading ? <LoaderCircle className="animate-spin"/> : <Sparkles/> } Generate</Button>
    </div>
  )
}

export default CreateAd
