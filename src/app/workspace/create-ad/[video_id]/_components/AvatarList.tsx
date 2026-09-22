'use client';
import axios from 'axios'
import { User } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function AvatarList() {

  const [ avatarList, setAvatarList ] = useState<any[]>([])

    useEffect(()=> {
            GetAvatarLsit();
        },[])

    const GetAvatarLsit = async() => {

        const result = await axios.get('/api/get-avatar-list/',{
          // headers : {
          //   "x-api-key" : process.env.HEYGEN_API_KEY
          // }
        })

        console.log(result.data);
        setAvatarList(result.data || [] );
    }
  return (
    <div className='p-5 mt-5 shadow rounded-xl'>
      <h2 className='font-bold text-lg flex gap-2 items-center'>
        <User className='p-2 bg-red-600 text-white h-10 w-10 rounded-md'/>Select Avatar</h2>

        <hr className='my-3'/>

        <div>
            <label>Select Your Avatar for video ad</label>

            <div>
              {avatarList.length>0 && avatarList?.map((avatar, index) => (
                <div key={index}>
                  <Image src={avatar?.preview_image_url} alt={avatar?.avatar_id} width={100} height={100} />
                </div>
              ))}
            </div>
        </div>

    </div>
  )
}
