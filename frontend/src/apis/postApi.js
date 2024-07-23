import useHttpRequest from "../hooks/useHttpRequest";

const PostRequests = () => {
  const { isLoading, sendRequest } = useHttpRequest();

  const getPost = async (postId) => {
    try {
      const result = await sendRequest("GET", `posts/${postId}`);
      return result;
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    }
  };

  const getComments = async (postId) => {
    try {
      const result = await sendRequest("GET", `posts/comments/${postId}`);
      return result;
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    }
  };
  const postComments = async (postId, token, data) => {
    try {
      const result = await sendRequest(
        "POST",
        `posts/comment/${postId}`,
        data,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      return result;
    } catch (error) {
      console.error("Error posting comment:", error);
      throw error;
    }
  };

  const deleteComments = async (id, token, postId) => {
    try {
      const result = await sendRequest(
        "DELETE",
        `posts/comment/${id}/${postId}`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      return result;
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    }
  };
  const updateComment = async (id, token, data) => {
    try {
      const result = await sendRequest("PATCH", `posts/comment/${id}`, data, {
        Authorization: `Bearer ${token}`,
      });
      return result;
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    }
  };

  return {
    getPost,
    getComments,
    postComments,
    deleteComments,
    updateComment,
    isLoading,
  };
};

export default PostRequests;
