import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
const BlogItem = ({ author, title, content, createTime }) => {
    return (
        <div className="w-full border rounded-xl  mb-4 p-3">
            <Button variant="ghost" className="p-0 hover:opacity-80  h-[30px] hover:bg-transparent rounded-full  mb-5">
                <Image
                    className="w-6 h-6 rounded-full -mr-1 overflow-hidden"
                    src="https://avatar.vercel.sh/james"
                    alt="Profile image"
                    width={24}
                    height={24}
                    aria-hidden="true"
                />
                <p className="font-bold text-sm">@georgelucas</p>
            </Button>
            <Link href={"/blog/1"} className="w-full">
                <h1 className="text-xl font-bold">Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ thuật lập trình web.</h1>
            </Link>
            <div className="w-full">
                <p className="text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ut iusto porro. Iste animi nemo ipsa ullam impedit, amet dignissimos aperiam! Voluptate,
                    omnis! Accusantium, qui totam recusandae sequi quasi labore?
                </p>
            </div>
            <div className="w-full flex justify-between items-center mt-2">
                <p className="">2 giờ trước</p>
                <Button variant="ghost" className="p-0 hover:opacity-80  h-[30px] hover:bg-transparent rounded-full">
                    <p className="">Xem thêm</p>
                </Button>
            </div>
        </div>
    );
};

export default BlogItem;
