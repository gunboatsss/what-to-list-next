import { useEffect, useState } from "react"
import Image from "next/image";

export default function Columns() {
    const [Data, setData] = useState<
        Array<
            {
                id: string,
                symbol: string,
                name: string,
                image: string,
                market_cap: Number,
                total_volume: Number
            }
        >
    >
    ();
    const listed = [
        'eth',
        'btc',
        'bnb',
        'aave',
        'sol',
        'avax',
        'atom',
        'axs',
        'link',
        'uni',
        'ape',
        'dydx',
        'op',
        'near',
        'arb',
        'matic',
        'flow',
        'ftm',
        'doge'
    ]
    useEffect(() => {
        async function getTopCoin() {
            const top = await fetch(
                '/api/getcoin'
            ).then(res => res.json());
            console.log(top);
            setData(top);
        }
        getTopCoin();
    }, []);
    return (
        <>
            {Data && Data
                .filter(
                    (coin) => {
                        if (coin.symbol.includes('usd') || coin.symbol.includes('dai')) return false; //stablecoin
                        if (coin.symbol.includes('eth') && coin.symbol.length > 3) return false; // staked eth
                        if (coin.symbol.includes('btc') && coin.symbol.length > 3) return false; // wrapped btc
                        if (coin.symbol.includes('xaut') || coin.symbol.includes('paxg')) return false;
                        return true;
                    }
                )
                .map((coin) => {
                    console.log(coin);
                    return (<tr key={coin.id}>
                        <td>
                            <Image
                                alt={
                                    'image for' + coin.symbol
                                }
                                src={coin.image}
                                width={25}
                                height={25} />
                        </td>
                        <td>
                            {coin.symbol.toUpperCase()}
                        </td>
                        <td>
                            {coin.name}
                        </td>
                        <td>
                            {coin.market_cap.toLocaleString()}
                        </td>
                        <td>
                            {coin.total_volume.toLocaleString()}
                        </td>
                        <td>
                            {coin.symbol.includes('snx') ? '⛔' :
                                listed.includes(coin.symbol) ?
                                    '✅' : '❌'
                            }
                        </td>
                    </tr>)
                })}
        </>
    )
}