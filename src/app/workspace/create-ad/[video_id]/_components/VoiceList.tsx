import axios from 'axios'
import React from 'react'

export default function VoiceList({videoData}: {videoData: any}) {

    const GetVoiceList = async () => {
        const result = await axios.get('/api/get-voice-list');
        console.log(result?.data.data)

    }
  return (
    <div>
      Voice List
    </div>
  )
}
