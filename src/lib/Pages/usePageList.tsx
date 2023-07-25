import { asyncMap } from "@wojtekmaj/async-array-utils";
import { useWindowWidth, useWindowHeight } from "@wojtekmaj/react-hooks";
import { useState, useEffect, useCallback } from "react";
import { useControls } from "../Controls/useControls";

export const usePageList  = (documentInstance: any) => {
    const windowWidth = useWindowWidth();
    const windowHeight = useWindowHeight();
    const [documentRef, setDocumentRef] = useState<any>(documentInstance);
    const [pageViewPort, setPageViewPort] = useState(null);
    const [numPages, setNumPages] = useState(documentInstance.numPages);
    const { scale} = useControls()


    /**
     * React-Window cannot get item size using async getter, therefore we need to
     * calculate them ahead of time.
     */
    useEffect(() => {
        setPageViewPort(null);
        if (!documentRef) {
            return;
        }

        (async () => {
            const pageNumbers = Array.from(new Array(documentRef.numPages)).map(
                (_, index) => index + 1
            );

            const nextPageViewPorts = await asyncMap(pageNumbers, (pageNumber) =>
                documentRef.getPage(pageNumber).then((page: any) => {
                    const r=page.getViewport({ scale:scale.value })
                    return r
                })
            );

            setPageViewPort(nextPageViewPorts as any);
        })();
    }, [documentRef, scale.value]);

    function onDocumentLoadSuccess(nextPdf: any) {
        setDocumentRef(nextPdf);
        setNumPages(nextPdf.numPages);
    }

    const getPageHeight=useCallback((pageIndex: number)=> {
        if (!pageViewPort) {
            throw new Error("getPageHeight() called too early");
        }



        const pageViewport = pageViewPort[pageIndex] as any;

        console.log("getPageHeight",pageViewport.height)

        return pageViewport.height+1;
    },[pageViewPort, scale.value])


    return {
        documentRef,
        getPageHeight,
        onDocumentLoadSuccess,
        windowWidth,
        windowHeight,
        pageViewPort,
        numPages,
    }
}