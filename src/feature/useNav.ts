import {useNavigate} from "react-router-dom";

export default function useNav(link : string){
    const navigate = useNavigate();
    return () => navigate(link)
}