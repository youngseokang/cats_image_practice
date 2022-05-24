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

/* UploadContainer 관련 */
interface uploadFileTypes {
  preview: string | ArrayBuffer | null;
  file: File | null;
}

/* excelDownloadService 관련 */
interface downloadPDFTypes {
  data: ArrayBuffer | BlobPart
}

/* CreateContainer 관련 */
interface etcType {
  item: string;
  amount: number;
}

interface statementType {
  option: string;
  price: number;
}

interface orderItemType {
  id: number; // 순번
  orderDate: string; // 주문일
  orderer: string; // 의뢰인
  departure: string; // 출발지
  destination: string; // 도착지
  vehicle: string; // 차종
  prepaid: number;  // 대납
  statement: Array<statementType> | string; // 운임 내역
  totalAmount: number; // 총 운임
  paymentMethod: string; // 결제
  etc: Array<etcType> | string; // 비고
  orderStatus: string; // 진행 상태
}

interface tempOrderItemType extends orderItemType {
  id: number; // 순번
  orderDate: string; // 주문일
  orderer: string; // 의뢰인
  departure: string; // 출발지
  destination: string; // 도착지
  vehicle: string; // 차종
  prepaid: number;  // 대납
  totalAmount: number; // 총 운임
  paymentMethod: string; // 결제
  orderStatus: string; // 진행 상태
  statement: string; // 운임 내역
  etc: string; // 비고
}