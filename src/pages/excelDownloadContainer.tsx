import { saveAs } from 'file-saver'
import excelDownloadService from '../services/excelDownloadService'

function ExcelDownloadContainer() {
    // TODO: PDF 다운로드
    // *1. file-saver 사용
    // const downloadPDF = () => {
    //     // download url 있는 경우
    //     saveAs(
    //         "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    //         "example.pdf"
    //     )
    // }

    // *2. axios 사용
    const downloadPDF = async (fileName: string) => {
        const domain = window.location.origin;
        const downloadPath = domain + "/download/pdf/" + fileName + ".pdf";
        excelDownloadService.useDownloadPDF(fileName, downloadPath)
    }

    // TODO: .xlsx 다운로드
    const downloadExcel = (fileName: string, fileType: ".xlsx" | ".xls") => {
        const domain = window.location.origin;
        const downloadPath = domain + "/download/excel/" + fileName + fileType;
        // console.log(downloadPath)// http://localhost:3000/download/excel/sample100.xlsx
        excelDownloadService.useDownloadExcel(fileName, downloadPath)
    }

    return (
        <div>
            <button onClick={() => { downloadPDF("dummy") }}>dummyPDF download</button>
            <button onClick={() => { downloadExcel("Sample100", ".xlsx") }}>Sample100.xlsx 다운로드</button>
            <button onClick={() => { downloadExcel("Sample100", ".xls") }}>Sample100.xls 다운로드</button>
            <button>create dummyPDF</button>
            <button>create dummy.xlsx</button>
        </div>
    )
}

export default ExcelDownloadContainer