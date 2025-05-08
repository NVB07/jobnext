import InterviewPage from "@/components/pages/InterviewPage";

const BlogPage = async ({ params }) => {
    return (
        <div className=" w-full flex justify-center">
            <InterviewPage /> {/* <BlogDetail data={data} /> */}
        </div>
    );
};

export default BlogPage;
