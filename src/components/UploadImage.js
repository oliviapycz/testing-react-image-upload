import React from 'react';
import { ModalLayoutComponent } from '../components/templates/ModalLayout/ModalLayout'
import { CropImage } from './CropImage';
import { StoreContext } from "../Provider/sharedStore";

export function UploadImage(props) {
  const { imageToCrop: [imageToCrop, setImageToCrop] } = React.useContext(StoreContext)

  const { onClose, label } = props

  const onImageUpload = (event) => {
    if (event.target.files !== null) {
      const file = event.target.files[0]
      const imageUrl = URL.createObjectURL(file)
      setImageToCrop(imageUrl)
    }
  }
  
  return (
    <ModalLayoutComponent
      titleLabel={label}
      onClose={onClose}
    >

      {imageToCrop
          ? <CropImage
            onClose={onClose}
          />
          : <input
          type="file"
          id="picture"
          name="picture"
          required
          accept="image/*"
          onChange={onImageUpload}
        /> }
    </ModalLayoutComponent>
  )
}