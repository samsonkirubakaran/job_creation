import { Transition } from "@headlessui/react";
import { useEffect, useLayoutEffect, useState } from "react";
import { STEP_ONE, STEP_TWO } from "../constants/fields/jobFields";
import DialogBox from "../components/DialogBox";
import axios from "axios";
import _ from "lodash";
import Card from "../components/Card";
import { useQuery } from "react-query";
import { Player } from "@lottiefiles/react-lottie-player";
import { BASE_URL } from "../constants/API";
const CreateJob = () => {
  let [isShowing, setIsShowing] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [tab, setTab] = useState(null);
  const [stepTab, setStepTab] = useState(null);
  const [isDisable, setIsDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isApiCall, setIsApiCall] = useState(false);
  const [status, setStatus] = useState(null);
  const [inputFields, setInputFields] = useState({});
  function closeModal() {
    setIsClicked(false);
  }
  useEffect(() => {
    setIsApiCall(true);
  }, []);

  const getJobDetails = async () => {
    setIsApiCall(false);
    return await axios.get(`${BASE_URL}/jobDetails`).then((data) => data.data);
  };
  const query = useQuery("jobDetails", getJobDetails, {
    enabled: isApiCall === true,
  });
  // console.log(
  //   "query : ",
  //   query.data,
  //   query.data !== undefined && query.data !== null && query.data?.length > 0
  // );
  const nextBtn = (step) => {
    if ("CLOSE" === step) {
      setInputFields({});

      setTimeout(() => {
        setStatus(null);
        setIsLoading(false);
        setIsDisable(false);
        setTab(null);
        setStepTab(null);
        setIsClicked(false);
        setStatus(null);
      }, 300);
    } else if ("Step 2" === step) {
      setIsDisable(true);
      setIsLoading(true);
      const req = {};
      _.flatten([STEP_ONE, STEP_TWO]).forEach((data) => {
        return (req[data?.objectName] =
          inputFields[data?.objectName] === undefined
            ? null
            : inputFields[data?.objectName]);
      });

      axios.post(`${BASE_URL}/jobDetails`, req).then((data) => {
        if (+data.status === 201 || +data.status === 200) {
          setStatus("SUCCESS");
        } else {
          setStatus("ERROR");
        }
        setIsApiCall(true);
        setInputFields({});

        setTimeout(() => {
          setIsLoading(false);
          setIsDisable(false);
          setTab(null);
          setStepTab(null);
          setIsClicked(false);
          setStatus(null);
        }, 3000);
      });
    } else {
      setIsClicked(true);
      setTab(null);
      setStepTab(null);
      setTimeout(() => {
        setTab("STEP_TWO");
        setStepTab("Step 2");
        setIsClicked(true);
      }, 100);
    }
  };

  const updateInputFields = (name, value) =>
    setInputFields({ ...inputFields, [name]: value });

  useLayoutEffect(() => {
    setTimeout(() => setIsShowing(true), 1500);
  });
  return (
    <div className="w-screen h-screen p-2 overflow-x-hidden">
      <div className="w-40 h-14">
        <Transition
          show={isShowing}
          enter="transition duration-[400ms]"
          enterFrom="opacity-0 scale-0"
          enterTo="opacity-100 scale-1"
        >
          <button
            onClick={() => {
              setIsClicked(!isClicked);
              setTab("STEP_ONE");
              setStepTab("Step 1");
            }}
            className="bg-sky-400 p-3 shadow-md rounded-lg hover:bg-sky-500 hover:shadow-sm"
          >
            <p className="text-white">Create Job</p>
          </button>
        </Transition>
      </div>
      <div
        className={
          query.isLoading ||
          !(
            query.data !== undefined &&
            query.data !== null &&
            query.data?.length > 0
          )
            ? "flex justify-center items-center w-full h-full"
            : "grid grid-cols-2 place-content-center place-items-center gap-14 w-full h-full"
        }
      >
        {query.isLoading ? (
          <Player
            autoplay
            loop
            src={"https://assets5.lottiefiles.com/packages/lf20_rwbbf6ns.json"}
            style={{ height: "350px", width: "350px" }}
          />
        ) : query.data !== undefined &&
          query.data !== null &&
          query.data?.length > 0 ? (
          query.data?.map((value, i) => <Card data={value} key={i} />)
        ) : (
          <Player
            autoplay
            loop
            src={"https://assets4.lottiefiles.com/packages/lf20_atxkdesj.json"}
            style={{ height: "350px", width: "350px" }}
          />
        )}
      </div>
      {tab !== null ? (
        <DialogBox
          status={status}
          isDisable={isDisable}
          isLoading={isLoading}
          isOpen={isClicked}
          closeModal={closeModal}
          inputFields={inputFields}
          updateInputFields={updateInputFields}
          step={"STEP_ONE" === tab ? STEP_ONE : STEP_TWO}
          stepTab={stepTab}
          nextBtn={nextBtn}
        />
      ) : null}
    </div>
  );
};

export default CreateJob;
