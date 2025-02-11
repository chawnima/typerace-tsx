import axios from "axios";

export const getSingleRank = ()=>{
    const rankList = axios.get(import.meta.env.VITE_API_URL + "/rank/single");
    return rankList;
}