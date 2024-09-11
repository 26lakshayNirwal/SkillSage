import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };
  const registerNewCompany = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      const res = await axios.post(`${COMPANY_API_END_POINT}/register`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res?.data?.success) {
        console.log(res.data);
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        // const companyId = res?.data?.company?._id;
        navigate(`/admin/companies`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to give your company name? you can change this
            later.
          </p>
        </div>
        <form onSubmit={registerNewCompany}>
          <Label>Company Name</Label>
          <Input
            type="text"
            className="my-2"
            placeholder="JobHunt, Microsoft etc."
            value={input.name}
            onChange={changeEventHandler}
            name="name"
          />
          <Label>Company Logo</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={changeFileHandler}
            className="my-2"
          />
          <Label>Company Website</Label>
          <Input
            type="text"
            className="my-2"
            placeholder="JobHunt, Microsoft etc."
            value={input.website}
            onChange={changeEventHandler}
            name="website"
          />
          <Label>Company Locattion</Label>
          <Input
            type="text"
            className="my-2"
            placeholder="JobHunt, Microsoft etc."
            value={input.location}
            onChange={changeEventHandler}
            name="location"
          />
          <Label>Company Description</Label>
          <textarea
            className="border border-gray-200 rounded-md p-2 w-full"
            rows="5"
            placeholder="Tell us about your company in 50 to 500 words."
            value={input.description}
            onChange={changeEventHandler}
            name="description"
          ></textarea>

          <div className="flex items-center gap-2 my-10">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/companies")}
            >
              Cancel
            </Button>
            <Button type="submit">Continue</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyCreate;
