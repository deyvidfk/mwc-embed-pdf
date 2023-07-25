

type TScaleControl = {
    src:string

    disabled?: boolean
}

export function DownloadControl({ src }: TScaleControl) {

    function printPdf() {
        var iframe = document.createElement('iframe');
        // iframe.id = 'pdfIframe'
        iframe.className='pdfIframe'
        document.body.appendChild(iframe);
        iframe.style.display = 'none';
        iframe.onload = function () {
            setTimeout(function () {
                iframe.focus();
                
                if(iframe.contentWindow){
                    iframe.contentWindow?.print();
                    URL.revokeObjectURL(src)
                }
               
                // document.body.removeChild(iframe)
            }, 1);
        };
        iframe.src = src;
        // URL.revokeObjectURL(url)
    }

    return     <div className="mrc-embed-pdf__toolbar-item"><a href={src} target="_blank" download>Download</a></div>
}
