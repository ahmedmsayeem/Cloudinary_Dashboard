import dynamic from "next/dynamic";

const Dashboard = dynamic(() => import("@/components/cloudinary/dashBoard"), { ssr: false });

export default function CloudinaryPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <Dashboard />
        </div>
    );
}
