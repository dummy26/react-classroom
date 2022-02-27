import { useQuery } from "react-query";
import { api } from "../../api/api";


const getClassroom = async (code) => {
    const { data } = await api.get(`/classes/${code}`)
    return data
}

export default function useClassroom(code) {
    return useQuery(['classroom', code], () => getClassroom(code))
}