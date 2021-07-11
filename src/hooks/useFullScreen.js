import { useEffect } from 'react'

function disableBodyOverflow() {
  document.body.classList.toggle('noscroll')
}

export default function useFullScreen(isHookDisabled) {
  useEffect(() => {
    if (!isHookDisabled) {
      disableBodyOverflow()
      return () => disableBodyOverflow()
    }
    return undefined
  }, [isHookDisabled])
}
