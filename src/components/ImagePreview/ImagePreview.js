import React from 'react';
import { NoProfilePictureIconComponent } from "../../Icons/NoProfilePicture.component";

export function ImagePreview(props) {
  const { imagePreview } = props

  return (
    <>
      <p>Image preview</p>
      { imagePreview
        ? <img src={imagePreview} alt="alt" width="90" height="auto" />
        : <NoProfilePictureIconComponent /> }
    </>
  )
}