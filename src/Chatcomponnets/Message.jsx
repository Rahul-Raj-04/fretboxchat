/* eslint-disable react/prop-types */
import { useState } from "react";
import { Baseurl } from "../Config";
import Cookies from "js-cookie";
function Message({
  isOwn,
  avatar,
  name,
  text,
  content,
  time,
  _id,
  onReply,
  onDelete,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const accessToken = Cookies.get("accessToken");
  // Helper function to check file type
  const isImage = content && /\.(jpeg|jpg|png|gif)$/i.test(content);
  const isVideo = content && /\.(mp4|webm)$/i.test(content);
  // Copy to clipboard function
  const handleCopy = () => {
    const copyText = text || content; // Prioritize text, otherwise copy content URL
    if (copyText) {
      navigator.clipboard
        .writeText(copyText)
        .then(() => {
          // Optional feedback
          setIsDropdownOpen(false); // Close dropdown after copying
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${Baseurl}/api/v1/message/delete?messageId=${_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      let result;
      try {
        result = await response.json(); // ✅ Safely parse JSON
      } catch (jsonError) {
        console.error("JSON Parse Error:", jsonError);
        result = {}; // ✅ Default empty object if JSON parsing fails
      }

      console.log("Delete Response:", result); // Debugging

      if (response.ok && result.message === "Message deleted successfully") {
        alert("Message deleted successfully"); // ✅ Success
        onDelete(_id); // ✅ Update UI
      } else {
        alert(result.message || "Failed to delete message"); // ✅ Show API error message
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      if (error.message) {
        alert("An error occurred while deleting the message");
      }
    }

    setIsDropdownOpen(false);
  };

  return (
    <li className="clear-both py-4">
      <div className={`flex items-end gap-3 ${isOwn ? "justify-end" : ""}`}>
        {!isOwn && <img src={avatar} alt="" className="rounded-full h-9 w-9" />}

        <div>
          <div className="flex gap-2 mb-2">
            <div
              className={`relative px-5 py-3 text-gray-700 rounded-lg ${
                isOwn ? "bg-gray-50 text-left" : "bg-gray-200 text-black"
              }`}
            >
              {/* Show text if available */}
              {text && <p className="mb-0">{text}</p>}

              {/* Show Image if content is an image */}
              {isImage && (
                <img
                  src={content}
                  alt="Uploaded Content"
                  className="max-w-xs rounded-lg mt-2"
                />
              )}

              {/* Show Video if content is a video */}
              {isVideo && (
                <video controls className="max-w-xs rounded-lg mt-2">
                  <source src={content} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}

              {/* Timestamp */}
              <p className="mt-1 mb-0 text-xs text-right text-gray-500">
                <span className="tick">
                  <i className="align-middle ri-time-line"></i>
                </span>
                <span className="align-middle">{time}</span>
              </p>
            </div>

            {/* Dropdown menu */}
            <div className="relative self-start">
              <button
                className="p-0 text-gray-400 border-0"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <i className="ri-more-2-fill"></i>
              </button>
              {isDropdownOpen && (
                <div
                  className={`absolute z-50 w-[100px] bg-white border rounded shadow-lg ${
                    isOwn ? "right-0" : "left-0"
                  }`}
                >
                  <button
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleCopy}
                  >
                    Copy
                    <i className="text-gray-500 float-right ri-file-copy-line"></i>
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      onReply({ messageId: _id, name });
                      setIsDropdownOpen(false); // Close the dropdown
                    }}
                  >
                    Reply
                    <i className="text-gray-500 float-right ri-chat-forward-line"></i>
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleDelete}
                  >
                    Delete
                    <i className="text-gray-500 float-right ri-delete-bin-line"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div
            className={`text-gray-700 text-14 font-medium ${
              isOwn ? "text-right" : ""
            }`}
          >
            {name}
          </div>
        </div>
        {isOwn && <img src={avatar} alt="" className="rounded-full h-9 w-9" />}
      </div>
    </li>
  );
}

export default Message;
