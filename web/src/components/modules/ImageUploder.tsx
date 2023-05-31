import React, { useState } from 'react';

import Canvas from './Canvas';

function ImageUploder() {
    const [imageData, setImageData] = useState('');
    const rectAngle = { startY:0, startX:0, endY:0, endX:0 };

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

    function handleMouseDown(e: React.MouseEvent) {
        rectAngle.startX = e.clientX;
        rectAngle.startY = e.clientY;
        // isDraw = true;
    }

    function handleMouseUp(e :React.MouseEvent) {
        rectAngle.endX = e.clientX;
        rectAngle.endY = e.clientX;
    }

    let preview = null;
    if(imageData !== '') {
        preview = (
            <div>
                <Canvas value={imageData} />
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
