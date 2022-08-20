import type { NextApiRequest, NextApiResponse } from 'next'
import { getMementoMetadata } from '@projectelemento/memento-metadata-builder'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { tokenId } = req.query

    let id: string = typeof tokenId === 'string' ? tokenId : ''

    if (Number(id) < 1 || Number.isNaN(Number(id))) {
        res.status(404).json('Non-existing token')
    } else {
        const metadata = getMementoMetadata(id)
        if (!metadata) {
            res.status(404).json('Non-existing token')
        }
        res.status(200).json(metadata)
    }
}