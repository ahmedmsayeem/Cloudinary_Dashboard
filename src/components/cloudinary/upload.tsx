/* eslint-disable @typescript-eslint/no-unused-expressions */
import { type UploadApiResponse } from "cloudinary";
import Image from "next/image";
import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface UploadFormProps {
  folderPath: string;
  fetchImagesByPathOfFolder: (path: string) => void;
}

export default function UploadForm({
  folderPath,
  fetchImagesByPathOfFolder,
}: UploadFormProps) {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    for (const [, value] of formData.entries()) {
      if (typeof value === "string") continue; // Skip non-file fields
      if (value instanceof File) {
        const previewUrl: string = URL.createObjectURL(value); // Safely typed as string
        setPreview(previewUrl);
        console.log(preview);
      }
    }
    
  };
  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    preview ? URL.revokeObjectURL(preview) : ""; // free up memory
    setPreview(null);

    // Append folderPath as a query parameter
    const queryString = new URLSearchParams({ folder: folderPath }).toString();
    const cloudName = localStorage.getItem('cloudName');
    const apiKey = localStorage.getItem('apiKey');
    const apiSecret = localStorage.getItem('apiSecret');

  formData.append('cloudName', cloudName || '');
  formData.append('apiKey', apiKey || '');
  formData.append('apiSecret', apiSecret || '');

    try {
      const response = await fetch(`/api/cloudinary/upload?${queryString}`, {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as UploadApiResponse;
      if (response.ok) {
        toast.success("uploaded succesfully");
        setImageUrl(data.url); // Set the URL to state for displaying
      } else {
        toast.error(`Upload failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload error");
    }
  };

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy!");
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <MdCloudUpload
            className="text-3xl hover:text-slate-700"
            title="Upload Image"
          />
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Image Here</DialogTitle>
          </DialogHeader>

          <div className="content">
            <form
              onChange={(e) => handleChange(e)}
              onSubmit={(e) => {
                void handleUpload(e);
                fetchImagesByPathOfFolder(folderPath);
              }}
            >
              <input type="file" name="file" accept="image/*" required />
              {preview && (
                <div className="m-auto mt-6">
                  <h2>Preview Image:</h2>
                  <Image
                    src={preview}
                    className="m-auto"
                    alt="Uploaded"
                    width={500}
                    height={500}
                    style={{ maxWidth: "400px" }}
                  />
                </div>
              )}
              {imageUrl && (
                <div className="m-auto mt-6">
                  <h2>Uploaded Image:</h2>
                  <Image
                    src={imageUrl}
                    className="m-auto"
                    alt="Uploaded"
                    width={500}
                    height={500}
                    style={{ maxWidth: "400px" }}
                  />
                  <p className="mt-6 flex items-center">
                    {" "}
                    URL: &nbsp; &nbsp;
                    <FaCopy
                      onClick={() => handleCopy(imageUrl)}
                      className="text-2xl hover:text-slate-300"
                    ></FaCopy>
                  </p>
                </div>
              )}

              <DialogFooter className="mt-12">
                <DialogClose asChild>
                  <Button
                    onClick={() => {
                      setImageUrl("");
                      preview ? URL.revokeObjectURL(preview) : ""; // free up memory
                      setPreview(null);
                    }}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Upload</Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}