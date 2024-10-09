import type { NextApiRequest, NextApiResponse } from "next";

import { cloudinary } from "./constant";

// Define the shape of the response from Cloudinary
interface CloudinaryResource {
  public_id: string;
  format: string;
  resource_type: string;
  // Add other fields you need from the Cloudinary resource
}

interface CloudinaryResponse {
  resources: CloudinaryResource[];
}

interface ErrorResponse {
  error: string;
}

// Define the API handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CloudinaryResponse | ErrorResponse>,
) {
  // Ensure folderPath is a string
  const { path } = req.body as { path: string };

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: path !== "/" ? path : "", // Specify the folder path here
      resource_type: "image", // Only fetch images
    });

    // Send the images in the response
    const { resources } = result as CloudinaryResponse;

    res.status(200).json({ resources: resources });
  } catch (error) {
    // Send error response
    res.status(500).json({ error: (error as Error).message });
  }
}
