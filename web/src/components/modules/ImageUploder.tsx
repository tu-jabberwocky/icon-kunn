import React, { useState } from 'react';

function ImageUploder() {
    const [imageData, setImageData] = useState('');

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files
        if (files != null && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                // TODO : arrayBuffarだった場合
                const result = e.target?.result?.toString() === undefined
                 ? '' : e.target?.result.toString();
                setImageData(result);
            };
            reader.readAsDataURL(file); 
        } else {
            setImageData('');
        }
    }

    let preview = null;
    if(imageData !== '') {
        preview = (
            <div>
                <img title='image'
                     src={imageData} />
            </div>
        );
    }

    return (
        <div>
            <input type='file'
                   accept='image/*'
                   alt='alt'
                   title='image'
                   onChange={handleChange} />
            {preview}
        </div>
    );
}

export default ImageUploder;
