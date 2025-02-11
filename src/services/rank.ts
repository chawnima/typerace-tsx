import axios from "axios";
export const getSingleRank = () => {
  const rankList = axios
    .get(`${import.meta.env.VITE_API_URL}/rank/single`)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
  return rankList;
};

export const postSingleRank = (username: string, wpm: number) => {
  const postRank = axios
    .post(`${import.meta.env.VITE_API_URL}/rank/single`, {
      username,
      wpm,
    })
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
  return postRank;
};
