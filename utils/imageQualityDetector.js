const sharp = require("sharp")
const quality = require('quality');

const score = 75;

const detector = async (img)=>{
    const image = sharp(img).resize(100, null);
    const imageBuffer = await image.toBuffer();
    const qualityScore = quality(imageBuffer);
    console.log(`Image quality score: ${qualityScore}`);
}

module.exports = detector