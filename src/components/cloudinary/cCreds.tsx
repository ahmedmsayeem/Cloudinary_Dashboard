import React, { useState } from "react";

export default function Creds(){
    const [cloudName, setCloudName] = useState<string>(localStorage.getItem('cloudName') || "");
    const [apiKey, setApiKey] = useState<string>(localStorage.getItem('apiKey') || "");
    const [apiSecret, setApiSecret] = useState<string>(localStorage.getItem('apiSecret') || "");
    const [isMinimized, setIsMinimized] = useState<boolean>(false);

    const handleSave = async () => {
        try {
            localStorage.setItem('cloudName', cloudName);
            localStorage.setItem('apiKey', apiKey);
            localStorage.setItem('apiSecret', apiSecret);
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
        <div className="w-full mt-16 md:w-2/5 mx-auto">
            <button 
                className="mb-4 p-2 bg-blue-500 text-white rounded-lg w-full"
                onClick={() => setIsMinimized(!isMinimized)}
            >
                {isMinimized ? "Expand" : "Collapse"}
            </button>
            {!isMinimized && (
                <div>
                    <div className="flex flex-col">
                        <label className="text-gray-500">Cloud Name</label>
                        <input
                            type="text"
                            className="border border-gray-300 p-2 rounded-lg w-full text-black"
                            value={cloudName}
                            onChange={(e) => setCloudName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col mt-4">
                        <label className="text-gray-500">API Key</label>
                        <input
                            type="text"
                            className="border border-gray-300 p-2 rounded-lg w-full text-black"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col mt-4">
                        <label className="text-gray-500">API Secret</label>
                        <input
                            type="text"
                            className="border border-gray-300 p-2 rounded-lg w-full text-black"
                            value={apiSecret}
                            onChange={(e) => setApiSecret(e.target.value)}
                        />
                    </div>
                    <button 
                        onClick={handleSave} 
                        className="mt-4 p-2 bg-blue-500 text-white rounded-lg w-full"
                    >
                        Save Keys 
                    </button>
                </div>
            )}
        </div>
    );
}
