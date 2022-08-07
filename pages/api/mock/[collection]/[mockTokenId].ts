import type { NextApiRequest, NextApiResponse } from 'next'
import absoluteUrl from 'next-absolute-url'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const origin = 'https://mock.fiverlabs.xyz'
    const { collection, mockTokenId } = req.query
    let id: string = typeof mockTokenId === 'string' ? mockTokenId : ''

    const mockMetadata = {
        edition: mockTokenId,
        name: `Mock ${collection} #${mockTokenId}`,
        description: `Mock NFT metadata by k1merran.nft | Project Elemento`,
        image: `${origin}/api/mock/image/${collection}/${mockTokenId}`
    }

    res.status(200).json(mockMetadata)
}