"use client"
import { FilePlus2, Film, ImageUp, X } from 'lucide-react'
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'

interface UploadFileProps {
    videoData?: any;
    onHandleInputChange: (field: string, value: any) => void;
}

interface FilePreview {
    file: File;
    url: string;
    id: string;
}

function UploadFiles({videoData, onHandleInputChange}: UploadFileProps) {
    const [files, setFiles] = useState<FilePreview[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {   
        const selectedFiles = Array.from(event.target.files ?? []);

        if (!selectedFiles.length) return;

        const newFiles = selectedFiles.map((file) => ({
            file,
            url: URL.createObjectURL(file),
            id: crypto.randomUUID(),
        }));
        setFiles((prev) => [...prev, ...newFiles]);

        event.target.value = "";
    }

    const removeImage = (id: string) => {
        setFiles((prev) => {
            const fileToRemove = prev.find((item) => item.id === id);

            if (fileToRemove) {
                URL.revokeObjectURL(fileToRemove.url);
            }

            return prev.filter((item) => item.id !== id);
        });

    }

    useEffect(() => {
        onHandleInputChange('rawFiles', files.map((item) => item.file))

    },[files, onHandleInputChange]);

    useEffect(() => {
        return () => {
            files.forEach((item) => URL.revokeObjectURL(item.url));
        }
    }, [files]);


  return (
    <div className='p-5 shadow rounded-2xl mt-6'>
      <h2 className='font-bold text-lg flex gap-2 items-center'>
        <ImageUp className='p-2 bg-blue-600 text-white h-10 w-10 rounded-md'/>
        Image/Video Upload</h2>

        <hr className='my-3'/>
        <div className=''>
            <label className='text-gray-500'>Upload Image or Video for your ads</label>
            <label htmlFor='fileUpload'>
                <div className='p-3 bg-secondary border-dashed rounded-xl flex items-center flex-col cursor-pointer'>
                    <FilePlus2  className='h-10 w-10 text-gray-400'/>
                    <h2>Click here to Upload files</h2>
                </div>
            </label>
            <input ref={inputRef} type='file' id='fileUpload' className='sr-only' accept='image/*,video/*' multiple
                onChange={handleFileChange}/>
        </div>
        { files.length > 0 && (
            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3'>
                {files.map(({ file, url, id }) => (
                    <div key={id} className='relative border rounded-lg overflow-hidden'>
                        {file.type.startsWith('video/') ? (
                            <video  src={url} controls preload="metadata" className='w-full h-28 object-cover' />
                        ) : (
                            <Image src={url} alt={file.name} width={200} height={112} unoptimized className='w-full h-28 object-cover' />
                        )}

                        <div className='p-2 flex items-center gap-1'>
                            {file.type.startsWith("video/") && (
                                <Film size={14} className='shrink-0' />
                            )}
                            <span className='text-xs truncate' title={file.name}>
                                {file.name}
                            </span>

                            <button type= 'button' onClick={() => removeImage(id)} aria-label={'Remove ${file.name'} className='ml-auto shrink-0 p-1 rounded hover:bg-red-100'>
                                <X size={16}/>
                            </button>
                        </div>
                    </div>

                ))}

            </div>

        )}
        
    </div>

   
  )
}

export default UploadFiles
