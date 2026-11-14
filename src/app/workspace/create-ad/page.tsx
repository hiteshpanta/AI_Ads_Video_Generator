"use client";
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
  const [ loading, setLoading ] = useState<boolean>(false)
  const router = useRouter();

  const { userDetail } = useContext(UserDetailContext);

  const createvideo = useMutation(api.videoData.CreateNewVideoData);

  const GenerateAIVideoScript = async() => {

    try {
      if(!userInput.trim()){
        alert("Please enter a topic or product info");
        return;
      }

      setLoading(true)

      const response = await axios.post('/api/generate-script', {
        topic: userInput
      });

      let jsonResult: any;
      

      if (typeof response.data === "string") {
        const raw = (response?.data).replace('```json/g','').replace('```/g','').trim();
          try {
          jsonResult = JSON.parse(raw);
          
        } catch (err: any) {
          jsonResult = {rawText: response.data };

          
        }
      } else {
        jsonResult = response.data;
      }
      
      const narration = jsonResult.voiceover || jsonResult.voiceOver || jsonResult.narration || jsonResult.script || jsonResult.rawText || "No narration found" ;

      if ( typeof narration !== "string" || !narration.trim()) {
        throw new Error("Narration is empty or not a string");
      }

      const videoId = await createvideo({
        uid: userDetail?._id,
        topic: userInput,
        scriptVariant: jsonResult,
      });

      const voiceResponse = await axios.post('/api/create-voice', 
        {
          script: narration,
          voiceId: "heygen/heygen-voice-1-turbo:free"
        },
        {
          responseType: "blob",
          timeout: 120000,
        }

      );

      console.log("Voice generated successfully");

      const audioBlob = voiceResponse.data;

      const audioUrl = URL.createObjectURL(audioBlob);

      console.log("Generated audio:", audioUrl);

      router.push(`/workspace/create-ad/${videoId}`)
      
    } catch (err: any) {
      console.error(err?.response?.data || err.message);

      alert(err.response?.data.error || err.message || "An error occurred while generating the video script or voiceover." );
      
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
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        disabled={loading}
      />

        <Button className={'mt-5 w-md bg-blue-600'} onClick={GenerateAIVideoScript}
        disabled={loading}>{loading ? <LoaderCircle className="animate-spin"/> : <Sparkles/> } {loading ? "Generating..." : "Generate"} </Button>

    </div>
  )
}
export default CreateAd
