/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import './OpenModal.css';

export function OpenModalComponent(props) {
  const {
    modal: ModalComponent,
    label,
    ...rest
  } = props

  const [isModalOpened, setModalOpened] = useState(false)

  return (
    <span className="openModal">
      <button onClick={() => setModalOpened(true)} >
        {label}
      </button>
      {isModalOpened && <ModalComponent onClose={() => setModalOpened(false)} {...rest}/>}
    </span>
  )
}
