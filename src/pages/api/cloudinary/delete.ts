import type { NextApiRequest, NextApiResponse } from "next";

import { cloudinary } from "./constant";
import { SignApiOptions } from "cloudinary";

// Regular expression pattern to match Cloudinary public_id from URL
const regex = /\/v\d+\/(.*?)(?=\.)/;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const {  cloudName, apiKey, apiSecret } = req.body as SignApiOptions & { cloudName: string, apiKey: string, apiSecret: string };
    const { url } = req.body as { url: string };
    
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
  });
    // Function to extract public_id from Cloudinary URL
    const getPublicIdFromUrl = (url: string) => {
      const match = url.match(regex);
      return match ? match[1] : null;
    };

    // Get public_id from URL
    const public_id = getPublicIdFromUrl(url);
    console.log("public_id:", public_id);

    if (!public_id) {
      return res.status(400).json({ error: "Invalid Cloudinary URL provided" });
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
