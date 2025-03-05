/* eslint-disable react/prop-types */
import ChatHeader from "./ChatHeader";
import ChatInput from "./Chatinput";
import ChatMessages from "./ChatMessages";
import image from "../assets/images/chatbg.png";
import { useState } from "react";
function Chatbox({ isChatOpen, selectedUser, setIsChatOpen }) {
  const chatId = selectedUser?.chatId || selectedUser?.id;
  const [replyMessage, setReplyMessage] = useState(null);
  return (
    <>
      <div
        className={`w-full h-[100vh] flex flex-col bg-white user-chat ${
          isChatOpen ? "user-chat-show" : ""
        }`}
      >
        {isChatOpen ? (
          <>
            {/* Pass selectedUser to ChatHeader and ChatMessages */}
            <ChatHeader
              setIsChatOpen={setIsChatOpen}
              selectedUser={selectedUser}
            />
            <ChatMessages
              selectedUser={selectedUser}
              setReplyMessage={setReplyMessage}
            />
            <ChatInput
              chatId={chatId}
              replyMessage={replyMessage}
              setReplyMessage={setReplyMessage}
            />
          </>
        ) : (
          <div className="flex items-center justify-center">
            <img
              src={image}
              alt="Chat Placeholder"
              className="w-full h-screen"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Chatbox;
