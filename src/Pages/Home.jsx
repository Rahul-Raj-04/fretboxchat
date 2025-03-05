import SideBar from "./SideBar";
import ChatList from "./ChatList";
import Chatwindow from "./ChatWindow/Chatwindow";
import { useChat } from "../Context/ChatContext";
import CurrentProfile from "./CurrentUser/CurrentProfile";
import EtitCurrentProfile from "./CurrentUser/EtitCurrentProfile";
import Group from "./Group";
import ContactList from "./ContactList";

import { useChatStore } from "../store/useChatStore";
import ChatUserProfile from "./ChatUserProfile";
import Gropchatwindow from "./GroupChatWindow/Gropchatwindow";

function Home() {
  const { activeTab } = useChat();

  const { selectedUser, showProfile, selectedChat } = useChatStore();
  return (
    <>
      <div className="bg-[#85b0c0] overflow-hidden">
        <div className="sm:w-[80%] mx-auto">
          <div className="flex">
            <SideBar />
            <div className="flex-grow">
              {activeTab === "Chats" && <ChatList />}
              {activeTab === "Profile" && <CurrentProfile />}
              {activeTab === "Settings" && <EtitCurrentProfile />}
              {activeTab === "Groups" && <Group />}
              {activeTab === "Contacts" && <ContactList />}
            </div>

            {selectedChat ? (
              <Gropchatwindow />
            ) : selectedUser ? (
              <Chatwindow />
            ) : null}
            {showProfile && <ChatUserProfile />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
