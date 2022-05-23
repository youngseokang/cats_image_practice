import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import useAxios from "../hooks/useAxios";

const useDownloadPDF = async (fileName: string, downloadPath: string) => {
    try {
        const { data } = await useAxios.get(downloadPath, {
            responseType: "arraybuffer"
        })
        const downloadUrl = window.URL.createObjectURL(new Blob([data], { type: 'application/pdf' }));
        const downloadLink = document.createElement("a");
        downloadLink.href = downloadUrl;
        downloadLink.setAttribute("download", fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
        window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
        console.log(err);
        alert('다시 시도해 주세요!')
    }
}

const useDownloadExcel = async (fileName: string, downloadPath: string) => {
    try {
        const { data, headers } = await useAxios.get(downloadPath, {
            responseType: "blob"
        })
        console.log(`data: ${data}`);
        const downloadUrl = window.URL.createObjectURL(new Blob([data], { type: headers["content-type"] }));
        console.log(`new Blob([data], { type: headers["content-type"] }): ${new Blob([data], { type: headers["content-type"] })}`);
        const downloadLink = document.createElement("a");
        downloadLink.href = downloadUrl;
        downloadLink.setAttribute("download", fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
        window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
        console.log(err);
        alert('다시 시도해 주세요!')
    }
}

const excelDownloadService = {
    useDownloadPDF,
    useDownloadExcel
}

export default excelDownloadService;