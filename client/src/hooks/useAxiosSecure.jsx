import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";
import toast from "react-hot-toast";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { handleSingOut } = useAuth();

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      async (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          handleSingOut();
          toast.error(error.response.data.message);
          navigate("/signIn");
        }
      }
    );
  }, [handleSingOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
