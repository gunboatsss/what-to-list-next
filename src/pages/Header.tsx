import { usePerpsV2MarketDataAllProxiedMarketSummaries } from "../generated";
export default function Header() {
    const { data, isLoading } = usePerpsV2MarketDataAllProxiedMarketSummaries();
    return (
        <>
        <h1>
            How Many Assets On Synthetix Perps? {isLoading ? `Loading` : data && data.length}
        </h1>
        <h2>
            What&apos;s next?
        </h2>
        <h2>
            Trade on those ASSETS on KWENTA <a href="https://kwenta.eth.limo/?ref=gunboats">CLICK HERE FOR 5% BONUS</a>
        </h2>
        </>
    )
}