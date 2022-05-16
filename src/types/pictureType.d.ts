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

interface pictureItemProps {
  data: pictureItemType;
  downloadCatImage: (fileName: string, filePath: string) => void;
}

interface useCatPicturesResult {
  data: Array<pictureItemType>;
  nextId: number;
  previousId: number;
}
