import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import ChatFooter from "./ChatFooter";
import { formatMessageTime } from "../../Lib/Utils";
import ChatHeader from "./ChatHeader";
import toast from "react-hot-toast";

function Chatwindow() {
  const [dropdownOpen, setDropdownOpen] = useState({});
  const toggleDropdown = (messageId) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [messageId]: !prev[messageId], // सिर्फ उसी message के लिए toggle करें
    }));
  };
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
    deleteMessage,
  } = useChatStore();
  const { authUser } = useAuthStore();

  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <>
        <div className={`w-full h-[100vh] flex flex-col bg-white user-chat`}>
          <ChatHeader />
        </div>
      </>
    );
  }
  const handleCopy = (text, messageId) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard!");
        setDropdownOpen((prev) => ({
          ...prev,
          [messageId]: false, // Close the dropdown for this message
        }));
      })
      .catch(() => {
        toast.error("Failed to copy!");
      });
  };
  const handleDelete = (messageId) => {
    deleteMessage(messageId); // Call your delete function

    // Close the dropdown for this message
    setDropdownOpen((prev) => ({
      ...prev,
      [messageId]: false,
    }));
  };

  return (
    <>
      <div
        className={`w-full h-[100vh] flex flex-col bg-white user-chat ${
          selectedUser ? "user-chat-show" : ""
        } `}
      >
        <>
          <ChatHeader />
          <main className="flex-1 w-full overflow-y-auto p-4 lg:p-6 h-0 custom-scrollbar">
            <ul className="space-y-4">
              {messages.map((message) => (
                <li
                  className={`flex w-full ${
                    message.senderId === authUser._id
                      ? "justify-end"
                      : "justify-start"
                  } py-4`}
                  key={message._id}
                  ref={messageEndRef}
                >
                  <div className="flex items-end gap-3">
                    {message.senderId !== authUser._id && (
                      <img
                        src={
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBC3iJ_22NYdh9fswNxS3twlJ3O0YyBtOUWQ&s"
                        }
                        alt=""
                        className="rounded-full h-9 w-9"
                      />
                    )}
                    <div
                      className={`max-w-[100%] px-5 py-3 rounded-lg ${
                        message.senderId === authUser._id
                          ? "bg-blue-200 text-right"
                          : "bg-gray-200 text-left"
                      }`}
                    >
                      {message.text ? (
                        <p>{message.text}</p>
                      ) : (
                        <p className=" text-gray-500">
                          <div className="px-3.5 py-2 bg-gray-100 rounded-3xl">
                            <h5 className="text-sm font-normal text-gray-900 mb-3 text-start">
                              {message.poll.question}
                            </h5>
                            {message.poll.options.map((option) => (
                              <div
                                key={option._id}
                                className="flex items-center bg-white p-2 rounded-md mb-1 w-52"
                              >
                                <input
                                  type="radio"
                                  name={`poll-${message._id}`}
                                  id={`option-${option._id}`}
                                  className="hidden"
                                />
                                <label
                                  htmlFor={`option-${option._id}`}
                                  className="flex items-center cursor-pointer text-gray-900 text-sm font-medium"
                                >
                                  <span className="border border-gray-300 rounded-full mr-2 w-4 h-4"></span>
                                  {option.text}
                                </label>
                              </div>
                            ))}
                            <p className="text-xs font-normal text-gray-900 text-right">
                              {message.poll.options.reduce(
                                (acc, opt) => acc + opt.votes,
                                0
                              )}{" "}
                              votes | Vote to see results
                            </p>
                          </div>
                        </p>
                      )}
                      <p className="mt-1 text-xs text-gray-500">
                        <span className="tick">
                          <i className="align-middle ri-time-line"></i>
                        </span>
                        <span className="align-middle">
                          {formatMessageTime(message.createdAt)}
                        </span>
                      </p>
                    </div>
                    <div className="relative self-start">
                      <button
                        className="p-0 text-gray-400 border-0"
                        onClick={() => toggleDropdown(message._id)}
                      >
                        <i className="ri-more-2-fill"></i>
                      </button>
                      {dropdownOpen[message._id] && (
                        <div
                          className={`absolute -left-1/2 z-50 w-[100px] bg-white border rounded shadow-lg ${
                            message.senderId === authUser._id
                              ? "right-0"
                              : "left-0"
                          }`}
                        >
                          <button
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() =>
                              handleCopy(message.text, message._id)
                            }
                          >
                            Copy
                            <i className="text-gray-500 float-right ri-file-copy-line"></i>
                          </button>
                          <button className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Reply
                            <i className="text-gray-500 float-right ri-chat-forward-line"></i>
                          </button>
                          <button
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => handleDelete(message._id)}
                          >
                            Delete
                            <i className="text-gray-500 float-right ri-delete-bin-line"></i>
                          </button>
                        </div>
                      )}
                    </div>
                    {message.senderId === authUser._id && (
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBC3iJ_22NYdh9fswNxS3twlJ3O0YyBtOUWQ&s"
                        alt=""
                        className="rounded-full h-9 w-9"
                      />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </main>
          <ChatFooter />
        </>
      </div>
    </>
  );
}

export default Chatwindow;
