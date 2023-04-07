const sharp = require("sharp")
const Upscaler = require("upscaler")

const score = 75;

const detector = async (img)=>{
    const image = sharp(img).resize(100, null);
    const imageBuffer = await image.toBuffer();
}

const upscalerFunction = async (img) =>{
    const upscaler = new Upscaler();
    let image = upscaler.upscale(img)
    return image
}

module.exports = {detector, upscalerFunction}