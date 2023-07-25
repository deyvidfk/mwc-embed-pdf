import { useEffect, useState } from "react";
import { useControls } from "../useControls";


type TRotateControl = {
    onChange?: ({ degree }: { degree: number }) => void
    disabled?: boolean
}

export function RotateControl({ onChange }: TRotateControl) {

    const { rotate } = useControls()
    const [inputRef, setInputRef] = useState(rotate.value)

    useEffect(() => {
        setInputRef(rotate.value)
        if (onChange) onChange({ degree: rotate.value })
    }, [rotate.value])

    return <div    className="mrc-embed-pdf__toolbar-item">
        <label htmlFor="pdf-scale-control-zoom"> Girar: {rotate.value}</label>
        <input
            value={inputRef}
            className="mrc-embed-pdf__control-input"
            type="range" defaultValue={0} min={0} max={270} step={90} onChange={(eve) => {
                rotate.set(Number(eve.currentTarget.value))
                setInputRef(Number(eve.currentTarget.value))
            }} />
    </div>
}
