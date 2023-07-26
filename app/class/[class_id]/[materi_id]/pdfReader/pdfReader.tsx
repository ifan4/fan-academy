'use client'
import { useState } from "react";
import { pdfjs, Document, Page } from 'react-pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import '../pdfReader/pdfReader.css'
import { Button } from "@/components/ui/button";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const options = {
    cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
    cMapPacked: true,
};

export default function PDFReader({filePDF}: {filePDF: any}) {

    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);

    function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
        setNumPages(nextNumPages);
    }

    return(
        <div>
            <div className="container bg-gradient-to-r from-cyan-500 to-emerald-950">
                <h1 className="text-white scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 py-4">
                    MODUL
                </h1>
                <div
                className={`container__document`}
                >
                <Document
                className={'lg:h-[800px]'}
                file={filePDF} 
                
                onLoadSuccess={onDocumentLoadSuccess}>
                    <Page
                    className={'lg:h-[800px]'}
                    pageNumber={pageNumber} />
                </Document>

                </div>
                <div className="flex justify-center items-center relative z-50">
                    <Button 
                    disabled={pageNumber !== 1 ? false : true}
                    onClick={()=>setPageNumber( pageNumber - 1)}>
                        {" < "}
                    </Button>
                    <span className="mx-2 text-white">Page {pageNumber} of {numPages}</span>
                    <Button
                    disabled={pageNumber !== numPages ? false : true}
                    onClick={()=>setPageNumber(pageNumber + 1)}
                    >
                        {" > "}
                    </Button>
                </div>
            </div>
        </div>
    )
}