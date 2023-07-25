
type TControlContainer = {
    disabled?: boolean,
    as: any
    aling:any
    gap:any
}

export function ControlPanel({ children, as: asProp }: React.PropsWithChildren<TControlContainer>) {

    const Component = asProp
    return <Component role="toolbar" aria-label="Barra de PDF" className="mrc-embed-pdf__toolbar">
        {children}
    </Component>
}

