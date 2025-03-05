import { useState } from "react";
import Chatbox from "./Chatcomponnets/Chatbox";
import Asidemenu from "./Componnets/Asidemenu";
import ChatList from "./Componnets/ChatList";
import Profileuser from "./Componnets/Profileuser";
import ContactList from "./Componnets/ContactList";
import Settings from "./Componnets/Settings/Settings";
import ProfileSetting from "./Componnets/UsersProfilesetting/ProfileSetting";
import { useProfile } from "./Context/ViewProfileContext";

function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Chats"); // Default to Chats
  const { isProfileSettingOpen } = useProfile();
  return (
    <>
      <div className="bg-[#85b0c0] overflow-hidden">
        <div className="sm:w-[80%] mx-auto">
          <div className="flex">
            <Asidemenu setActiveTab={setActiveTab} activeTab={activeTab} />

            {/* Pass setSelectedUser and setIsChatOpen to ChatList */}
            <div className="flex-grow">
              {activeTab === "Chats" && (
                <ChatList
                  setIsChatOpen={setIsChatOpen}
                  setSelectedUser={setSelectedUser}
                />
              )}
              {activeTab === "Profile" && (
                <Profileuser setActiveTab={setActiveTab} />
              )}
              {activeTab === "Settings" && <Settings />}
              {activeTab === "Contacts" && (
                <ContactList
                  setIsChatOpen={setIsChatOpen}
                  setSelectedUser={setSelectedUser}
                  isChatOpen={isChatOpen}
                  selectedUser={selectedUser}
                />
              )}
            </div>

            <Chatbox
              setIsChatOpen={setIsChatOpen}
              setSelectedUser={setSelectedUser}
              isChatOpen={isChatOpen}
              selectedUser={selectedUser}
            />
            {isProfileSettingOpen && <ProfileSetting />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
