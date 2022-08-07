import type { NextApiRequest, NextApiResponse } from 'next'

import { createCanvas } from 'canvas'

var stringToColour = function(str: string) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { collection, mockTokenId } = req.query
    let collectionParam: string = typeof collection === 'string' ? collection : ''
    let tokenIdParam: string = typeof mockTokenId === 'string' ? mockTokenId : ''

    const canvas = createCanvas(500, 500)
    const ctx = canvas.getContext('2d')

    const color = stringToColour(`${tokenIdParam}-${collection}`)
    ctx.fillStyle = color
    ctx.fillRect(0,0,canvas.width,canvas.height)
    const textcolor = stringToColour(`${collection}-${tokenIdParam}`)
    ctx.fillStyle = textcolor

    ctx.font = '42px Arial'
    ctx.fillText(`token#${tokenIdParam}`, 22, 250)
    ctx.font = '88px Courier New'
    ctx.fillText(collectionParam, 22, 316)
    ctx.font = '18px Arial'
    ctx.fillText('created by k1merran.nft | Project Elemento', 22, 420)

    const buffer = canvas.toBuffer()

    res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": buffer.length,
    });
    
    res.end(buffer);
}