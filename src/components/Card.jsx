import React from "react";

const Card = ({ data, key }) => {
  function onTimeChange(value) {
    var timeSplit = value.split(":"),
      hours,
      minutes,
      meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = "PM";
      hours -= 12;
    } else if (hours < 12) {
      meridian = "AM";
      if (hours == 0) {
        hours = 12;
      }
    } else {
      meridian = "PM";
    }
    return hours + ":" + minutes + " " + meridian;
  }
  function numberWithCommas(x) {
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div
      className="transition ease-in-out delay-150 w-card-width  h-card-height bg-white border border-input rounded-10 p-card-space flex flex-col justify-start shadow-md gap-10px animate-textOpac-1 duration-300"
      key={key}
    >
      <div className="flex gap-2 w-full h-full">
        <div>
          <img
            alt="netflix logo"
            src="https://www.freepnglogos.com/uploads/netflix-logo-app-png-16.png"
            className="object-cover h-12 w-12"
          />
        </div>
        <div className="flex flex-col justify-between w-full h-full gap-2">
          <div>
            <p className="text-2xl font-normal text-black">{data?.jobTitle}</p>
            <p className="text-base font-normal text-black">
              {data?.companyName + " - " + data?.industry}
            </p>
            {data?.location || data?.remoteType ? (
              <p className="text-base font-normal text-placeholder">
                {`${data?.location} ${
                  data?.remoteType ? `(${data?.remoteType})` : ""
                }`}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            {data?.workType ? (
              <p className="text-base font-normal text-light-black">
                {`${data?.workType} ${
                  data?.partTimeTo && data?.partTimeFrom
                    ? `(${onTimeChange(data?.partTimeFrom)} - ${onTimeChange(
                        data?.partTimeTo
                      )})`
                    : ""
                }`}
              </p>
            ) : null}
            {data?.experienceMin || data?.experienceMax ? (
              <p className="text-base font-normal text-light-black">
                {`Experience (${
                  data?.experienceMin +
                  (data?.experienceMin && data?.experienceMax ? " - " : "") +
                  data?.experienceMax
                } years)`}
              </p>
            ) : null}
            {data?.salaryMin || data?.salaryMax ? (
              <p className="text-base font-normal text-light-black">
                {`INR (₹) ${
                  numberWithCommas(data?.salaryMin) +
                  (data?.salaryMin && data?.salaryMax ? " - " : "") +
                  numberWithCommas(data?.salaryMax)
                } / Month`}
              </p>
            ) : null}
            {data?.totalEmployee ? (
              <p className="text-base font-normal text-light-black">
                {`${data?.totalEmployee} employees`}
              </p>
            ) : null}
          </div>
          <div className="flex gap-6">
            <button
              type="button"
              class="flex justify-center items-center rounded  min-w-16 min-h-10 bg-primary p-input-space text-base font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]   focus:bg-primary focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] "
            >
              Apply Now
            </button>

            <button
              type="button"
              class="flex justify-center items-center rounded  min-w-16 min-h-10 bg-white p-input-space text-base border border-primary font-medium uppercase leading-normal text-primary shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-white hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]   focus:bg-white focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-white active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] "
            >
              External Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
