import { usePerpsV2MarketDataAllProxiedMarketSummaries } from "../generated";
export default function Header() {
    const { data, isLoading } = usePerpsV2MarketDataAllProxiedMarketSummaries();
    return (
        <>
        <h1>
            How Many Assets On Synthetix Perps? {isLoading ? 'Loading' : data && data.length}
        </h1>
        <h2>
            What's next?
        </h2>
        </>
    )
}