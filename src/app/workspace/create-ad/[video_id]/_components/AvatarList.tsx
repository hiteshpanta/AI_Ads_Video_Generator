import axios from 'axios'
import { User } from 'lucide-react'
import React, { useEffect } from 'react'

export default function AvatarList() {

    useEffect(()=> {
            GetAvatarLsit();
        },[])

    const GetAvatarLsit = async() => {

        const result = await axios.get('https://api.heygen.com/v3/avatars')

        console.log(result.data);
    }
  return (
    <div className='p-5 mt-5 shadow rounded-xl'>
      <h2 className='font-bold text-lg flex gap-2 items-center'>
        <User className='p-2 bg-red-600 text-white h-10 w-10 rounded-md'/>Select Avatar</h2>

        <hr className='my-3'/>

        <div>
            <label>Select Your Avatar for video ad</label>
        </div>
    </div>
  )
}
