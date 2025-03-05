/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { useMessages } from "../Context/MessageContext";
import { useSocket } from "../Context/SocketContext";
import Message from "./Message";
import Cookies from "js-cookie";
import { Baseurl } from "../Config";
import avatar from "../assets/images/small/img-1.jpg";

const ChatMessages = ({ selectedUser, setReplyMessage }) => {
  const userId = Cookies.get("userId");
  const token = Cookies.get("accessToken");
  const { messages, setMessages } = useMessages();
  const { socket } = useSocket();
  const messagesEndRef = useRef(null);
  const chatId = selectedUser?.chatId || selectedUser?.id;

  console.log("All Messages from Context:", messages);
  // 🔹 API se messages fetch karna
  useEffect(() => {
    if (chatId) {
      setMessages([]); // ✅ Purane messages clear karo
      fetch(`${Baseurl}/api/v1/message/${chatId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Unauthorized or API error");
          return res.json();
        })
        .then((data) => {
          setMessages(data); // 🔹 Directly API se aaye messages set karo});
        })
        .catch((error) => console.error("API Error:", error));
    }
  }, [chatId, token, setMessages]);

  // 🔹 Socket se naye messages receive karna
  useEffect(() => {
    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket, setMessages]);

  const uniqueMessages = messages.filter(
    (msg, index, self) => index === self.findIndex((m) => m._id === msg._id)
  );

  // 🔹 Scroll to latest message
  // 🔹 Scroll to latest message without smooth scrolling
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: "end" });
  }, [uniqueMessages]);

  const handleDeleteMessage = (messageId) => {
    setMessages((prevMessages) =>
      prevMessages.filter((msg) => msg._id !== messageId)
    );
  };

  return (
    <main className="flex-1 w-full overflow-y-auto p-4 lg:p-6 h-0 custom-scrollbar">
      <ul className="space-y-4">
        {uniqueMessages.map((msg, index) => (
          <Message
            isOwn={String(msg.sender._id) === String(userId)}
            key={index}
            avatar={msg.avatar || msg.sender?.profilePhoto || avatar}
            name={msg.sender.firstName || msg.name || "Unknown"}
            text={msg.content}
            time={
              msg.sentOn || msg.createdAt
                ? new Date(msg.sentOn || msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Time not available"
            }
            content={msg.content}
            id={selectedUser.name}
            onDelete={handleDeleteMessage}
            _id={msg._id}
            onReply={() => setReplyMessage(msg)}
            // ✅ Click par replyMessage set hoga
            replyToMessage={messages.find((m) => m._id === msg.replyTo)}
          />
        ))}
        <div ref={messagesEndRef} />
      </ul>
    </main>
  );
};

export default ChatMessages;
