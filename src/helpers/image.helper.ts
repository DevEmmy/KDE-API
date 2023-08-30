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
  public async compressImage(imagePath: string) {
    const metadata = this.getImageMetadata(imagePath);

    await sharp(imagePath)
      .resize(800)
      .toFormat("jpeg", { mozjpeg: true })
      .toFile(imagePath);
  }
}

const imageService = new ImageService();

export default imageService;
