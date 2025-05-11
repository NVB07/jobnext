import UserProfile from "@/components/pages/UserPage";
import { cookies } from "next/headers";
import AnotherUserPage from "@/components/pages/AnotherUserPage";
const UserPageHome = async ({ params }) => {
    const cookieStore = await cookies();
    const uid = cookieStore.get("uid");

    if (uid?.value !== params.userid) {
        return <AnotherUserPage uid={params.userid} />;
    }

    return (
        <div className="w-full">
            <UserProfile uid={params.userid} />
        </div>
    );
};

export default UserPageHome;
