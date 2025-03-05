/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

// 1️⃣ Create Context
const ChatContext = createContext();

// 2️⃣ Provider Component
export const ChatProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("Chats");
  const [selectedChat, setSelectedChat] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isviewProfile, setIsviewProfile] = useState(false);

  return (
    <ChatContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedChat,
        setSelectedChat,
        isSidebarOpen,
        setIsSidebarOpen,
        isviewProfile,
        setIsviewProfile,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// 3️⃣ Custom Hook for easy access
export const useChat = () => useContext(ChatContext);
