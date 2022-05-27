import ReactToPrint from "react-to-print"
import { CSSProperties, useRef, useEffect } from "react";
import PrintTable from "../common/components/printContainer/printTable";

function PrintContainer() {
    const ref = useRef<HTMLTableElement>(null);
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

    const tableStyle: CSSProperties = {
        backgroundColor: '#000',
        color: '#fff'
    }

    return (
        <div>
            <ReactToPrint
                trigger={() => <button>프린트하기</button>}
                content={() => ref.current}
            />
            <PrintTable ref={ref} data={JSONdata} />
            <table id='orderTable' ref={ref}>
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
        </div>)
}

export default PrintContainer