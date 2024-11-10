import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  job = {
    _id: "1",
    title: "Software Developer",
    company: {
      name: "Google",
      description:
        "Google is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, a search engine, cloud computing, software, and hardware.",
    },
    position: "Full Time",
    jobType: "Remote",

    salary: "1000$",
  };
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="bg-white shadow-md p-4 rounded-md cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="ml-3">
            <h1 className="text-lg font-semibold">{job?.title}</h1>
            <p className="text-sm text-gray-500">{job?.company?.name}</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">{job?.company?.description}</p>
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
