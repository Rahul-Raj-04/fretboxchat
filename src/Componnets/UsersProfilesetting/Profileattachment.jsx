import { useState } from "react";

function Profileattachment() {
  const [isattachmentOpen, setIsattachmentOpen] = useState(false);
  return (
    <>
      <div className="mt-2 text-gray-700 accordion-item">
        <h2>
          <button
            onClick={() => setIsattachmentOpen(!isattachmentOpen)}
            type="button"
            className="flex items-center justify-between w-full px-3 py-2 font-medium text-left border border-gray-100 rounded accordion-header group dark:border-b-zinc-600 dark:bg-zinc-600 dark:border-zinc-600"
          >
            <span className="m-0 text-[14px] dark:text-gray-50 font-semibold ltr:block rtl:hidden">
              <i className="mr-2 align-middle ri-attachment-line d-inline-block"></i>{" "}
              Attached Files
            </span>

            <i
                    className={`mdi mdi-chevron-down text-lg transition-transform duration-300 ease-in-out ${
                        isattachmentOpen ? "rotate-180" : ""
                    }`}
                  ></i>
          </button>
        </h2>
        <div className={`"${
                  isattachmentOpen
                    ? "max-h-screen opacity-100"
                    : "max-h-0 opacity-0"
                } bg-white border border-t-0 border-gray-100 accordion-body dark:bg-transparent dark:border-zinc-600"`}>
          <div className="p-5">
            <div className="p-2 mb-2 border rounded border-gray-100/80 dark:bg-zinc-800 dark:border-transparent">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded ltr:mr-3 group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=red]:bg-red-500/20 rtl:ml-3">
                  <div className="text-xl rounded-lg group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500 avatar-title ">
                    <i className="ri-file-text-fill"></i>
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="text-start">
                    <h5 className="mb-1 text-sm dark:text-gray-50">
                      Admin-A.zip
                    </h5>
                    <p className="mb-0 text-gray-500 text-13 dark:text-gray-300">
                      12.5 MB
                    </p>
                  </div>
                </div>

                <div className="ltr:ml-4 rtl:mr-4">
                  <ul className="flex items-center gap-3 mb-0 text-lg">
                    <li>
                      <a
                        href="#"
                        className="px-1 text-gray-500 dark:text-gray-300"
                      >
                        <i className="ri-download-2-line"></i>
                      </a>
                    </li>
                    <li className="relative flex-shrink-0 dropstart">
                      <a
                        href="#!"
                        className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                        data-bs-toggle="dropdown"
                        id="dropdownMenuButton23"
                      >
                        <i className="text-lg ri-more-fill"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profileattachment;
