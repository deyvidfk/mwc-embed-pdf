import { useEffect, useRef } from "react";
import { usePagination } from "./usePagination";
import { useControls } from "../useControls";



type TPaginationControl = {
    onChange?: ({ page, count }: { page: number, count: number }) => void
    disabled?: boolean
}
export function PaginationControl({ onChange }: TPaginationControl) {

    const inputRef = useRef()

    const { pagination } = useControls()

    const { setCurrentPage, firstPage, lastPage, nextPage, previousPage, pagesCount, currentPage, } = usePagination({ pagesCount: pagination.total.value, page: pagination.page.value })

    useEffect(() => {

        setCurrentPage(pagination.page.value)

        if (onChange)
            onChange({ page: pagination.page.value, count: pagination.total.value })

    }, [pagination.page.value])


    useEffect(() => {

        pagination.page.set(currentPage)

    }, [currentPage])


    const handleKeyPress = (event: any) => {
        console.log("Enter")
        if (event.key == 'Enter') {
            const nv = Number(event.currentTarget.value)
            if (nv <= pagesCount) {
                setCurrentPage(nv)
            } else {
                setCurrentPage(pagesCount)
            }
        }
    }

    const handleBlurPress = (event: any) => {
        const nv = Number(event.currentTarget.value)
        if (nv <= pagesCount && event.currentTarget.value != currentPage) {
            setCurrentPage(nv)
        } else {
            setCurrentPage(pagesCount)
        }
    }


    const handleInputChange = (event: any) => {
        const nv = Number(event.currentTarget.value)

        if (nv <= pagesCount) {
            setCurrentPage(nv)
        }
    }

    return <div className="mrc-embed-pdf__toolbar-item">

        <div style={{padding:"0 8px"}}>
        Página: <input type="number" defaultValue={currentPage} ref={inputRef as any}
                max={pagesCount - 1} min={0} onKeyPress={handleKeyPress} onBlur={handleBlurPress}
            />

            <span> de </span>
            <span >{pagesCount}</span>
        </div>
        <button type="button"
            disabled={currentPage <= 1}

            onClick={firstPage}>
            {"<<"}
        </button>

        <button type="button"
            disabled={currentPage <= 1}

            onClick={previousPage}>
            {"<"}
        </button>


        <button
            type="button"
            disabled={currentPage >= pagesCount}
            onClick={nextPage}
        >
            {">"}
        </button>

        <button
            type="button"
            disabled={currentPage >= pagesCount}
            onClick={lastPage}
        >
            {">>"}
        </button>
    </div>
}



