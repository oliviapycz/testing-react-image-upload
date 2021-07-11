/* eslint-disable */
import React, { useState } from "react";

export const StoreContext = React.createContext(null)

export default ({ children }) => {
  const [imagePreview, setImagePreview] = useState('')
  const [base64Preview, setBase64Preview] = useState('')
  const [imageToCrop, setImageToCrop] = useState('')
  const store = {
    imagePreview: [imagePreview, setImagePreview],
    imageToCrop: [imageToCrop, setImageToCrop],
    base64Preview: [base64Preview, setBase64Preview],
  }
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}