import { useState, useRef, useCallback, useEffect } from "react";
import "../../../styles/dragDropBox.css";

function DragDropBox() {
  // drag 하는중인지 아닌지 확인할 변수 isDragging
  const [isDragging, setIsDragging] = useState<boolean>(false);
  // 선택한 파일의 고유 id
  const fileId = useRef<number>(0);
  // drag 감지하는 ref
  const dragRef = useRef<HTMLLabelElement | null>(null);

  // TODO: 드래그 시작 + 끝
  const handleDragIn: (e: DragEvent) => void = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const handleDragOut: (e: DragEvent) => void = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  // TODO : 드래그 해서 끌고 옴 + drop (마우스에서 손 뗌)
  const handleDragOver: (e: DragEvent) => void = useCallback((e: DragEvent) => {
    if (e.dataTransfer!.files) {
      setIsDragging(true);
    }
  }, []);
  const handleDrop: (e: DragEvent) => void = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // onChangeFiles(e);
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

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  return (
    <div className="dragDropBoxWrapper">
      <input type="file" id="fileUpload" />
      <label
        className={isDragging ? "dragDropBox active" : "dragDropBox"}
        htmlFor="fileUpload"
        ref={dragRef}
      >
        이미지 파일 첨부
      </label>
    </div>
  );
}

export default DragDropBox;
