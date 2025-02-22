import { v2 as cloudinary } from "cloudinary";

let cloudName: string;
let apiKey: string;
let apiSecret: string;

export function configureCloudinary(name: string, key: string, secret: string) {
    cloudName = name;
    apiKey = key;
    apiSecret = secret;
    cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
    });
}

export { cloudinary, cloudName, apiKey, apiSecret };
