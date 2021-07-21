import React, { useRef, useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { ModalLayoutComponent } from '../templates/ModalLayout/ModalLayout'
import { StoreContext } from "../../Provider/sharedStore"
import { CropImage } from "../CropImage/CropImage"

export function OpenWebcam(props) {
  const { onClose } = props
  const {
    imageToCrop: [imageToCrop, setImageToCrop],
  } = React.useContext(StoreContext)

  const videoRef = useRef(null)
  const photoRef = useRef(null)

  useEffect(() => {
    if (!isMobile) getWebcamVideoAccess()
  }, [videoRef])

  const getWebcamVideoAccess = () => {
    if (!navigator.mediaDevices) return
    // the navigator interface represents the state and the identity of the user agent.
    // It allows scripts to query it and to register themselves to carry on some activities
    // MediaDevices allows you to access to connected media input devices like cameras and microphones
    // getUserMedia prompts the user for permission and returns a MediaStream
    // the MediaStream is a stream of media content. A stream consists of several tracks such as video tracks
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

    // getContext returns a drawing context in the canvas
    // 2d is the context type: leading to the creation of a
    // CanvasRenderingContext2D object representing a two-dimensional rendering context
    // the CanvasRenderingContext2D interface provides the 2D rendering context for the drawing surface of a <canvas>
    const context = photo.getContext('2d')

    const width = 320
    const height = 240

    photo.width = width
    photo.height = height

    // drawImage will write to the canvas every 200ms
    // drawImage(image, dx, dy, dWidth, dHeight)
    // dx: x-axis coordinate in the canvas top left corner of the source
    // dy: y-axis coordinate in the canvas top left corner of the source
    return setInterval(() => {
      context.drawImage(video, 0, 0, width, height)
    }, 200)
  }

  const takePhoto = () => {
    const photo = photoRef.current
    const data = photo.toDataURL('image/jpeg')
    setImageToCrop(data)
    stopWebcam()
  }

  const stopWebcam = () => {
    const video = videoRef.current
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
              <video onPlay={() => getSnapshot()} ref={videoRef} />
              <button type="button" onClick={() => takePhoto()}>Take a photo</button>
              <canvas ref={photoRef} style={{ display: 'none' }} />
            </div> }

    </ModalLayoutComponent>
  )
}