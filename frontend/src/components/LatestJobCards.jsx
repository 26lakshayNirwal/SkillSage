import React from "react";
import { Badge } from "./ui/badge";

const LatestJobCards = ({ job }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="ml-3">
            <h1 className="text-lg font-semibold">{job?.title}</h1>
            <p className="text-sm text-gray-500">{job?.company?.name}</p>
          </div>
        </div>
        <button className="bg-[#6A38C2] text-white px-4 py-1 rounded-md">
          Apply
        </button>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.position}
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          {job?.salary}
        </Badge>
      </div>
    </div>
  );
};
export default LatestJobCards;
