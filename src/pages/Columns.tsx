import { useEffect, useState } from "react"
import Image from "next/image";
import { ethers } from 'ethers'
import { usePerpsV2MarketDataAllProxiedMarketSummaries } from "../generated";

export default function Columns() {
    const [Data, setData] = useState<
        Array<
            {
                id: string,
                symbol: string,
                name: string,
                image: string,
                market_cap: number,
                total_volume: number
            }
        >
    >
        ();
    const { data: listed, isLoading } = usePerpsV2MarketDataAllProxiedMarketSummaries({
        select: (data) =>
            data.map(
                (market) =>
                    ethers.utils.toUtf8String(market.asset).replace(/\0|s/g, '').toLowerCase()
            )
    });
    const stablecoin = ['usdc', 'usdt', 'susd', 'dai', 'frax', 'lusd', 'busd', 'tusd', 'alusd', 'usdd'];
    let forex = new Map<string, string>();
    function genForex(assets: Array<string>, type: string) {
            assets.forEach((asset) => forex.set(asset, type));
        };
    genForex(['xaut', 'paxg'], 'xau');
    genForex(['eurs', 'euroc', 'ageur', 'eurt'], 'eur')
    function listOrNot(symbol: string) {
        if (symbol.includes('snx')) return '⛔';
        else if (forex.has(symbol)) return '✅*';
        else if (listed?.includes(symbol)) return '✅';
        else return '❌';
    }
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
            {!isLoading && Data && Data
                .filter(
                    (coin) => {
                        if (stablecoin.includes(coin.symbol)) return false; //stablecoin
                        if (coin.symbol.includes('eth') && coin.symbol.length > 3) return false; // staked eth
                        if (coin.symbol.includes('btc') && coin.symbol.length > 3) return false; // wrapped btc
                        if (coin.symbol.startsWith('c')) return false; // compound token
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
                            {listOrNot(coin.symbol)}
                        </td>
                    </tr>)
                })}
        </>
    )
}