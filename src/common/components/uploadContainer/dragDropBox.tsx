import {
  useState,
  useRef,
  useCallback,
  useEffect,
  ChangeEvent,
  MouseEventHandler,
} from "react";
import uploadService from "../../../services/uploadService";
import LoadingIndicator from "../loadingIndicator";

function DragDropBox() {
  // drag 하는중인지 아닌지 확인할 변수 isDragging
  const [isDragging, setIsDragging] = useState<boolean>(false);
  // 올린 파일, 미리보기 관리할 files
  const [file, setFile] = useState<uploadFileTypes>({
    preview: null,
    file: null,
  });
  // drag 감지하는 ref
  const dragRef = useRef<HTMLLabelElement | null>(null);
  // useMutation 관련
  const formdata = new FormData();
  const { mutate, status, reset } = uploadService.useUploadCatPictures(formdata);

  // TODO: 파일 업로드 관련
  const onChangeFiles = (e: ChangeEvent<HTMLInputElement> | any) => {
    let currentFile: File | null = null;
    const reader = new FileReader();
    if (e.type === "drop") {
      // drop event에 들어온 파일 가져오기
      currentFile = e.dataTransfer.files[0];
    } else {
      // drop event 이외(=change)로 들어온 파일 가져오기
      currentFile = e.target.files[0];
    }

    reader.onloadend = () => {
      setFile((prevFile) => {
        return {
          ...prevFile,
          preview: reader.result as string,
          file: currentFile,
        };
      });
    };
    reader.readAsDataURL(currentFile as File);
  };

  // TODO: 드래그 인식 영역에 들어옴 + 나감
  const handleDragIn: (e: DragEvent) => void = useCallback((e: DragEvent) => {
    console.log("dragin");
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const handleDragOut: (e: DragEvent) => void = useCallback((e: DragEvent) => {
    console.log("dragout");
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  // TODO : 드래그 인식 영역 내에 있음 + 영역 내에서 마우스 놓음
  const handleDragOver: (e: DragEvent) => void = useCallback((e: DragEvent) => {
    console.log("dragover");
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer!.files) {
      setIsDragging(true);
    }
  }, []);
  const handleDrop: (e: DragEvent) => void = useCallback((e: DragEvent) => {
    console.log("drop");
    e.preventDefault();
    e.stopPropagation();

    onChangeFiles(e);
    setIsDragging(false);
  }, []);

  // TODO: eventListener 등록
  const initDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter", handleDragIn);
      dragRef.current.addEventListener("dragleave", handleDragOut);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  // TODO: eventListener 해제
  const resetDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener("dragenter", handleDragIn);
      dragRef.current.removeEventListener("dragleave", handleDragOut);
      dragRef.current.removeEventListener("dragover", handleDragOver);
      dragRef.current.removeEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  // TODO: 리셋
  const resetUpload = () => {
    setFile((prevFile) => {
      return {
        ...prevFile,
        preview: null,
        file: null,
      };
    });
    console.log("리셋함!")
    reset();
  };

  // TODO: 사진 업로드
  const uploadPicture = async () => {
    formdata.append("file", file.file as Blob, "file");
    formdata.append("sub_id", "");

    mutate();
  };

  // TODO: 보여질 버튼 
  const buttonStatus = (status: string) => {
    switch (status) {
      case ("error"):
        return (
          <button
            className="uploadFileSubmit"
            type="button"
            onClick={resetUpload}
          >
            에러 (이 text는 일부러 merge error내려고 추가함)
          </button>)
      case ("loading"):
        return (
          <LoadingIndicator />
        )
      case ("success"):
        return (
          <button
            className="uploadFileSubmit"
            type="button"
            onClick={uploadPicture}
          >
            업로드 하기
          </button>)
      default:
        return (
          <button
            className="uploadFileSubmit"
            type="button"
            onClick={uploadPicture}
          >
            업로드 하기
          </button>)
    }
  }

  useEffect(() => {
    initDragEvents();
    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  return (
    <>
      <div className="dragDropBoxWrapper">
        <input
          type="file"
          id="fileUpload"
          onChange={onChangeFiles}
          accept="image/jpg, image/jpeg, image/png"
        />
        <label
          className={isDragging ? "dragDropBox active" : "dragDropBox"}
          htmlFor="fileUpload"
          ref={dragRef}
        >
          이미지 업로드
        </label>
        {file.file !== null ? (
          <>
            <div className="uploadFileWrapper">
              <div className="uploadFile">
                <img
                  src={file.preview as string}
                  alt={(file.file as File).name}
                />
                <div className="uploadFileInfo">
                  <p>{(file.file as File).name}</p>
                  <button type="button" onClick={resetUpload}>
                    &times;
                  </button>
                </div>
              </div>
            </div>
            {buttonStatus(status)}
          </>
        ) : (
          null
        )}
      </div>
    </>
  );
}

export default DragDropBox;
