// import BlogDetail from "@/components/pages/BlogDetail";
import { GET_METHOD } from "@/services/services";
import InterviewPage from "@/components/pages/InterviewPage";

const BlogPage = async ({ params }) => {
    // let data = null;
    // const blogData = await GET_METHOD("blogs/" + params.blogid);
    // if (blogData) {
    //     const authorData = await GET_METHOD("users/" + blogData.authorUid);
    //     data = { blogData, authorData };
    // }

    return (
        <div className=" w-full flex justify-center">
            <InterviewPage /> {/* <BlogDetail data={data} /> */}
        </div>
    );
};

export default BlogPage;
