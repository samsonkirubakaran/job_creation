import React, { useEffect, useState } from "react";

const InputBox = ({
  width,
  data,
  inputFields,
  updateInputFields,
  isErrorPresent,
  isLoading,
}) => {
  const [isError, setIsError] = useState(isErrorPresent);

  useEffect(() => {
    setIsError(isErrorPresent);
  }, [isErrorPresent]);

  const onBlurChange = (event) => {
    if (data?.mandatory && event.target.value.trim() === "") {
      setIsError(true);
    } else if (data?.mandatory && isError && event.target.value.trim()) {
      setIsError(false);
    } else if (
      data?.mandatory &&
      !isError &&
      event.target.value.trim() === ""
    ) {
      setIsError(true);
    }
  };

  const onChangeValue = (event) => {
    if (data?.mandatory && isError && event.target.value.trim()) {
      setIsError(false);
    } else if (
      data?.mandatory &&
      !isError &&
      event.target.value.trim() === ""
    ) {
      setIsError(true);
    }
    updateInputFields(data?.objectName, event.target.value);
  };

  return (
    <>
      {data?.type === "select" ? (
        <div style={{ width: `${width}%` }} key={data?.id}>
          <label
            htmlFor={data?.id}
            className={`${
              data?.mandatory ? 'after:content-["*"] after:text-error' : ""
            } text-dark`}
          >
            {data?.displayName}
          </label>
          <select
            disabled={isLoading}
            onBlur={(event) => onBlurChange(event)}
            onChange={(event) => onChangeValue(event)}
            value={inputFields[data?.objectName]}
            type={
              data?.type === "number"
                ? "number"
                : data?.type === "time"
                ? "time"
                : "text"
            }
            name=""
            id={data?.id}
            placeholder={data?.placeHolder}
            className={`transition ease-in-out delay-200 w-full p-input-space outline-none border border-solid  rounded-5 placeholder:text-placeholder  ${
              isError
                ? "animate-headShake border-error  focus:border-error focus:ring-error"
                : "focus:border-primary border-input"
            } ${
              inputFields[data?.attributes?.dependentField] !== null &&
              inputFields[data?.attributes?.dependentField]?.trim() !== "" &&
              inputFields[data?.attributes?.dependentField] ===
                data?.attributes?.whenValueAs &&
              "animate-textOpac"
            } duration-300`}
          >
            <option value={""}>{data?.placeHolder}</option>
            {data?.values?.map((vaue) => (
              <option value={vaue}>{vaue}</option>
            ))}
          </select>
          {data?.mandatory && isError ? (
            <p class="transition ease-in-out delay-150 text-error text-xs italic duration-300 animate-textOpac p-1">
              Please fill out {data?.displayName}.
            </p>
          ) : null}
        </div>
      ) : data?.type === "radio" ? (
        <div key={data?.id}>
          <div>
            <p
              id={data?.id}
              className={`${
                data?.mandatory ? 'after:content-["*"] after:text-error' : ""
              } text-dark`}
            >
              {data?.displayName}
            </p>
          </div>
          <div className="flex flex-row gap-4 h-10 p-1 items-center">
            {data?.values?.map((vaue, i) => (
              <div className="flex gap-1" key={i}>
                <input
                  disabled={isLoading}
                  onBlur={(event) => onBlurChange(event)}
                  onChange={(event) => onChangeValue(event)}
                  value={vaue}
                  type="radio"
                  name={data?.id}
                  id={data?.id}
                  className="transition ease-in-out delay-150 w-5 h-5 border-2 border-solid border-radio checked:bg-primary checked:hover:bg-primary checked:active:bg-primary checked:focus:bg-primary focus:bg-primary focus:outline-none focus:ring-1 focus:ring-primary duration-300"
                />

                <label htmlFor={data?.id} className="text-dark ">
                  {vaue}
                </label>
              </div>
            ))}
          </div>
        </div>
      ) : data?.attributes === null ||
        (inputFields[data?.attributes?.dependentField] !== null &&
          inputFields[data?.attributes?.dependentField]?.trim() !== "" &&
          inputFields[data?.attributes?.dependentField] ===
            data?.attributes?.whenValueAs) ? (
        <div style={{ width: `${width}%` }} key={data?.id}>
          <label
            htmlFor={data?.id}
            className={`${
              data?.mandatory ? 'after:content-["*"] after:text-error' : ""
            } text-dark`}
          >
            {data?.displayName}
          </label>
          <input
            disabled={isLoading}
            onBlur={(event) => onBlurChange(event)}
            onChange={(event) => onChangeValue(event)}
            value={inputFields[data?.objectName]}
            type={
              data?.type === "number"
                ? "number"
                : data?.type === "time"
                ? "time"
                : "text"
            }
            name={data?.displayName}
            id={data?.id}
            placeholder={data?.placeHolder}
            className={`transition ease-in-out delay-200 w-full p-input-space outline-none border border-solid  rounded-5 placeholder:text-placeholder  ${
              isError
                ? "animate-headShake border-error  focus:border-error focus:ring-error"
                : "focus:border-primary border-input"
            } ${
              inputFields[data?.attributes?.dependentField] !== null &&
              inputFields[data?.attributes?.dependentField]?.trim() !== "" &&
              inputFields[data?.attributes?.dependentField] ===
                data?.attributes?.whenValueAs
                ? "animate-textOpac"
                : ""
            } duration-300`}
          />
          {data?.mandatory && isError ? (
            <p class="transition ease-in-out delay-150 text-error text-xs italic duration-300 animate-textOpac p-1">
              Please fill out {data?.displayName}.
            </p>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default InputBox;
