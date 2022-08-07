import type { NextApiRequest, NextApiResponse } from 'next'
import getTokenMetadata from '@metadata/index'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { tokenId } = req.query

    let id: string = typeof tokenId === 'string' ? tokenId : ''

    if (Number(id) < 1 || Number(id) > 10 || Number.isNaN(Number(id))) {
        res.status(404).json('Non-existing token')
    } else {
        const metadata = getTokenMetadata(id)

        res.status(200).json(metadata)
    }
}