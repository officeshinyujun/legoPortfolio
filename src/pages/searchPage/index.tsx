import s from "./index.module.scss"
import Header from "../../components/header";
import { IoMdSearch } from "react-icons/io";
import haed from "../../assets/haed.jpg";
import woov from "../../assets/wov.png"
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import gsap from "gsap";

export default function SearchPage(){
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const list = [
        {id : "oldSkool", img : woov, link : "/woov", explanation : "오래된 신발입니다."},
        {id : "spiderverse modular", img : haed, link : "/haed", explanation : "스파이더버스의 모듈러를 기반으로 만들어봤습니다."},
    ]

    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo(`.${s.titleContainer}`, {duration: 3, x: -200, opacity:0}, {duration:0.7, x: 0, opacity: 1}).fromTo(`.${s.searchContainer}`, {duration: 3, x: -200, opacity:0}, {duration:0.7, x: 0, opacity: 1}).fromTo(`.${s.itemList}`, {duration: 3, x: -200, opacity:0}, {duration:0.7, x: 0, opacity: 1});
    }, []);

    return(
        <div className={s.container}>
            <Header />
            <div className={s.contents}>
                <section className={s.titleContainer}>
                    <p>ARTWORK</p>
                </section>
                <section className={s.searchContainer}>
                    <div className={s.inputContainer}><input placeholder={"Search..."} onChange={(e) => setSearchTerm(e.target.value)}></input>
                        <IoMdSearch size={30} className={s.searchIcon}/>
                    </div>
                    <button onClick={() => {alert("추후 추가 예정입니다.")}}>ADD YOUR ARTWORK</button>
                </section>
                <section className={s.itemList}>
                    {list
                        .filter((item) => item.id.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((item) => (
                            <div
                                style={{ backgroundImage: `url(${item.img})`, backgroundSize: "cover" }}
                                className={s.itemContainer}
                                onClick={() => navigate(`${item.link}`)}
                            >
                                <div className={s.informationSection}>
                                    <p>{item.id}</p>
                                    <span>{item.explanation}</span>
                                </div>
                            </div>
                        ))}
                </section>
            </div>
        </div>
    )
}