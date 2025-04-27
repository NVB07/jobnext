import { GET_METHOD } from "@/services/services";

export async function generateMetadata({ params }) {
    try {
        const userData = await GET_METHOD(`users/${params.userid}`);
        if (userData?.success) {
            return { title: "JobNext | " + userData.userRecord.displayName };
        }
        return { title: "JobNext | " + "User" };
    } catch (error) {
        console.error("Error fetching user data:", error);
        return { title: "JobNext | " + "User" };
    }
}

export default function RootLayout({ children, params }) {
    console.log(params);

    return <>{children}</>;
}
