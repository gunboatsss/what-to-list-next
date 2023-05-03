import Columns from "./Columns";

export default function Table() {
    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th>Asset</th>
                    <th>Market Cap</th>
                    <th>Volume</th>
                    <th>Listed On Synthetix Perps</th>
                </tr>
            </thead>
            <tbody>
                <Columns />
            </tbody>
        </table>
    )
}