import type { NextApiRequest, NextApiResponse } from "next";

import { cloudinary } from "./constant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { path } = req.body as { path: string };

  try {
    const { folders } = (await cloudinary.api.sub_folders(path)) as {
      folders: { name: string; path: "string"; external_id: "string" };
    };
    console.log(folders);
    res.status(200).json({ folders });
  } catch (error) {
    console.error("Error fetching folders:", error);
    res.status(500).json({ error: "Failed to fetch folders" });
  }
}
