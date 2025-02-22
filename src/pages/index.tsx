import Dashboard from "@/components/cloudinary/dashBoard";
import { useState } from "react";

export default function Home() {
    const [selected, setSelected] = useState(false);
    const [showCloudinary, setShowCloudinary] = useState(false);
    const [showUploadthing, setShowUploadthing] = useState(false);

    function showCloudinaryFunction() {
        setSelected(true);
        // unselect the other checkbox
        const selectedElement = document.getElementById("uploadthing") as HTMLInputElement | null;
        if (selectedElement) {
            selectedElement.checked = false;
        }
        setShowCloudinary(true);
        setShowUploadthing(false);
    }

    function showUploadthingFunction() {
        setSelected(true);
        // unselect the other checkbox
        const selectedElement = document.getElementById("cloudinary") as HTMLInputElement | null;
        if (selectedElement) {
            selectedElement.checked = false;
        }
        setShowUploadthing(true);
        setShowCloudinary(false);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white relative">
            <div className="text-center mb-8">
                {(!selected || !showCloudinary) && 
                <div>
                    <h1 className="text-4xl font-bold mb-2 text-blue-400">Welcome to the Dashboard</h1>
                    <p className="text-gray-400 text-lg">Manage your project media with your team efficiently</p>
                </div>}
            </div>
            <div className="flex space-x-8">
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" name="selected" id="uploadthing" value="selected" onClick={showUploadthingFunction} className="hidden" />
                    <span className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg shadow-sm hover:bg-gray-700">Uploadthing</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" name="selected" id="cloudinary" value="selected" onClick={showCloudinaryFunction} className="hidden" />
                    <span className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg shadow-sm hover:bg-gray-700">Cloudinary</span>
                </label>
            </div>
            {selected && showCloudinary && <div className="mt-8"><Dashboard /></div>}
            {selected && showUploadthing && <div className="mt-8 text-green-400 text-2xl text-center">Coming soon...</div>}

            <div className="absolute bottom-4 right-4">
                <p className="text-red-400">Note: Your API keys are not saved anywhere outside your using instance</p>
            </div>
        </div>
    );
}
