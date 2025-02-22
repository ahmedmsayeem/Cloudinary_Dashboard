import { type SignApiOptions } from "cloudinary";
import type { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { paramsToSign, cloudName, apiKey, apiSecret } = req.body as SignApiOptions & { cloudName: string, apiKey: string, apiSecret: string };

    cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
    });

    const signature = cloudinary.utils.api_sign_request(
        paramsToSign as SignApiOptions,
        apiSecret,
    );

    res.status(200).json({ signature });
}
