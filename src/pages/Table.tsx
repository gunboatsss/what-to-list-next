import { useEffect, useState } from "react"
import Image from "next/image";
import { ethers } from 'ethers'
import { usePerpsV2MarketDataAllProxiedMarketSummaries } from "../generated";

type Coin = {
    id: string,
    symbol: string,
    name: string,
    image: string,
    market_cap: number,
    total_volume: number
}
export default function Table() {
    const [Data, setData] = useState<Array<Coin>>();
    const { data: listed, isLoading } = usePerpsV2MarketDataAllProxiedMarketSummaries({
        select: (data) =>
            data.map(
                (market) =>
                    ethers.utils.toUtf8String(market.asset).replace(/\0|s/g, '').toLowerCase()
            )
    });
    const stablecoin = ['susd']; // usdt is one of the market now
    let forex = new Map<string, string>();
    function genForex(assets: Array<string>, type: string) {
        assets.forEach((asset) => forex.set(asset, type));
    };
    genForex(['xaut', 'paxg'], 'xau');
    genForex(['eurs', 'euroc', 'ageur', 'eurt'], 'eur')
    genForex(['ethdydx'], 'dydx') // fuck you stop renaming symbol
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
    function sortByMarketCap() {
        const sorted = [...Data ?? []].sort((a,b) => b.market_cap - a.market_cap);
        setData(sorted);
    }
    function sortByVolume() {
        const sorted = [...Data ?? []].sort((a,b) => b.total_volume - a.total_volume);
        setData(sorted);
    }
    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Symbol</th>
                    <th>Asset</th>
                    <th onClick={() => sortByMarketCap()}>Market Cap</th>
                    <th onClick={() => sortByVolume()}>Volume</th>
                    <th>Listed On Synthetix Perps</th>
                </tr>
            </thead>
            <tbody>
                {Data && Data.filter(
                    (coin) => {
                        if (stablecoin.includes(coin.symbol)) return false; //stablecoin
                        if (coin.symbol.includes('btc') && coin.symbol.length > 3) return false; // wrapped btc
                        return true;
                    }
                ).map((coin) => <Column key={coin.id} coin={coin} listStatus={listOrNot(coin.symbol)} />)}
            </tbody>
        </table>
    )
}

function Column({ coin, listStatus }: { coin: Coin, listStatus: '⛔' | '✅*' | '✅' | '❌' }) {
    return (<>
        <tr>
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
                {listStatus}
            </td>
        </tr></>);
}
