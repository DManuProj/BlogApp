import { useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const useHttpRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (
      method,
      url,
      data = null,
      headers = { "Content-Type": "application/json" },
      config
    ) => {
      console.log("mehtod: " + method, "url", "data:" + data);
      const API = `http://localhost:5000/${url}`;

      setIsLoading(true);
      setError(null);

      try {
        const response = await axios({
          method,
          url: API,
          data,
          headers,
          ...config,
        });
        response.data.message && toast.success(response.data.message);

        console.log("response data", response.data);

        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        setError(errorMessage);
        toast.error(errorMessage);

        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { isLoading, error, sendRequest };
};

export default useHttpRequest;
