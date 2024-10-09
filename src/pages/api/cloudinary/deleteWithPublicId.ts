import type { NextApiRequest, NextApiResponse } from "next";

import { cloudinary } from "./constant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { public_id } = req.body as { public_id: string };

    console.log("public_id:", public_id);

    if (!public_id) {
      return res
        .status(400)
        .json({ error: "Invalid Cloudinary P_id provided" });
    }

    // Destroy the image on Cloudinary
    const result = (await cloudinary.uploader.destroy(public_id)) as {
      result: string;
    };

    // Check for deletion success
    if (result?.result !== "ok") {
      console.error("Cloudinary deletion error:", result);
      return res.status(500).json({ error: "Failed to delete image", result });
    }

    // Respond with success message
    res.status(200).json({ message: "Image deleted successfully", result });
  } catch (error) {
    console.error("Error in handler:", error);
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
}
