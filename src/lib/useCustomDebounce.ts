import { useRef } from "react"

export const useCustomDebounce = () => {
    const timer = useRef(-1)

    const myDebounce = (fn: () => void, time: number) => {
        clearTimeout(timer.current)

        timer.current = setTimeout(() => {
            fn()
        }, time)
    }
    return myDebounce
}
   