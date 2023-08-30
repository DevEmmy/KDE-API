/**
 * To compress images and avoid slow servers during upload
 */

import sharp from "sharp";

class ImageService {
  private readonly getImageMetadata = (imagePath: string): sharp.Metadata => {
    let data: sharp.Metadata | undefined;

    sharp(imagePath).metadata((error, metadata) => {
      data = metadata;
    });

    return data as sharp.Metadata;
  };

  constructor() {}

  // convert the images to jpeg
  public async compressImage(imagePath: string): Promise<string> {
    const metadata = this.getImageMetadata(imagePath);

    await sharp(imagePath)
      .resize(800)
      .toFormat("jpeg", { mozjpeg: true })
      .toFile(imagePath + "1");

    return imagePath + "1";
  }
}

const imageService = new ImageService();

export default imageService;
