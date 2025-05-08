// import InterviewPage from "@/components/pages/InterviewPage";
import InterviewSetup from "@/components/pages/InterviewSetup";

const BlogPage = async ({ params }) => {
    return (
        <div className=" w-full flex justify-center">
            <InterviewSetup /> {/* <BlogDetail data={data} /> */}
        </div>
    );
};

export default BlogPage;
