// /* eslint-disable react/prop-types */

// function Privacy({ userdetails, loading }) {
//   // const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

//   return (
//     <>
//       <div className="mt-2 text-gray-700 accordion-item border border-gray-100 rounded ">
//         <h2>
//           <button
//             type="button"
//             className="flex items-center justify-between w-full px-3 py-2 font-semibold text-left accordion-header group"
//             // onClick={() => setIsPrivacyOpen(!isPrivacyOpen)}
//           >
//             <span className="m-0 text-[14px] font-semibold">Privacy</span>
//             <span className="m-0 text-[14px] font-semibold  text-red-400">Comming soon</span>
//             <i
//               className={`mdi mdi-chevron-down text-lg transition-transform duration-300 ease-in-out `}
//             ></i>
//             {/* ${
//                 isPrivacyOpen ? "rotate-180" : ""
//               } */}
//           </button>
//         </h2>

//         <div
//           className={`overflow-hidden transition-all duration-300 ease-in-out `}
//           // ${
//           //   isPrivacyOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
//           // }
//         >
//           <div className=" bg-white border border-t-0 border-gray-100 accordion-body ">
//             <div className="p-5">
//               <div className="py-4">
//                 <div className="flex items-center">
//                   <div className="flex-grow overflow-hidden">
//                     <h5 className="mb-0 text-gray-700 truncate text-13 dark:text-gray-50">
//                       Profile photo
//                     </h5>
//                   </div>
//                   <div className="relative flex-shrink-0 dropdown">
//                     <button
//                       className="border-transparent rounded btn dropdown-toggle bg-slate-100 px-1.5 py-1  "
//                       type="button"
//                     >
//                       {loading
//                         ? "Loading..."
//                         : `${userdetails.status ? "Everyone" : "Everyone"} `}

//                       <i className="mdi mdi-chevron-down"></i>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <div className="py-4 border-t border-gray-100/80 ">
//                 <div className="flex items-center">
//                   <div className="flex-grow overflow-hidden">
//                     <h5 className="mb-0 text-gray-700 truncate text-13 ">
//                       Last seen
//                     </h5>
//                   </div>
//                   <div className="flex items-center">
//                     <label
//                       htmlFor="toggleSwitch"
//                       className="flex items-center cursor-pointer"
//                     >
//                       <span className="relative">
//                         <input
//                           type="checkbox"
//                           id="toggleSwitch"
//                           className="sr-only"
//                         />
//                         <span className="block w-8 h-5 rounded-full  bg-red-500"></span>
//                         <span className="absolute w-3 h-3 transition rounded-full dot left-1 top-1"></span>
//                       </span>
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Privacy;
