/* pictureContainer 관련 */
interface pictureItemExpType {
  id: number;
  name: string;
}

interface pictureItemType {
  breeds: array<pictureItemExpType>;
  categories?: array<pictureItemExpType>;
  height: number;
  id: string;
  url: string;
  width: number;
}

interface localPictureItemType {
  name: string;
  url: string;
}

interface pictureItemProps {
  data: pictureItemType;
  downloadCatImage: (fileName: string, filePath: string) => void;
}

interface localPictureItemProps {
  data: localPictureItemType;
  downloadLocalCatImage: (fileName: string) => void;
}

interface useCatPicturesResult {
  data: Array<pictureItemType>;
  nextId: number;
  previousId: number;
}

/* uploadContainer 관련 */
interface uploadFileTypes {
  id: number;
  object: File;
}
