import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white relative">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-2 text-blue-400">Welcome to the Dashboard</h1>
                <p className="text-gray-400 text-lg">Manage your project media with your team efficiently</p>
            </div>
            <div className="flex space-x-8">
                <button
                    onClick={() => router.push("/cloudinary")}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg shadow-sm hover:bg-gray-700"
                >
                    Cloudinary
                </button>
                <button
                    onClick={() => router.push("/uploadthing")}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg shadow-sm hover:bg-gray-700"
                >
                    Uploadthing
                </button>
            </div>
            <div className="absolute bottom-4 right-4">
                <p className="text-red-400">Note: Your API keys are not saved anywhere outside your using instance</p>
            </div>
        </div>
    );
}
