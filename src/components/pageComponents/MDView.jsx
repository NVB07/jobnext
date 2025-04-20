"use client";
import MarkdownIt from "markdown-it";
// const mdParser = new MarkdownIt();

const mdParser = new MarkdownIt({
    html: true,
    linkify: true,
}).use((md) => {
    const defaultRender =
        md.renderer.rules.link_open ||
        function (tokens, idx, options, env, self) {
            return self.renderToken(tokens, idx, options);
        };

    md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
        const token = tokens[idx];

        // Tìm xem có target chưa, nếu chưa thì thêm
        const targetAttr = token.attrs?.find((attr) => attr[0] === "target");
        if (!targetAttr) {
            token.attrPush(["target", "_blank"]);
        }

        // Thêm rel="noopener noreferrer" để bảo mật
        const relAttr = token.attrs?.find((attr) => attr[0] === "rel");
        if (!relAttr) {
            token.attrPush(["rel", "noopener noreferrer"]);
        }

        return defaultRender(tokens, idx, options, env, self);
    };
});

import "@/lib/CSS/default-primitive.css";
import "react-markdown-editor-lite/lib/index.css";
const MDView = ({ content }) => {
    return (
        <div className="section sec-html visible">
            <div className="custom-html-style !text-foreground" dangerouslySetInnerHTML={{ __html: mdParser.render(content) }} />
        </div>
    );
};

export default MDView;
