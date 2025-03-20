"use client";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContextProvider";
import NoUser from "@/components/pageComponents/NoUser";
const ChatBotPage = () => {
    const { authUserData } = useContext(AuthContext);
    if (!authUserData) {
        return <NoUser />;
    }
    return (
        <div className="mt-32">
            <h1>ChatBot Page</h1>
            <p>This is the chatbot page.</p>
        </div>
    );
};

export default ChatBotPage;
