import jwt from "jsonwebtoken";
import settings from "../constants/settings";

class JWT {
  private async decodeSecret(encodedSecret: string): Promise<string> {
    const secret = await Buffer.from(encodedSecret, "base64").toString("ascii");

    return secret;
  }

  constructor() {}

  async signAccessToken(userId: string): Promise<string> {
    const token = await jwt.sign(
      { id: userId },
      await this.decodeSecret(settings.accessTokenSecret as string),
      { expiresIn: "1d" }
    );

    return token;
  }
}

const JWTHelper = new JWT();

export default JWTHelper;
