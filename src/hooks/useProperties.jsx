// useProperties.jsx
import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "./usePublicAxios";

const useProperties = () => {
    const axiosPublic = usePublicAxios();

    const { data: property = [], refetch } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const res = await axiosPublic.get('/properties');
            return res.data;
        }
    });

    return [property, refetch];
};

export default useProperties;
