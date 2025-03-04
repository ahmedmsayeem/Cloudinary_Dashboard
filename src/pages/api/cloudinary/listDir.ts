import type { NextApiRequest, NextApiResponse } from "next";

import { cloudinary } from "./constant";
import { SignApiOptions } from "cloudinary";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {  cloudName, apiKey, apiSecret } = req.body as SignApiOptions & { cloudName: string, apiKey: string, apiSecret: string };
  console.log("----------------------------------");
  console.log(cloudName, apiKey, apiSecret);
  console.log("----------------------------------");
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
});
  const { folders } = (await cloudinary.api.root_folders()) as {
    folders: { name: string; path: "string"; external_id: "string" };
  };
  console.log(folders);
  res.status(200).json({ folders });
}
