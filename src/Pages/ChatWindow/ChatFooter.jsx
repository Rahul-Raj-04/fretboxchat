import { useRef, useState } from "react";
import { useChatStore } from "../../store/useChatStore";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import PollCreator from "../../Pole/Polecreation";
function ChatFooter() {
  const [showPopup, setShowPopup] = useState(false);
  const [showPoll, setShowPoll] = useState(false); // State to show poll
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null); // Ref for input field
  const { sendMessage, sendMessageWithPoll, selectedUser } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setShowPopup(false);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !fileInputRef.current?.files[0]) return;

    const formData = new FormData();
    formData.append("text", text.trim());

    if (fileInputRef.current?.files[0]) {
      formData.append("image", fileInputRef.current.files[0]);
    }

    // Debugging: Check FormData contents
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      await sendMessage(formData, selectedUser._id);
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (inputRef.current) inputRef.current.focus();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleSendPoll = async (pollData) => {
    try {
      const payload = {
        text: "", // Poll ke liye text blank hoga
        image: null, // Image nahi bhejni hai to null rakhein
        poll: {
          question: pollData.question,
          options: pollData.options,
        },
      };

      await sendMessageWithPoll(payload); // API call
      setShowPoll(false); // Popup close kar do
    } catch (error) {
      console.error("Failed to send poll:", error);
    }
  };

  return (
    <>
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
                    ref={fileInputRef}
                    onChange={handleImageChange}
                  />
                </li>

                <li
                  className="flex items-center gap-2 p-2 hover:bg-white cursor-pointer rounded-md"
                  onClick={() => {
                    setShowPoll(true);
                    setShowPopup(!showPopup);
                  }}
                >
                  📊 Poll
                </li>
              </ul>
            </div>
          )}
          {imagePreview && (
            <div className="mb-3 flex items-center gap-2">
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                />
                <button
                  onClick={removeImage}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
                  type="button"
                >
                  <X className="size-3" />
                </button>
              </div>
            </div>
          )}
          <form
            onSubmit={handleSendMessage}
            className=" w-full gap-4 mx-auto  flex"
          >
            <input
              type="text"
              className="w-[70%] border border-gray-300 rounded-lg p-2 text-14 bg-gray-50 placeholder-gray-500"
              placeholder="Enter Message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              ref={inputRef}
            />

            <button
              type="submit"
              className="text-white bg-[#00afef] px-3 py-2 rounded-lg"
              disabled={!text.trim() && !imagePreview}
            >
              <i className="ri-send-plane-2-fill"></i>
            </button>
          </form>
        </div>
      </footer>
      {showPoll && (
        <PollCreator
          onSubmit={handleSendPoll}
          onClose={() => setShowPoll(false)}
        />
      )}
    </>
  );
}

export default ChatFooter;
