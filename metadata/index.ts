const config = {
    imageBaseUrl: 'ipfs://IPFS_BASE_URL/',
    imageExtension: '.png'
}

export default function (tokenId: string) {
    const base = require(`./0.json`)
    const over = require(`./${tokenId}.json`)
    const m = { ...over, ...base }
    
    // m.name = `Elemento xxx ${tokenId}`
    // m.image = `${config.imageBaseUrl}${tokenId}${config.imageExtension}`

    m.attributes =
    (over.attributes)
    ? [ ...base.attributes, ...over?.attributes ]
    : [ ...base.attributes]

    return m;
}