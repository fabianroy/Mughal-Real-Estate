import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://mughal-server.vercel.app',
});

const usePublicAxios = () => {
    return axiosPublic;
};

export default usePublicAxios;