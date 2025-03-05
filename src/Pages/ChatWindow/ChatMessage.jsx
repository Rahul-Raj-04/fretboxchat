// import { useChat } from "../../Context/ChatContext";

// function ChatMessage() {
//   const { selectedChat } = useChat();
//   return (
//     <>
//       <main className="flex-1 w-full overflow-y-auto p-4 lg:p-6 h-0 custom-scrollbar">
//         <ul className="space-y-4">
//           <li className="clear-both py-4">
//             <div className={`flex items-end gap-3 justify-end }`}>
//               <img
//                 src={
//                   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBC3iJ_22NYdh9fswNxS3twlJ3O0YyBtOUWQ&s"
//                 }
//                 alt=""
//                 className="rounded-full h-9 w-9"
//               />
//               <div>
//                 <div className="flex gap-2 mb-2">
//                   <div
//                     className={`relative px-5 py-3 text-gray-700 rounded-lg bg-gray-200 `}
//                   >
//                     {/* Show text if available */}
//                     {selectedChat?.eyeColor || "Unknown User"}
//                     {/* Timestamp */}
//                     <p className="mt-1 mb-0 text-xs text-right text-gray-500">
//                       <span className="tick">
//                         <i className="align-middle ri-time-line"></i>
//                       </span>
//                       <span className="align-middle">22 :44</span>
//                     </p>
//                   </div>

//                   {/* Dropdown menu */}
//                   <div className="relative self-start">
//                     <button className="p-0 text-gray-400 border-0">
//                       <i className="ri-more-2-fill"></i>
//                     </button>
//                   </div>
//                 </div>
//                 <div className={`text-gray-700 text-14 font-medium `}>name</div>
//               </div>
//             </div>
//           </li>
//         </ul>
//       </main>
//     </>
//   );
// }

// export default ChatMessage;
