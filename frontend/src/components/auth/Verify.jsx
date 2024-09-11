import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const Verify = () => {
  const verificationCode = {
    verifyToken: "",
  };
  const params = useParams();
  const navigate = useNavigate();
  const handleVerificationCodeChange = (e) => {
    verificationCode.verifyToken = e.target.value;
  };
  //   console.log(verificationCode);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `${USER_API_END_POINT}/verify/${params.id}`,
      verificationCode,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (res.data.success) {
      navigate(`/login`);
      toast.success(res.data.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">
        Verify Your Email For Further Work
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label htmlFor="verificationCode" className="mb-2">
          Verification Code:
        </label>
        <input
          type="text"
          id="verificationCode"
          className="border border-gray-300 rounded-md px-3 py-2 mb-2"
          onChange={handleVerificationCodeChange}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Verify;
