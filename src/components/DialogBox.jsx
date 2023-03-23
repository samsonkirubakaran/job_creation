import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import InputBox from "./InputBox";
import { Player } from "@lottiefiles/react-lottie-player";
import _ from "lodash";
const DialogBox = ({
  isOpen,
  inputFields,
  updateInputFields,
  step,
  nextBtn,
  stepTab,
  isLoading,
  isDisable,
  status,
}) => {
  const [data, setData] = useState(step);
  const [isError, setIsError] = useState(false);
  const [fields, setFields] = useState({});
  useEffect(() => {
    setFields(_.groupBy(data, "row"));
  }, [data]);

  const checkFields = (data) =>
    data.mandatory &&
    (data.attributes === null
      ? !(
          data.objectName in inputFields &&
          inputFields[data.objectName] !== undefined &&
          inputFields[data.objectName] !== null &&
          inputFields[data.objectName]?.trim() !== "" &&
          data.attributes === null
        )
      : data?.attributes?.dependentField in inputFields
      ? data?.attributes?.dependentField in inputFields &&
        inputFields[data?.attributes?.dependentField] !== null &&
        inputFields[data?.attributes?.dependentField]?.trim() !== "" &&
        inputFields[data?.attributes?.dependentField] ===
          data?.attributes?.whenValueAs
        ? !(
            data.objectName in inputFields &&
            inputFields[data.objectName] !== undefined &&
            inputFields[data.objectName] !== null &&
            inputFields[data.objectName]?.trim() !== ""
          )
        : false
      : false);
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={() => false}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {status !== null ? (
                  <Dialog.Panel className="flex justify-center items-center w-dialog-width min-h-dialog-height transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                    <Player
                      autoplay
                      loop={false}
                      keepLastFrame
                      src={
                        status === "SUCCESS"
                          ? "https://assets4.lottiefiles.com/packages/lf20_m3ixidnq.json"
                          : "https://assets8.lottiefiles.com/packages/lf20_ucaemjwr.json"
                      }
                      style={{ height: "300px", width: "300px" }}
                    ></Player>
                  </Dialog.Panel>
                ) : (
                  <Dialog.Panel className="relative w-dialog-width min-h-dialog-height rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all ">
                    <button
                      className="absolute flex justify-center items-center border border-placeholder rounded-full w-10 h-10 bg-white -top-9 shadow-md -right-7"
                      onClick={() => nextBtn("CLOSE")}
                    >
                      <p>X</p>
                    </button>
                    <div className="flex flex-col justify-between  transform overflow-hidden">
                      <div className="relative flex justify-between mb-6">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-dark"
                        >
                          Create Job
                        </Dialog.Title>
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-dark"
                        >
                          {stepTab}
                        </Dialog.Title>
                      </div>
                      <div className="flex flex-col justify-between overflow-hidden w-full">
                        {Object.values(fields).map((values, i) => {
                          return (
                            <div
                              className="flex gap-1 p-1 w-full justify-between items-end"
                              key={i}
                            >
                              {values.map((value) => {
                                let per =
                                  values.length === 1
                                    ? 100
                                    : 97 / values.length;

                                return (
                                  <InputBox
                                    isLoading={isLoading}
                                    width={per}
                                    data={value}
                                    inputFields={inputFields}
                                    updateInputFields={updateInputFields}
                                    isErrorPresent={value?.isError}
                                  />
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>

                      <div className="self-end mt-3">
                        <button
                          disabled={isDisable}
                          type="button"
                          class="flex justify-center items-center rounded  min-w-16 min-h-10 bg-primary p-input-space text-base font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]   focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] "
                          onClick={() => {
                            const filterData = data.map((data) => {
                              if (checkFields(data)) {
                                data["isError"] = true;
                              } else if (data.mandatory) {
                                data["isError"] = false;
                              }
                              return data;
                            });
                            setData([...[], ...filterData]);

                            if (data.some((data) => checkFields(data))) {
                              return null;
                            }

                            nextBtn(stepTab);
                          }}
                        >
                          {isLoading ? (
                            <svg
                              aria-hidden="true"
                              role="status"
                              class="inline w-4 h-4 mr-3 text-white animate-spin"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="#E5E7EB"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor"
                              />
                            </svg>
                          ) : null}
                          {isLoading ? <p>Loading..</p> : <p>Next</p>}
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                )}
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default DialogBox;
