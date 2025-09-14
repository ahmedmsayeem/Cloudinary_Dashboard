import Image from "next/image";
import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import { toast } from "sonner";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";

import { type CloudinaryResource } from "./folderIcon";

export default function Images({
  image,
  fetchImagesByPathOfFolder,
}: {
  image: CloudinaryResource;
  fetchImagesByPathOfFolder: (path: string) => void;
}) {
  const [options, setOptions] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      const cloudName = localStorage.getItem('cloudName');
      const apiKey = localStorage.getItem('apiKey');
      const apiSecret = localStorage.getItem('apiSecret');
      const response = await fetch("/api/cloudinary/deleteWithPublicId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_id: image.public_id, cloudName, apiKey, apiSecret }),
      });

      if (response.ok) {
        toast.success("Deleted successfully");
        // Force folder and image list refresh by toggling rootPath
        if (typeof window !== "undefined") {
          const event = new CustomEvent("cloudinaryRefresh");
          window.dispatchEvent(event);
        }
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      toast.error("Couldn't delete");
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
    <div className="flex h-full w-full object-cover ">
      <Image
        // Add the thumbnail transformation to the secure_url
        src={`${image.secure_url.replace("/image/upload/", "/image/upload/c_thumb,w_200,g_face/")}`}
        alt={image.public_id}
        width={200} // Match the width with the thumbnail transformation
        height={image.height ? Math.floor((200 / image.width) * image.height) : 200} // Adjust height proportionally
        className="h-full w-full object-cover"
      />
      <div className="relative right-10 top-2 h-fit  w-fit rounded-sm bg-slate-800 p-1">
        <SlOptionsVertical
          onClick={() => setOptions(true)}
          className=" text-2xl hover:text-slate-400"
        />
      </div>

      <Dialog open={options}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>asset_id: {image.asset_id} </DialogTitle>
            <br />
            <DialogDescription>
              <div>Public_Id: {image.public_id}</div>
              <br />
              <div className="flex items-center">
                secure_url: &nbsp;{" "}
                <FaCopy
                  onClick={() => handleCopy(image.secure_url)}
                  className="text-2xl hover:text-slate-300"
                ></FaCopy>
              </div>
              <br />
              <div>Folder: {image.folder ?? "Root"}</div>

              <br />
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={() => setOptions(false)}>Cancel</Button>
            </DialogClose>
            <Button
              className="bg-red-500"
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this item?")
                ) {
                  void handleDelete();
                  fetchImagesByPathOfFolder(image.folder);
                } else {
                  // Deletion canceled
                }
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
