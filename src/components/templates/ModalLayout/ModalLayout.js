/* eslint react/destructuring-assignment: 0 */
import React, {
  useCallback,
  useEffect,
} from 'react'
import ReactDOM from 'react-dom'
import './ModalLayout.css';
import useFullScreen from '../../../hooks/useFullScreen'


export function ModalLayoutComponent(props) {
  const {
    children,
    onClose,
  } = props

  useFullScreen()


  const closeOnEscapeKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', closeOnEscapeKeyDown)
    return () => {
      document.removeEventListener('keydown', closeOnEscapeKeyDown)
    }
  }, [closeOnEscapeKeyDown])

  return ReactDOM.createPortal(
    <div onClick={onClose} className="modal">
      <article onClick={(e) => e.stopPropagation()}>
        <header>
          <button onClick={onClose}>
            close
          </button>
        </header>
        <section>
            {children}
        </section>
      </article>
    </div>,
    document.getElementById('root')
  )
}
