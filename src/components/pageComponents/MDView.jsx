"use client";
import MarkdownIt from "markdown-it";
const mdParser = new MarkdownIt();
import "@/lib/CSS/default-primitive.css";

const MDView = ({ content }) => {
    return (
        <div className="section sec-html visible">
            <div className="custom-html-style !text-foreground" dangerouslySetInnerHTML={{ __html: mdParser.render(content) }} />
        </div>
    );
};

export default MDView;
