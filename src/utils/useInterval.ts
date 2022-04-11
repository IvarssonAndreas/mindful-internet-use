import * as React from 'react'

const {useEffect, useRef} = React

type Callback = (...args: any[]) => void | unknown

export function useInterval(callback: Callback, delay: number | null) {
  const savedCallback = useRef<Callback | null>(null)

  useEffect(() => {
    if (delay === null) return
    savedCallback.current = callback
  })

  useEffect(() => {
    if (delay === null) return
    function tick() {
      if (savedCallback.current !== null) {
        savedCallback.current()
      }
    }
    const id = setInterval(tick, delay)
    return () => clearInterval(id)
  }, [delay])
}
