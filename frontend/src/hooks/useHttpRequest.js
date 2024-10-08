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
      data,
      headers = { "Content-Type": "application/json" },
      config
    ) => {
      const API = `http://13.201.75.91/api/${url}`;

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

        return response.data;
      } catch (error) {
        const errorMessage = error.data?.message || "Something went wrong!";
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
