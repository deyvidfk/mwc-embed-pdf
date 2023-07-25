import { pdfjs } from "react-pdf";
import "./App.css";
import { EmbedPdf } from "./lib";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

function Loading() {
  return (
    <div className="box">
      Carregando ...
    </div>
  );
}


export default function App() {

  const onHandle = ({ name, meta }: any) => {
    console.log(name, meta)
  }

  const handleOnPageChange = ({ page, count }: any) => {
    console.log("App->handleOnPageChange: ", page, count)
  }

  const handleOnRotateChange = ({ degree }: any) => {
    console.log("App->handleOnRotateChange: ", degree)
  }

  const handleOnScaleChange = ({ scale }: any) => {
    console.log("App->handleOnScaleChange: ", scale)
  }

  return (
    <EmbedPdf.Document src="test.pdf" eventListener={onHandle} LoadingRenderer={Loading}>
      <EmbedPdf.Toolbar as={"fieldset"} aling={"center"} gap={1}>
        <EmbedPdf.Print src="test.pdf" />
        <EmbedPdf.Download src="test.pdf" />
        <EmbedPdf.Scale onChange={handleOnScaleChange} />
        <EmbedPdf.Rotate onChange={handleOnRotateChange} />
        <EmbedPdf.Pagination onChange={handleOnPageChange} />
      </EmbedPdf.Toolbar>
      <EmbedPdf.PageList />
    </EmbedPdf.Document>
  );
}
