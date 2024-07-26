import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useHttpRequest from "./useHttpRequest";
import { updateURL } from "../util";
import { toast } from "react-hot-toast";

export const usePost = ({ writerId }) => {
  const { isLoading, sendRequest } = useHttpRequest();

  const location = useLocation();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [category, setCategory] = useState(searchParams.get("cat") || "");

  const [posts, setPosts] = useState([]);
  const [numOfPages, setNumOfPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      updateURL({ page, navigate, location, cat: category });

      try {
        const result = await sendRequest(
          "GET",
          `posts?cat=${category}&page=${page}&writerId=${writerId || ""}`
        );
        if (result.success) {
          setPosts(result.data || []);
          setNumOfPages(result.numOfPage);
        }
      } catch (error) {
        toast.error("Something went wrong");
        const err = error.response.data || error.response;
        console.log(err);
      }
    };

    fetchPosts();
  }, [page, writerId]);

  return { page, posts, numOfPages, setPage, isLoading };
};

export const usePopularPosts = () => {
  const [popularPosts, setPopularPosts] = useState([]);
  const { isLoading, sendRequest } = useHttpRequest();

  useEffect(() => {
    const fetchPopularPosts = async () => {
      try {
        const result = await sendRequest("GET", "posts/popular");

        if (result.success) {
          setPopularPosts(result.data.posts);
        }
      } catch (error) {
        toast.error("Something went wrong");
        const err = error.response.data || error.response;
        console.log(err);
      }
    };
    fetchPopularPosts();
  }, []);

  return { popularPosts, isLoading };
};
