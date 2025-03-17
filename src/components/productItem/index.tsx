import s from "./index.module.scss"
import {useNavigate} from "react-router-dom";

interface ProductItemProps {
    title: string,
    backImage: any,
    link : string
}

export default function ProductItem({ title, backImage , link}: ProductItemProps) {
    const navigate = useNavigate()

    return(
        <div className={s.container} onClick={() => navigate(link)}>
            <img src={backImage}/>
            <p>{title}</p>
        </div>
    )
}