import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CheckIcon, MoreHorizontal, XIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const ApplicantsTable = () => {
  const shortlistingStatus = ["Accepted", "Rejected"];
  const { applicants } = useSelector((store) => store.application);
  const statusHandler = async (status, id) => {
    console.log("called");
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      //   toast.error(error.response.data.message);
    }
  };
  //   const applicants = {
  //     applications: [
  //       {
  //         _id: "1",
  //         applicant: {
  //           fullname: "Aryanshi Love",
  //           email: "aryanshi@aryanshi.com",
  //           phoneNumber: "1234567890",
  //           profile: {
  //             resume: "https://www.google.com",
  //             resumeOriginalName: "Resume.pdf",
  //           },
  //           createdAt: "2021-08-05T00:00:00",
  //         },
  //       },
  //       {
  //         _id: "2",
  //         applicant: {
  //           fullname: "LoveAryanshi",
  //           email: "aryanshilove@aryanshi.com",
  //           phoneNumber: "1234567890",
  //           profile: {
  //             resume: "",
  //             resumeOriginalName: "",
  //           },
  //           createdAt: "2021-08-05T00:00:00",
  //         },
  //       },
  //     ],
  //   };
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map((item) => (
              <tr key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>

                <TableCell>
                  <a href={`mailto:${item?.applicant?.email}`}>
                    {item?.applicant?.email}
                  </a>
                </TableCell>

                <TableCell>
                  <a href={`tel:+91${item?.applicant?.phoneNumber}`}>
                    {item?.applicant?.phoneNumber}
                  </a>
                </TableCell>
                <TableCell>
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 cursor-pointer"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                <TableCell className="float-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortlistingStatus.map((status, index) => {
                        return (
                          <div
                            onClick={() => statusHandler(status, item?._id)}
                            key={index}
                            className="flex w-fit items-center my-2 cursor-pointer"
                          >
                            <span>{status}</span>
                            {status === "Rejected" ? (
                              <XIcon className="stroke-red-600" />
                            ) : (
                              <CheckIcon className="stroke-green-600" />
                            )}
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
