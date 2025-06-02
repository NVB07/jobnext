import BlogDetail from "@/components/pages/BlogDetail";
import { GET_METHOD } from "@/services/services";

const BlogPage = async ({ params }) => {
    let data = null;
    const blogData = await GET_METHOD("blogs/" + params.blogid);
    data = blogData;

    return (
        <div className="mt-24  w-full">
            <BlogDetail data={data} />
        </div>
    );
};

export default BlogPage;
