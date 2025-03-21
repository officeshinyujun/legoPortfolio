import s from "./index.module.scss";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

interface HeaderProps {
    isTurn?: boolean;
    setIsTurn?: (value: boolean) => void;
    seeTurnButton?: boolean;
    isAnimate?: boolean;
}

export default function Header(props: HeaderProps) {
    const {isTurn, setIsTurn, seeTurnButton, isAnimate} = props;
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    const handleNavigate = (road: string) => {
        navigate(`/${road}`);
    };

    if (isAnimate){
        return (
            <>
                {/* 헤더가 나타나는 트리거 영역 (보이지 않지만 마우스를 감지) */}
                <div
                    className={s.hoverArea}
                    onMouseOver={() => setIsVisible(true)}
                    onMouseOut={() => setIsVisible(false)}
                ></div>

                {/* 실제 헤더 */}
                <div
                    className={`${s.container} ${isVisible ? s.visible : ""}`}
                    onMouseOver={() => setIsVisible(true)}
                    onMouseOut={() => setIsVisible(false)}
                >
                    <section>
                        <p onClick={() => handleNavigate("")} className={s.title}>LEFA</p>
                    </section>
                    {seeTurnButton ? (
                        <section>
                            <button className={s.button} onClick={() => setIsTurn?.(!isTurn)}>turning</button>
                        </section>
                    ) : (
                        <div className={s.voidButton}></div>
                    )}
                </div>
            </>
        );
    } else {
        return(
            <>
                <div
                    className={s.fixContainer}
                >
                    <section>
                        <p onClick={() => handleNavigate("")} className={s.title}>LEFA</p>
                    </section>
                    {seeTurnButton ? (
                        <section>
                            <button className={s.button} onClick={() => setIsTurn?.(!isTurn)}>turning</button>
                        </section>
                    ) : (
                        <div className={s.voidButton}></div>
                    )}
                </div>
            </>
        )
    }

}
