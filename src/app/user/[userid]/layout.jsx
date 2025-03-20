import { getData } from "@/services/services";

export async function generateMetadata({ params }) {
    try {
        const userData = await getData(`users/${params.userid}`);
        if (userData) {
            return { title: "JobNext | " + userData.displayName };
        }
        return {};
    } catch (error) {
        console.error("Error fetching user data:", error);
        return {};
    }
}

export default function RootLayout({ children }) {
    return <>{children}</>;
}
