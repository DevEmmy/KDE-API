const sharp = require("sharp")
const Jimp = require("jimp");

const score = 95;

const detector = async (img)=>{
    const image = sharp(img).resize(100, null);
    const imageBuffer = await image.toBuffer();
}

const upscalerFunction = async (img) =>{
    let image = await Jimp.read(img)
    image.quality(score)
    return image
}

module.exports = {detector, upscalerFunction}