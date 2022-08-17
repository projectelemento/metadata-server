import type { NextApiRequest, NextApiResponse } from 'next'
import absoluteUrl from 'next-absolute-url'

const normalTrait = (type: string, value: string) => {
    return {
        trait_type: type,
        value,
    };
}

const numericTrait = (type: string, value: number, max: number) => {
    return {
        display_type: 'number',
        trait_type: type,
        value,
        max_value: max,
    }
}

const dateTrait = (type: string, value: number) => {
    return {
        display_type: 'date',
        trait_type: type,
        value,
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const origin = 'https://mock.fiverlabs.xyz'
    const { collection, mockTokenId } = req.query
    let id: string = typeof mockTokenId === 'string' ? mockTokenId : ''

    // for frozen 
    // event PermanentURI(string _value, uint256 indexed _id);
    const mockMetadata = {
        edition: mockTokenId,
        name: `Mock ${collection} #${mockTokenId}`,
        description: `Mock NFT metadata by k1merran.nft | Project Elemento`,
        image: `${origin}/api/mock/image/${collection}/${mockTokenId}`,
        external_url: 'https://twitter.com/Fiver_Labs',
        attributes: [
            normalTrait('Fiver Labs', 'Mock NFT'),
            normalTrait('Genesis Project', 'Project Elemento'),
            numericTrait('Level', 10, 100),
            dateTrait('Date of Birth', -231965207),
        ],
    }

    res.status(200).json(mockMetadata)
}