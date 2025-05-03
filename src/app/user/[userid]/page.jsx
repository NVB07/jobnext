import UserProfile from "@/components/pages/UserPage";
const UserPageHome = ({ params }) => {
    return (
        <div className="mt-">
            <UserProfile uid={params.userid} />
        </div>
    );
};

export default UserPageHome;
