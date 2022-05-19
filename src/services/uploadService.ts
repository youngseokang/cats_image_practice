import { useMutation } from "react-query";
import { AxiosError } from "axios";
import useAxios from "../hooks/useAxios";

const useUploadCatPictures = (formdata: FormData) => {
    return useMutation<any, AxiosError>(
        () => useAxios.post(`/images/upload`, formdata, {
            headers: {
                "Content-type": "multipart/form-data",
            },
        }),
        {
            onError: (err) => console.log(err)
        }
    )
}

const uploadService = {
    useUploadCatPictures
}

export default uploadService;