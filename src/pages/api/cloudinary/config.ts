import { NextApiRequest, NextApiResponse } from 'next';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { cloudName, apiKey, apiSecret } = req.body;

        // Update environment variables
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = cloudName;
        process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY = apiKey;
        process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET = apiSecret;

        // Persist the changes to the .env file
        const envPath = path.resolve(process.cwd(), '.env');
        const envConfig = `
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=${cloudName}
NEXT_PUBLIC_CLOUDINARY_API_KEY=${apiKey}
NEXT_PUBLIC_CLOUDINARY_API_SECRET=${apiSecret}
        `;
        fs.writeFileSync(envPath, envConfig);

        res.status(200).json({ message: 'Cloudinary configuration set successfully' });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
