import type { NextApiRequest, NextApiResponse } from "next";

import { cloudinary } from "./constant";
import { SignApiOptions } from "cloudinary";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { path } = req.body as { path: string };

  try {
    const {  cloudName, apiKey, apiSecret } = req.body as SignApiOptions & { cloudName: string, apiKey: string, apiSecret: string };
    
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
  });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const folders = await cloudinary.api.delete_folder(path); // Correct usage
    res.status(200).json(
      folders as {
        folders: { name: string; path: string; external_id: string };
      },
    );
  } catch (error) {
    console.error("Error deleting folder:", error); // Added logging for debugging
    res.status(500).json({ error: JSON.stringify(error) });
  }
}
