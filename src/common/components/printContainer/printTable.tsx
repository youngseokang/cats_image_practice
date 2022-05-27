import { CSSProperties, forwardRef } from "react";

const tableStyle: CSSProperties = {
    backgroundColor: '#000',
    color: '#fff'
}
// const PrintTable = forwardRef<HTMLTableElement, printTableProps>((props, ref) => {
const PrintTable = forwardRef<HTMLTableElement, printTableProps>((props, ref) => {
    const { data } = props;
    return (
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
                {data.map((el) => {
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
    );
})

export default PrintTable;