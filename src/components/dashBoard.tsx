import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import FolderIcon, {
  type CloudinaryResource,
  type CloudinaryResponse,
  createPathArray,
} from "./folderIcon";
import Images from "./images";
import Options from "./options";

export default function Dashboard() {
  const [folders, setFolders] = useState<
    { name: string; path: string; external_id: string }[]
  >([]);
  const [rootPath, setRootPath] = useState<string>("/");
  const [pathArray, setPathArray] = useState<string[]>([]);
  const [images, setImages] = useState<CloudinaryResource[]>([]);
  const [imageLoadPermisiion, setIMageLoadPermision] = useState<boolean>(true);
  const router = useRouter();

  const handleRefresh = () => {
    void router.push("/");
  };

  useEffect(() => {
    const endpoint =
      rootPath === "/" ? "/api/cloudinary/listDir" : "/api/cloudinary/findDir";
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path: rootPath }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data);
        const typedData = (data = data as {
          folders: { name: string; path: string; external_id: string }[];
        });
        setFolders(typedData.folders);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    imageLoadPermisiion ? void fetchImagesByPathOfFolder("/") : "";
    setIMageLoadPermision(false);
  }, [rootPath, imageLoadPermisiion]);

  const fetchImagesByPathOfFolder = async (path: string) => {
    try {
      const response = await fetch("/api/cloudinary/getImages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ path }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = (await response.json()) as CloudinaryResponse;

      // Check if resources are present and set the images state
      if (data.resources && data.resources.length > 0) {
        setImages(data.resources);
      } else {
        // If no resources are found, set images to an empty array
        setImages([]);
      }
    } catch (error) {
      // Handle errors
      console.error("There was a problem with the fetch operation:", error);
      // Set images to an empty array in case of error
      setImages([]);
    }
  };

  return (
    <div className="relative z-50 sm:top-[0px] md:top-[-80px]">
      
      <Options
        rootPath={rootPath}
        handleRefresh={handleRefresh}
        setRootPath={setRootPath}
        fetchImagesByPathOfFolder={fetchImagesByPathOfFolder}
      />


      <div className="mx-4 my-6 ">
        <p
          className={`inline cursor-pointer text-blue-600 hover:underline `}
          onClick={() => {
            setRootPath("/");
            setPathArray([""]);
            setImages([]);
            void fetchImagesByPathOfFolder("/");
          }}
        >
          <b>Home</b> &nbsp;
        </p>
        {pathArray?.map((each, index) => (
          <div key={each} className="inline-flex items-center">
            <p
              className={`inline cursor-pointer text-blue-600 hover:underline ${
                index === pathArray.length - 1 ? "font-bold" : ""
              }`}
              onClick={() => {
                setRootPath((prev) => {
                  const match = prev.match(new RegExp(`^(.*${each})`));
                  const newPath = match ? match[0] : prev;
                  setPathArray(createPathArray(newPath));
                  return newPath;
                });
              }}
            >
              / {each}
            </p>

            {index < pathArray.length - 1 && (
              <span className="mx-2 text-gray-500">&nbsp;</span>
            )}
          </div>
        ))}
      </div>

      <div>
        {folders?.map((each, index) => (
          <div key={index}>
            <FolderIcon
              setRootPath={setRootPath}
              setPathArray={setPathArray}
              fetchImagesByPathOfFolder={fetchImagesByPathOfFolder}
              name={each.name}
              path={each.path}
            />
          </div>
        ))}

        <ul className="grid grid-cols-3 gap-4 p-3 md:grid-cols-4 lg:grid-cols-5">
          {images?.map((image) => (
            <li key={image.public_id} className="overflow-hidden">
              <Images
                image={image}
                fetchImagesByPathOfFolder={fetchImagesByPathOfFolder}
              ></Images>
            </li>
          ))}
        </ul>

        {images.length == 0 && (
          <div className="m-auto mt-28 text-center">No images here</div>
        )}
      </div>
    </div>
  );
}
