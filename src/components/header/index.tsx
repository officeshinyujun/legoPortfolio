import s from "./index.module.scss";
import {useNavigate} from "react-router-dom";

interface HeaderProps {
    isTurn: boolean;  // isTurn 상태
    setIsTurn: (value: boolean) => void;  // setIsTurn setter
}

export default function Header(props: HeaderProps) {
    const {isTurn, setIsTurn} = props;  // isTurn과 setIsTurn을 props로 받음
    const navigate = useNavigate();

    const handleNavigate = (road : string) => {
        navigate(`/${road}`);
    }

    return (
        <div className={s.container}>
            <section className={s.list}>
                <p onClick={() => handleNavigate("")}>main</p>
                <p onClick={() => handleNavigate("woov")}>woovin</p>
                <p onClick={() => handleNavigate("haed")}>haedam</p>
            </section>
            <section>
                <button className={s.button} onClick={() => setIsTurn(!isTurn)}>turning</button>
            </section>
        </div>
    );
}
