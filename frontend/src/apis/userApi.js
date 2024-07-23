import useHttpRequest from "../hooks/useHttpRequest";

const UserRequests = () => {
  const { isLoading, sendRequest } = useHttpRequest();

  const getWriterInfo = async (id) => {
    try {
      const result = await sendRequest("GET", `users/get-user/${id}`, null);
      return result;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

  const followWriter = async (id, token) => {
    try {
      const result = await sendRequest("POST", `users/follower/${id}`, null, {
        Authorization: `Bearer ${token}`,
      });
      return result;
    } catch (error) {
      console.error("Error following users:", error);
      throw error;
    }
  };
  const unFollowWriter = async (id, token) => {
    try {
      const result = await sendRequest("DELETE", `users/follower/${id}`, null, {
        Authorization: `Bearer ${token}`,
      });
      return result;
    } catch (error) {
      console.error("Error unfollowing writer:", error);
      throw error;
    }
  };

  return {
    getWriterInfo,
    followWriter,
    unFollowWriter,
    isLoading,
  };
};

export default UserRequests;
