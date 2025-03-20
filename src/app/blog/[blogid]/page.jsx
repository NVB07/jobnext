import BlogDetail from "@/components/pages/BlogDetail";
import { getData } from "@/services/services";

const BlogPage = async ({ params }) => {
    let data = null;
    const blogData = await getData("blogs/" + params.blogid);
    if (blogData) {
        const authorData = await getData("users/" + blogData.authorUid);
        data = { blogData, authorData };
    }

    return (
        <div className="mt-32 min-h-screen w-full">
            <BlogDetail data={data} />
        </div>
    );
};

export default BlogPage;
