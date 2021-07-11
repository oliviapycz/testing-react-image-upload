import React, { useRef, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { ModalLayoutComponent } from '../components/templates/ModalLayout/ModalLayout'
import { StoreContext } from "../Provider/sharedStore";
import { CropImage } from "./CropImage";

export function OpenWebcam(props) {
  const { onClose } = props
  const {
    imageToCrop: [imageToCrop, setImageToCrop],
  } = React.useContext(StoreContext)

  const videoRef = useRef(null)
  const photoRef = useRef(null)

  useEffect(() => {
    if (!isMobile) getVideo()
  }, [videoRef])

  const getVideo = () => {
    if (!navigator.mediaDevices) return
    navigator.mediaDevices.getUserMedia({ video: { width: 300 }, audio: false })
      .then((stream) => {
        const video = videoRef.current
        if (!video) return
        video.srcObject = stream
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
    const video = videoRef.current
    const data = photo.toDataURL('image/jpeg')
    setImageToCrop(data)
    stopWebcam(video)
  }

  const stopWebcam = (video) => {
    const stream = video.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(function(track) {
      track.stop();
    });

    video.srcObject = null;
  }

  return (
    <ModalLayoutComponent
      onClose={onClose}
    >
      {imageToCrop
        ? <CropImage
          onClose={onClose}
        />
        : <div className="OpenWebcam">
          <video onCanPlay={() => getSnapshot()} ref={videoRef} />
          <button type="button" onClick={() => takePhoto()}>Take a photo</button>
          <canvas ref={photoRef} style={{ display: 'none' }} />
        </div> }

    </ModalLayoutComponent>
  )
}