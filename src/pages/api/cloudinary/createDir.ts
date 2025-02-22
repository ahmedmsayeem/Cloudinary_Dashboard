import { SignApiOptions } from "cloudinary";
import type { NextApiRequest, NextApiResponse } from "next";
import { cloudinary } from "./constant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { rootPath } = req.body as { rootPath: string };

  try {
    const {  cloudName, apiKey, apiSecret } = req.body as SignApiOptions & { cloudName: string, apiKey: string, apiSecret: string };
    
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
  });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const folders = await cloudinary.api.create_folder(rootPath);
    res.status(200).json(
      folders as {
        folders: { name: string; path: string; external_id: string };
      },
    );
  } catch (error) {
    res.status(500).json({ error: JSON.stringify(error) });
  }
}
