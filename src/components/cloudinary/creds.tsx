import React from "react";

export default function Creds() {
    return (
        <div className="p-4 bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-blue-400 mb-2">Cloudinary Credentials</h2>
            <p className="text-gray-400 mb-2">Please ensure your credentials are set in local storage:</p>
            <ul className="list-disc list-inside text-gray-300">
                <li>Cloud Name</li>
                <li>API Key</li>
                <li>API Secret</li>
            </ul>
        </div>
    );
}
