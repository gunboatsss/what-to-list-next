import type { NextApiRequest, NextApiResponse } from "next";
import { sample }from './temp';
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&locale=en'
    ).then(
        data => data.json()
    ).then(
        data => res.send(data)
    )
}