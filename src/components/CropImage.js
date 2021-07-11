/* eslint-disable */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { StoreContext } from "../Provider/sharedStore";

export function CropImage(props) {
  const {
    onClose,
  } = props

  const {
    imagePreview: [imagePreview, setImagePreview],
    imageToCrop: [imageToCrop, setImageToCrop],
    base64Preview: [base64Preview, setBase64Preview],
    } = React.useContext(StoreContext)

  const imgRef = useRef(null)
  const previewCanvasRef = useRef(null)
  const [crop, setCrop] = useState({
    unit: '%',
    width: 50,
    height: 50,
    x: 25,
    y: 25
  })
  const [completedCrop, setCompletedCrop] = useState(null)

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return
    }

    const image = imgRef.current
    const canvas = previewCanvasRef.current
    const crop = completedCrop

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const ctx = canvas.getContext('2d')
    const pixelRatio = window.devicePixelRatio
    canvas.width = crop.width * pixelRatio
    canvas.height = crop.height * pixelRatio

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.imageSmoothingQuality = 'high'

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    )

  }, [completedCrop])

  const onLoad = useCallback((img) => {
    imgRef.current = img

  }, [])

  const onCropChange = (c) => {
    setCrop(c)
  }

  const onCropComplete = (c) => {
    setCompletedCrop(c)
  }

  const generateImageAndPreview = (canvas, crop) => {
    if (!crop || !canvas) {
      return
    }
    
    canvas.toBlob(
      (blob) => {
        const previewUrl = URL.createObjectURL(blob)
        setImagePreview(previewUrl)
        setBase64Preview(blob)
        // window.URL.revokeObjectURL(previewUrl);
      },
      "image/png",
      1
    );
    setImageToCrop('')
    onClose()
  }


  return (
    <div className="CropImage">
      { !imageToCrop && !crop
      ? null
      : (
        <ReactCrop
          src={imageToCrop}
          onImageLoaded={onLoad}
          crop={crop}
          onChange={onCropChange}
          onComplete={onCropComplete}
          style={{ width: '200px', height:'auto'}}
          ruleOfThirds={true}
        />
      ) }
      <div>
        <canvas
          ref={previewCanvasRef}
          // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
            style={{
                display: 'none',
                width: Math.round(completedCrop?.width ?? 0),
                height: Math.round(completedCrop?.height ?? 0),
          }}
        />
        <button
          type="button"
          disabled={!completedCrop?.width || !completedCrop?.height}
          onClick={() =>
            generateImageAndPreview(previewCanvasRef.current, completedCrop)
          }
        >
          Select this image
        </button>
      </div>
    </div>
  )
}