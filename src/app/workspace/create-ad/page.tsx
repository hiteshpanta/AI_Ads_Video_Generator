hi"use client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios";
import {  FileVideoCameraIcon, LoaderCircle, Sparkles } from "lucide-react"
import { useContext, useState } from "react"
import { UserDetailContext } from "../../../../context/UserDetailContext";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";



function CreateAd() {
  const [ userInput, setUserInput ] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter();

  const { userDetail } = useContext(UserDetailContext);

  const createvideo = useMutation(api.videoData.CreateNewVideoData);

  const GenerateAIVideoScript = async() => {

    try {
      setLoading(true)
      const response = await axios.post('/api/generate-script', {
        topic: userInput
      });

      let jsonResult: any;
      

      if (typeof response.data === "string") {
          try {
          const raw = (response?.data).replace('```json','').replace('```','').trim();
          jsonResult = JSON.parse(raw);
          
        } catch (err: any) {
          jsonResult = {rawText: response.data };

          
        }
      } else {
        jsonResult = response.data;
      }
      

      await createvideo({
        uid: userDetail?._id,
        topic: userInput,
        scriptVariant: jsonResult,
      });

      console.log("Saved successfully");
      router.push('/workspace/create-ad/'+response)
      
    } catch (err: any) {
      console.error(err?.response?.data || err.message);
      
    } finally {
      setLoading(false)
    }


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
        disabled={loading}>{loading ? <LoaderCircle className="animate-spin"/> : <Sparkles/> } {loading ? "Generating..." : "Generate"} </Button>





      <Input
        placeholder="Enter the topic or product info"
        className={'w-lg text-lg mt-5'}
        onChange={(e) => setUserInput(e.target.value)}/>

        <Button className={'mt-5 w-md bg-blue-600'} onClick={GenerateAIVideoScript}
        disabled={loading}>
    </div>
  )
}
export default CreateAd
