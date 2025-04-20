import BlogDetail from "@/components/pages/BlogDetail";
import { GET_METHOD } from "@/services/services";

const BlogPage = async ({ params }) => {
    let data = null;
    const blogData = await GET_METHOD("blogs/" + params.blogid);
    if (blogData) {
        const authorData = await GET_METHOD("users/" + blogData.authorUid);
        if (authorData?.success) data = { blogData, authorData: authorData.userRecord };
    }

    return (
        <div className="mt-32  w-full">
            <BlogDetail data={data} />
        </div>
    );
};

export default BlogPage;
