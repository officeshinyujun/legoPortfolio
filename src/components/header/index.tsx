import s from "./index.module.scss";
import {useNavigate} from "react-router-dom";

interface HeaderProps {
    isTurn?: boolean;  // isTurn 상태
    setIsTurn?: (value: boolean) => void;  // setIsTurn setter
    seeTurnButton?: boolean;
}

export default function Header(props: HeaderProps) {
    const {isTurn, setIsTurn, seeTurnButton} = props;  // isTurn과 setIsTurn을 props로 받음
    const navigate = useNavigate();

    const handleNavigate = (road : string) => {
        navigate(`/${road}`);
    }



    return (
        <div className={s.container}>
            <section>
                <p onClick={() => handleNavigate("")} className={s.title}>LEPER</p>
            </section>
            <section className={s.list}>
                <p onClick={() => handleNavigate("woov")}>vinjas</p>
                <p onClick={() => handleNavigate("haed")}>haedam</p>
            </section>
            {seeTurnButton ? (
                <section>
                    <button className={s.button} onClick={() => setIsTurn(!isTurn)}>turning</button>
                </section>
            ) : (
                <div className={s.voidButton}>

                </div>
            )}
        </div>
    );
}
