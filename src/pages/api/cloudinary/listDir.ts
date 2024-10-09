import type { NextApiRequest, NextApiResponse } from "next";

import { cloudinary } from "./constant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { folders } = (await cloudinary.api.root_folders()) as {
    folders: { name: string; path: "string"; external_id: "string" };
  };
  console.log(folders);
  res.status(200).json({ folders });
}
