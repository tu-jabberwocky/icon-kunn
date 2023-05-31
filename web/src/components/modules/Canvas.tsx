import React, { useEffect, useRef, useState } from 'react';

import logo from '../../img/image_FILL0_wght400_GRAD0_opsz48.svg';

interface Props {
    value: string
}

function Canvas({ value }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [imageUrl, setImageData] = useState(value);
    const rectAngle = { startY:0, startX:0, endY:0, endX:0 };
    const isDraw = false;
    const rects = [rectAngle];

    const getContext = (): CanvasRenderingContext2D => {
        const canvas = canvasRef.current;
        if(!canvas) {
            throw new Error('object が null');
        }

        const context = canvas.getContext('2d');
        if(!context) {
            throw new Error('context が取得出来てない')
        }

        return context;
    };

    useEffect(() => {
        console.log('canvas!!');
        const context = getContext();
        
        // context.save();

        const image = new Image();
        console.log(imageUrl);
        image.src = imageUrl;
        /*
        image.onload = () => {
            canvas.width = image.width;
            context.canvas.height = image.height;
        };
        */
        context.drawImage(image, 0, 0);
        // context.fillRect(0, 0, 256, 256);
        context.save();

        /*
        const image = new Image();
        image.src = imageUrl;
        console.log(imageUrl);
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
        };
        context.drawImage(image, 0, 0);
        context.lineWidth = 5;
        context.strokeStyle = 'rgb(0, 0, 255)';
        rects.forEach(rect => {
            context.strokeRect(rect.startX,
                               rect.startY,
                               rect.endX,
                               rect.endY)
        });
        */
    });

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
    if(imageUrl !== null) {
        preview = (
            <canvas className='canvas' ref={canvasRef} />
        );
    }

    return (
        <div>
            {preview}
        </div>
    );
}

export default Canvas;
