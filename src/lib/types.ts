export interface TGetter<T> {
    value: T
}

export interface TSetter<T> {
    set: (value: T) => void
}

export interface TGetterSetter<T> extends TGetter<T>, TSetter<T> {
}

export type TPagination = {
    // (page:number,total:number):void
    page: TGetterSetter<number>
    total: TGetter<number>
}

export type TControlsProviderResult = {
    rotate: TGetterSetter<number>
    scale: TGetterSetter<number>
    pagination: TPagination
}

export type TControlsProviderValue = {
    scale: number
    rotate:number
    pagination: { page: number, total: number }
}



export type TPaginationContext = {
    page: number
    total: number
    toGo: (page: number) => void
}


export type OnHandler = {
    name: string
    meta: unknown
}
export type PdfReaderProps = {
    src: string
    ControlsRenderer?: React.ReactNode
    LoadingRenderer?: React.ComponentType
    eventListener?: (value: OnHandler) => void
    slotProps?: {
        DocumentProps: unknown
    }
}