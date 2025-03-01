import BlogItem from "@/components/pageComponents/BlogItem";
const BlogPage = () => {
    return (
        <div className="w-full min-[490px]:pt-[72px] pt-16 px-5  min-h-screen ">
            <div className="flex min-[820px]:flex-row flex-col mt-10 overflow-visible gap-4">
                <div className="w-full min-[820px]:w-1/3 h-fit  bg-background min-[820px]:sticky top-[112px] z-10">
                    <p className="text-2xl font-bold ">Viết Blog</p>
                    <div className="w-full border rounded-md h-24 min-[820px]:h-64 mt-2 p-3">hhhh</div>
                </div>
                <div className="w-full min-[820px]:w-2/3 min-[820px]:border-l min-h-screen min-[820px]:pl-4">
                    <h1 className="text-2xl w-full  font-bold">Viết để nhớ - Đọc để khám phá</h1>
                    <div className="w-full mt-1 text-gray-500">Các bài viết chia sẻ về kinh nghiệm và kiến thức</div>
                    <div className="w-full mt-4">
                        <BlogItem />
                        <BlogItem />
                        <BlogItem />
                        <BlogItem />
                        <BlogItem />
                        <BlogItem />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
