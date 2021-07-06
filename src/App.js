import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './App.css';
import { NoProfilePictureIconComponent } from './Icons/NoProfilePicture.component'

function App() {

  const [imagePreview, setImagePreview] = useState('')

  const videoRef = useRef(null)
  const photoRef = useRef(null)

  const imgRef = useRef(null)

  const previewCanvasRef = useRef(null)
  const [crop, setCrop] = useState({ unit: '%', width: 90, height: 100})
  const [completedCrop, setCompletedCrop] = useState(null)

  useEffect(() => {
    getVideo()

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

  }, [videoRef, completedCrop])

  const onLoad = useCallback((img) => {
    imgRef.current = img
  }, [])

  const onCropChange = (c) => {
    setCrop(c)
  }

  const onCropComplete = (c) => {
    setCompletedCrop(c)
  }

  const showImagePreview = (url) => {
    console.log('event.target.files[0]', url)
    setImagePreview(url)
  }

  const onImageUpload = (event) => {
    if (event.target.files !== null) {
      const file = event.target.files[0]
      // const base64 = ConvertFileAsBase64(file)
      // console.log('******base64*******', base64)
      const imageUrl = URL.createObjectURL(file)
      showImagePreview(imageUrl)
    }
  }

  const getVideo = () => {
    if (!navigator.mediaDevices) return
    navigator.mediaDevices.getUserMedia({ video: { width: 300 }, audio: false })
      .then((stream) => {
        const video = videoRef.current
        if (!video) return
        // @ts-ignore
        video.srcObject = stream
        // @ts-ignore
        video.play()
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  const getSnapshot = () => {
    const video = videoRef.current
    const photo = photoRef.current

    const ctx = photo.getContext('2d')

    const width = 320
    const height = 240

    photo.width = width
    photo.height = height

    return setInterval(() => {
      ctx.drawImage(video, 0, 0, width, height)
    }, 200)
  }

  const takePhoto = () => {
    const photo = photoRef.current
    const data = photo.toDataURL('image/jpeg')
    setImagePreview(data)
  }
const generateDownload = (canvas, crop) => {
  if (!crop || !canvas) {
    return
  }
  
  canvas.toBlob(
    (blob) => {
      const previewUrl = URL.createObjectURL(blob)
      setImagePreview(previewUrl)
      // const previewUrl = window.URL.createObjectURL(blob);

      // const anchor = document.createElement("a");
      // anchor.download = "cropPreview.png";
      // anchor.href = URL.createObjectURL(blob)
      // anchor.click()

      // window.URL.revokeObjectURL(previewUrl);
    },
    "image/png",
    1
  );
}

  return (
    <div className="App">
      <header className="App-header">
        { imagePreview
          ? <img src={imagePreview} alt="alt" width="90" height="100" style={{ objectFit: 'cover'}}/>
          : <NoProfilePictureIconComponent /> }
        <h3>-----------------------------Testing Upload-----------------------------</h3>
        <input
          type="file"
          id="picture"
          name="picture"
          required
          accept="image/*"
          onChange={onImageUpload}
        />
        <h3>-----------------------------Testing WebCam-----------------------------</h3>
        <video onCanPlay={() => getSnapshot()} ref={videoRef} />
        <button type="button" onClick={() => takePhoto()}>Take a photo with the webcam</button>
        <canvas ref={photoRef} style={{ display: 'none' }} />
        <h3>-----------------------------Testing Crop-----------------------------</h3>
        { !imagePreview && !crop
        ? null
        : (
          <ReactCrop
            src={imagePreview}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={onCropChange}
            onComplete={onCropComplete}
            style={{ width: '170px', heigh:'auto'}}
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
            generateDownload(previewCanvasRef.current, completedCrop)
          }
        >
        Select this image
      </button>
      </div>
      </header>
    </div>
  );
}

export default App;
