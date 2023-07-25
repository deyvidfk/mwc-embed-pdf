
import { PageList } from "./Pages/PageList"
import { DocumentRoot} from "./Document"
import { ControlPanel } from "./Controls"
import { PaginationControl } from "./Controls/Pagination"
import { RotateControl } from "./Controls/Rotation"
import { ScaleControl } from "./Controls/Scale"
import { DownloadControl } from "./Controls/Download"
import { PrintControl } from "./Controls/Print"

export const EmbedPdf = {
    Document:DocumentRoot,
    Print:PrintControl,
    PageList:PageList,
    Download:DownloadControl,
    Scale:ScaleControl,
    Rotate:RotateControl,
    Pagination:PaginationControl,
    Toolbar:ControlPanel,
}