import { saveAs } from 'file-saver'
import { useState } from 'react'
import excelDownloadService from '../services/excelDownloadService'

function ExcelDownloadContainer() {
    const [excelState, setExcelState] = useState([])
    // TODO: PDF 다운로드
    // *1. file-saver 사용
    const downloadPDF1 = (fileName: string) => {
        // download url 있는 경우
        saveAs(
            "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            `${fileName}.pdf`
        )
    }

    // *2. axios 사용
    const downloadPDF2 = async (fileName: string) => {
        const domain = window.location.origin;
        const downloadPath = domain + "/download/pdf/" + fileName + ".pdf";
        excelDownloadService.useDownloadPDF(fileName, downloadPath)
    }

    // TODO: .xlsx 다운로드
    const downloadExcel1 = (fileName: string, fileType: ".xlsx" | ".xls") => {
        const domain = window.location.origin;
        const downloadPath = domain + "/download/excel/" + fileName + fileType;
        // console.log(downloadPath)// http://localhost:3000/download/excel/sample100.xlsx
        excelDownloadService.useDownloadExcel(fileName, downloadPath)
    }

    const downloadExcel2 = (fileName: string, fileType: ".xlsx" | ".xls") => {
        const domain = window.location.origin;
        const downloadPath = domain + "/download/excel/" + fileName + fileType;
        // console.log(downloadPath)// http://localhost:3000/download/excel/sample100.xlsx
        // excelDownloadService.useDownloadExcel(fileName, downloadPath)
        saveAs(
            downloadPath,
            `${fileName}.${fileType}`
        )
    }

    return (
        <div>
            <button onClick={() => { downloadPDF1("dummy") }}>dummyPDF download</button>
            <button onClick={() => { downloadPDF2("dummy") }}>dummyPDF download</button>
            <button onClick={() => { downloadExcel1("Sample100", ".xlsx") }}>Sample100.xlsx 다운로드</button>
            <button onClick={() => { downloadExcel2("Sample100", ".xls") }}>Sample100.xls 다운로드</button>
            <div>
                <button>create dummyPDF</button>
                <button>create dummy.xlsx</button>
            </div>
        </div>
    )
}

export default ExcelDownloadContainer