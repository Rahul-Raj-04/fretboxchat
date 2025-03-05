/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { useSocket } from "../Context/SocketContext";
import { useMessages } from "../Context/MessageContext";
import Cookies from "js-cookie";
import { Baseurl } from "../Config";
import { useUser } from "../Utils/UseFetchUser";

const ChatInput = ({ chatId, replyMessage, setReplyMessage }) => {
  const inputRef = useRef(null);
  const userId = Cookies.get("userId");
  const { socket } = useSocket();
  const { setMessages: updateMessages } = useMessages();
  const [socketmessage, setSocketmessage] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { user, loading } = useUser();
  // 📌 Image Select Handler

  const currentUser = {
    _id: user?._id || "Unknown",
    avatar: user?.profilePhoto || "default-avatar-url.jpg",
    name: user?.firstName || "Unknown User",
  };
  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setShowPopup(false);
    }
  };
  const handleSendMessage = async () => {
    if (socketmessage.trim()) {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const tempId = Math.random().toString(36).substring(7); // Temporary ID
      const newMessage = {
        _id: tempId, // Temporary unique ID
        avatar: currentUser.avatar,
        name: currentUser.name,
        text: socketmessage,
        time: formattedTime,
        content: socketmessage,
        chatId,
        sender: { _id: userId },
        createdAt: new Date().toISOString(),
        isTemporary: true, // Temporary flag
        replyTo: replyMessage ? replyMessage._id : null,
      };

      // 🔹 Pehle local state me message add kar do
      updateMessages((prevMessages) => [...prevMessages, newMessage]);

      // 🔹 Socket emit karo
      socket.emit("message", newMessage, async (serverResponse) => {
        if (serverResponse && serverResponse._id) {
          // Jab API response aaye, tab temporary message ko replace karna
          updateMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg._id === tempId
                ? {
                    ...msg,
                    _id: serverResponse._id,
                    isTemporary: false,
                    avatar: serverResponse.sender?.profilePhoto || msg.avatar,
                  }
                : msg
            )
          );
        }
      });

      // 🔹 API me bhi send karo
      try {
        const response = await fetch(`${Baseurl}/api/v1/message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
          body: JSON.stringify({ ...newMessage, _id: undefined }), // API ke liye temporary _id remove karein
        });

        const data = await response.json();
        if (data && data._id) {
          updateMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg._id === tempId
                ? { ...msg, _id: data._id, isTemporary: false }
                : msg
            )
          );
        }
      } catch (error) {
        console.error("API Error:", error);
      }

      // 🔹 Input field clear karo
      setSocketmessage("");
      setReplyMessage(null);
      setTimeout(() => {
        inputRef.current?.focus(); // Re-focus input after message is sent
      }, 0);
    }
  };

  return (
    <footer className="p-4 bg-white border-t border-gray-100 sticky bottom-0">
      <div className="flex gap-2 items-center">
        <button
          className="text-gray-500 text-16 border border-gray-300 rounded-lg px-3 py-2"
          onClick={() => setShowPopup(!showPopup)}
        >
          {showPopup ? (
            <i className="ri-close-circle-fill text-2xl"></i>
          ) : (
            <i className="ri-file-add-fill text-2xl"></i>
          )}
        </button>
        {showPopup && (
          <div className="absolute bottom-24 left-2   rounded-xl p-2 w-52 shadow-2xl bg-gray-200">
            <ul className="space-y-2">
              <li className="flex items-center gap-2 p-2 hover:bg-white cursor-pointer rounded-md">
                📄 Document
              </li>
              <li className="flex items-center gap-2 p-2 hover:bg-white cursor-pointer rounded-md">
                <label
                  htmlFor="imageUpload"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  🖼️ Photos & Videos
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSelect}
                />
              </li>

              <li className="flex items-center gap-2 p-2 hover:bg-white cursor-pointer rounded-md">
                📊 Poll
              </li>
            </ul>
            {selectedImage && (
              <div className="mt-2 p-2 border-t">
                <p className="text-sm text-gray-500 mb-1">Selected Image:</p>
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="w-full h-20 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>
        )}

        {selectedImage && (
          <div className="relative ml-2">
            <img
              src={selectedImage}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-0 right-0 bg-gray-700 text-white rounded-full p-1 text-xs"
            >
              ✖
            </button>
          </div>
        )}

        {replyMessage && (
          <div className="absolute bottom-full mb-2 left-0 w-full bg-gray-100 p-3 rounded-lg flex justify-between items-center shadow-lg">
            <div className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[85%]">
              <p className="text-sm text-gray-600">{replyMessage.text}</p>
            </div>
            <button
              onClick={() => setReplyMessage(null)}
              className="text-gray-500 ml-2"
            >
              ✖
            </button>
          </div>
        )}

        <input
          ref={inputRef}
          type="text"
          className="w-[70%] border border-gray-300 rounded-lg p-2 text-14 bg-gray-50 placeholder-gray-500"
          placeholder="Enter Message..."
          value={socketmessage}
          onChange={(e) => setSocketmessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />

        <button
          className="text-white bg-[#00afef] px-3 py-2 rounded-lg"
          onClick={handleSendMessage}
        >
          <i className="ri-send-plane-2-fill"></i>
        </button>
      </div>
    </footer>
  );
};

export default ChatInput;
