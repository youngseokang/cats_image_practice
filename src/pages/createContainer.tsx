import * as XLSX from 'xlsx'
import FileSaver from 'file-saver';
import { CSVLink } from 'react-csv';
import { CSSProperties, useMemo } from 'react';

function CreateContainer() {
    // API로 받아오는 정보로 table 만듬
    const JSONdata: Array<orderItemType> = [
        {
            id: 1,
            orderDate: `2021.09.09 12:10:10`, // 주문일
            orderer: `(올바로)홍길동`, // 의뢰인
            departure: `서울시 강남구 역삼동 111-222`, // 출발지
            destination: `서울시 강남구 역삼동 111-222`, // 도착지
            vehicle: `오토바이`, // 차종
            prepaid: 0,  // 대납
            statement: [{ option: `기본`, price: 20000 }], // 운임 내역
            totalAmount: 20000, // 총 운임
            paymentMethod: `카드`, // 결제
            etc: [
                {
                    item: '서류/쇼핑백',
                    amount: 1
                }
            ], // 비고
            orderStatus: `배치중`, // 진행 상태
        },
        {
            id: 2,
            orderDate: `2021.09.09 12:10:10`, // 주문일
            orderer: `(올바로)홍길동`, // 의뢰인
            departure: `서울시 강남구 역삼동 111-222`, // 출발지
            destination: `서울시 강남구 역삼동 111-222`, // 도착지
            vehicle: `오토바이`, // 차종
            prepaid: 0,  // 대납
            statement: [{ option: `기본`, price: 20000 }], // 운임 내역
            totalAmount: 20000, // 총 운임
            paymentMethod: `카드`, // 결제
            etc: [
                {
                    item: '서류/쇼핑백',
                    amount: 1
                }
            ], // 비고
            orderStatus: `배치중`, // 진행 상태
        },
        {
            id: 3,
            orderDate: `2021.09.09 12:10:10`, // 주문일
            orderer: `(올바로)홍길동`, // 의뢰인
            departure: `서울시 강남구 역삼동 111-222`, // 출발지
            destination: `서울시 강남구 역삼동 111-222`, // 도착지
            vehicle: `오토바이`, // 차종
            prepaid: 0,  // 대납
            statement: [{ option: `기본`, price: 20000 }], // 운임 내역
            totalAmount: 20000, // 총 운임
            paymentMethod: `카드`, // 결제
            etc: [
                {
                    item: '서류/쇼핑백',
                    amount: 1
                }
            ], // 비고
            orderStatus: `배송 완료`, // 진행 상태
        },
    ];
    // TODO: 깊은 복사 함수
    const handleDeepCopy = (target: any) => { // 다 들어올 수 있어서 any
        let result: Array<any> | { [key: string]: any }, value: any, key: string;
        if (typeof target !== 'object' || target === null) return target;

        result = Array.isArray(target) ? [] : {};

        if (Array.isArray(result)) { // 값을 담을 공간이 배열이라면
            target.map((el: any) => result.push(handleDeepCopy(el)));
        } else { // 값을 담을 공간이 객체라면
            for (key in target) {
                value = target[key];
                result[key] = handleDeepCopy(value);
            }
        }
        return result;
    }

    const JSONdataCopy: Array<orderItemType> = useMemo(() => handleDeepCopy(JSONdata), []);
    console.log(`JSONdata === JSONdataCopy: ${JSONdata === JSONdataCopy}, 
        JSONdata[0] === JSONdataCopy[0]: ${JSONdata[0] === JSONdataCopy[0]} `) // 깊은 복사 성공

    const headers = [
        { label: "순번", key: "id" },
        { label: "주문일", key: "orderDate" },
        { label: "의뢰인", key: "orderer" },
        { label: "출발지", key: "departure" },
        { label: "도착지", key: "destination" },
        { label: "차종", key: "vehicle" },
        { label: "대납", key: "prepaid" },
        { label: "운임내역", key: "statement" },
        { label: "총 운임", key: "totalAmount" },
        { label: "결제", key: "paymentMethod" },
        { label: "비고", key: "etc" },
        { label: "진행상태", key: "orderStatus" },
    ];
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    // TODO: JSON데이터 -> excel
    const createAndDownload1 = (tempCSVdata: Array<orderItemType>, fileName: string) => {
        // xlsx는 nested array 처리 못해줌 -> 직접 변환해줘야 함
        const modifiedCSVdata = tempCSVdata.map((el) => {
            if (el.statement) {
                let modStatement: string[] | string = (el.statement as Array<statementType>).map((e) => {
                    const { option, price } = e;
                    return `${option} ${price},`
                })
                modStatement = modStatement.reduce((acc, cur) => acc += cur);
                el.statement = modStatement.slice(0, modStatement.length - 1);
            }
            if (el.etc) {
                let modEtc: string[] | string = (el.etc as Array<etcType>).map((e) => {
                    const { item, amount } = e;
                    return `${item}: ${amount},`;
                })
                modEtc = modEtc.reduce((acc, cur) => acc += cur);
                el.etc = modEtc.slice(0, modEtc.length - 1);
            }
            return el;
        })
        console.log(modifiedCSVdata)
        const ws = XLSX.utils.json_to_sheet(modifiedCSVdata);
        console.log(ws)
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    // TODO: Table -> excel (xlsx사용)
    const createAndDownload2 = (fileName: string) => {
        const wb = XLSX.utils.table_to_book(document.getElementById('orderTable'), { sheet: "order", raw: true });
        // console.log(wb) // {SheetNames: Array(1), Sheets: { order: {...} }}
        const excelBuffer = XLSX.writeFile(wb, `${fileName}${fileExtension}`);
        // console.log(excelBuffer) // undefined
    }

    // TODO: Table -> excel (react-csv 사용)
    const createAndDownload3 = (tempCSVdata: Array<orderItemType>, fileName: string) => {
        // // ! el.statement.map이 불가능하다는 에러 발생 -> 깊은복사 / 얕은 복사 때문이였음. 해결완료
        const modifiedCSVdata = tempCSVdata.map((el) => {
            if (el.statement) {
                let modStatement: string[] | string = (el.statement as Array<statementType>).map((e) => {
                    const { option, price } = e;
                    return `${option} ${price},`
                })
                modStatement = modStatement.reduce((acc, cur) => acc += cur);
                el.statement = modStatement.slice(0, modStatement.length - 1);
            }
            if (el.etc) {
                let modEtc: string[] | string = (el.etc as Array<etcType>).map((e) => {
                    const { item, amount } = e;
                    return `${item}: ${amount},`;
                })
                modEtc = modEtc.reduce((acc, cur) => acc += cur);
                el.etc = modEtc.slice(0, modEtc.length - 1);
            }
            return el;
        })

        return (
            <CSVLink
                headers={headers}
                data={modifiedCSVdata}
                // data={tempCSVdata}
                filename={fileName}
                target="_blank"
            >
                table -&gt; Excel (react-csv사용)
            </CSVLink>
        )
    }

    const tableStyle: CSSProperties = {
        backgroundColor: '#000',
        color: '#fff'
    }

    return (
        <div>
            <button onClick={() => { createAndDownload1(JSONdata, "test1") }}>JSON -&gt; Excel</button>
            <button onClick={() => { createAndDownload2("test2") }}>table -&gt; Excel (xlsx사용)</button>
            <button>{createAndDownload3(JSONdataCopy, "test3")}</button>
            <table id='orderTable'>
                <thead style={tableStyle}>
                    <tr>
                        <td>순번</td>
                        <td>주문일</td>
                        <td>의뢰인</td>
                        <td>출발지</td>
                        <td>도착지</td>
                        <td>차종</td>
                        <td>대납</td>
                        <td>운임내역</td>
                        <td>총 운임</td>
                        <td>결제</td>
                        <td>비고</td>
                        <td>진행상태</td>
                    </tr>
                </thead>

                <tbody>
                    {JSONdata.map((el) => {
                        return (
                            <tr>
                                <td>{el.id}</td>
                                <td>{el.orderDate}</td>
                                <td>{el.orderer}</td>
                                <td>{el.departure}</td>
                                <td>{el.destination}</td>
                                <td>{el.vehicle}</td>
                                <td>{el.prepaid}</td>
                                {(el.statement as Array<statementType>).map((e) => {
                                    const { option, price } = e;
                                    return <td>{option} {price}</td>
                                })}
                                <td>{el.totalAmount}</td>
                                <td>{el.paymentMethod}</td>
                                {(el.etc as Array<etcType>).map((e) => {
                                    const { item, amount } = e;
                                    return <td>{item}: {amount}</td>
                                })}
                                <td>{el.orderStatus}</td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>
        </div>
    )
}
export default CreateContainer;