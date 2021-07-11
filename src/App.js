/* eslint-disable */
import React, { useCallback, useEffect, useState } from "react";
import { UploadImage } from './components/UploadImage';
import { OpenWebcam } from './components/OpenWebcam';
import { OpenModalComponent} from "./components/OpenModal";
import './App.css';
import { NoProfilePictureIconComponent } from './Icons/NoProfilePicture.component'
import { StoreContext } from './Provider/sharedStore'


export default function App() {
  const {
    imagePreview: [imagePreview, setImagePreview],
    base64Preview: [base64Preview, setBase64Preview],
  } = React.useContext(StoreContext)

  const [base64Result, setBase64Result] = useState('')

  const toBase64 = useCallback((base64Preview) => {
    const reader = new FileReader();
    reader.readAsDataURL(base64Preview);
    reader.onloadend = function() {
      setBase64Result(reader.result.slice(0, 50))
      return reader.result;
    }
  })

  useEffect(() => {
    if (base64Preview) {
      toBase64(base64Preview)
    }
  }, [toBase64, base64Preview])


  return (
    <>
      <header>
        <h1>Testing Image Upload</h1>
        
      </header>
      <main>
        <div>
          <p>Image preview</p>
          <ImagePreview imagePreview={imagePreview}/>
          <p>Image URL: {imagePreview ? imagePreview : 'none'}</p>
          <p>Base64: { base64Result ? base64Result + ' [...]' : 'none'}</p>
        </div>
        <div className="userSelection">
          <OpenModalComponent modal={UploadImage} label="Image Upload"/>
          <OpenModalComponent modal={OpenWebcam} label="Image Webcam"/>
        </div>
      </main>
    </>
  )
}

function ImagePreview(props) {
  const { imagePreview } = props
  
  return (
    <>
      { imagePreview
          ? <img src={imagePreview} alt="alt" width="90" height="auto" />
          : <NoProfilePictureIconComponent /> }
    </>
  )
}