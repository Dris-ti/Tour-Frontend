"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import axios from "axios";

interface Props {
  password: string;
  cnpassword: string;
  router: AppRouterInstance;
}

const SearchParamHandler = ({ password, cnpassword, router }: Props) => {
  const searchParams = useSearchParams();

  const changePassword = async () => {
    if (password !== cnpassword) {
      alert("Passwords do not match.");
      return;
    }

    const token = searchParams.get("token");

    if (!token) {
      alert("Token is missing.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/authentication/forgetPassword`,
        { token, newPassword: password },
        { withCredentials: true }
      );

      if (response.status === 201) {
        alert("Password changed successfully.");
        router.push("../Login");
      }
    } catch (error) {
      alert(`Error occurred: ${error}`);
    }
  };

  return (
    <button
      type="button"
      onClick={changePassword}
      className="px-14 py-1 mt-10 text-2xl focus:outline-none text-white bg-green-900 rounded-3xl tracking-[2px] hover:bg-teal-400 focus:ring-4 focus:ring-green-300 transition-colors duration-200 max-md:px-4 max-md:mt-8"
    >
      Save
    </button>
  );
};

export default SearchParamHandler;
