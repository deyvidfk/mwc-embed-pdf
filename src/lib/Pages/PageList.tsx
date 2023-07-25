import { useEffect, useMemo, useRef } from "react";
import { useDocumentContext } from "react-pdf";
import { VariableSizeList } from "react-window";
import { usePageList } from "./usePageList";
import { useControls } from "../Controls/useControls";
import { PageListItem } from "./PageListItem";
import { useCustomDebounce } from "../useCustomDebounce";

export const PageList = () => {
    const documentContext = useDocumentContext()
    const { pagination, scale } = useControls()
    const { getPageHeight, windowHeight, windowWidth, pageViewPort, numPages } = usePageList(documentContext?.pdf)
    const variableSizeListRef = useRef<VariableSizeList<unknown>>();
    const internalPage = useRef(pagination.page.value);
    const debounce = useCustomDebounce()


    useEffect(() => {
        if (variableSizeListRef.current && pagination.page.value != internalPage.current) {
            if (variableSizeListRef.current) {
                variableSizeListRef.current?.scrollToItem(pagination.page.value, 'start');
            }
        }
    }, [pagination.page.value])


    const estimatedItemSize = useMemo(() => {
        try {
            return getPageHeight(0)
        } catch (error) {
            return 0
        }
    }, [scale.value])


    useEffect(() => {
        variableSizeListRef.current?.resetAfterIndex(0)
    }, [estimatedItemSize])


    if (!documentContext?.pdf || !pageViewPort) {
        return <>Carregando..</>
    }

    return <VariableSizeList
        className="mrc-embed-pdf__page-list"
        onItemsRendered={(ev) => {
            const forwardValue = ev.visibleStopIndex + 1
            debounce(() => {
                pagination.page.set(forwardValue)
                internalPage.current = forwardValue
            }, 200)
        }}
        ref={variableSizeListRef as any}
        width={windowWidth as number}
        height={windowHeight as number}
        estimatedItemSize={estimatedItemSize}
        itemCount={numPages}
        itemSize={getPageHeight}

        overscanCount={3}

        direction="vertical"

    >
        {PageListItem}
    </VariableSizeList>
}
