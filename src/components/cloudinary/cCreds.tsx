import React, { useState } from "react";


export default function Creds(){
    const [cloudName, setCloudName] = useState<string>("");
    const [apiKey, setApiKey] = useState<string>("");
    const [apiSecret, setApiSecret] = useState<string>("");
    const handleSave = async () => {
        try {
            await fetch('/api/cloudinary/config', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cloudName, apiKey, apiSecret }),
            });
        } catch (error) {
            console.error('Failed to save Cloudinary configuration', error);
        }
    };
  return (
  <div>
    <div className="flex flex-col">
      <label className="text-gray-500">Cloud Name</label>
      <input
        type="text"
        className="border border-gray-300 p-2 rounded-lg"
        value={cloudName}
        onChange={(e) => setCloudName(e.target.value)}
      />
    </div>
    <div className="flex flex-col mt-4">
      <label className="text-gray-500">API Key</label>
      <input
        type="text"
        className="border border-gray-300 p-2 rounded-lg"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
    </div>
    <div className="flex flex-col mt-4">
      <label className="text-gray-500">API Secret</label>
      <input
        type="text"
        className="border border-gray-300 p-2 rounded-lg"
        value={apiSecret}
        onChange={(e) => setApiSecret(e.target.value)}
      />
    </div>
    <button onClick={handleSave}>save keys locally</button>
  </div>
  );
}
