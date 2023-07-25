import { useEffect, useState } from "react";
import { useControls } from "../useControls";


type TScaleControl = {
    onChange?: ({ scale }: { scale: number }) => void
    disabled?: boolean
}

export function ScaleControl({ onChange }: TScaleControl) {

    const { scale } = useControls()
    const [inputRef, setInputRef] = useState(scale.value)

    useEffect(() => {
        setInputRef(scale.value)
        if (onChange) onChange({ scale: scale.value })
    }, [scale])

    return <div className="mrc-embed-pdf__toolbar-item">
        <label className="mrc-embed-pdf__control-scale-label">Zoom:</label>
        <span className="mrc-embed-pdf__control-scale-value">{scale.value}</span>
        <input
            value={inputRef}
            className="mrc-embed-pdf__control-input"
            id="pdf-scale-control-zoom"
            type="range" defaultValue={1} min={1} max={3} step={0.25} onChange={(eve) => {
                scale.set(Number(eve.currentTarget.value))
                setInputRef(Number(eve.currentTarget.value))
            }} />
    </div>
}
