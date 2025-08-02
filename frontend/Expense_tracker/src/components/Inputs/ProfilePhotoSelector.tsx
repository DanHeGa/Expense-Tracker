import React, { useRef, useState } from 'react'
import Input from './Input';
import { LuTrash, LuUpload, LuUser } from 'react-icons/lu';

const ProfilePhotoSelector = ({image, setImage}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            //update image state
            setImage(file);

            //Generate preview URL from the file
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile = () => {
        inputRef.current?.click();
    };

    return (
    <div className='flex justify-center mb-6'>
      <input 
        type='file'
        accept='image/*'
        ref={inputRef}
        onChange={handleImageChange}
        className='hidden'
      />
        {!image ? (
            <div className='w-15 h-15 flex items-center justify-center bg-purple-100 rounded-xl relative'>
                <LuUser className='text-4xl text-primary'/>
                <button
                    type='button'
                    className='w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1.5'
                    onClick={onChooseFile}
                >
                    <LuUpload />    
                </button>
            </div>
        ) : (
            <div className='relative'>
                <img
                    src={previewUrl ?? undefined}
                    alt='Profile photo'
                    className='w-25 h-25 rounded-full object-cover' 
                />
                <button 
                    type='button'
                    className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1.5'
                    onClick={handleRemoveImage}
                >
                    <LuTrash />
                </button>
            </div>
        )}

    </div>
  )
}

export default ProfilePhotoSelector
