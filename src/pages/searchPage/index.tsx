import s from "./index.module.scss"
import Header from "../../components/header";
import { IoMdSearch } from "react-icons/io";
import haed from "../../assets/haed.jpg";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import gsap from "gsap";

export default function SearchPage(){

    const navigate = useNavigate();

    const list = [
        {id : "haedam choi [spiderverse modular]", img : haed, link : "/haed", title : "asdf", explanation : "asdfasdf"},
        {id : "haedam choi [spiderverse modular]", img : haed, link : "/haed", title : "asdf", explanation : "asdfasdf"},
        {id : "haedam choi [spiderverse modular]", img : haed, link : "/haed", title : "asdf", explanation : "asdfasdf"},
        {id : "haedam choi [spiderverse modular]", img : haed, link : "/haed", title : "asdf", explanation : "asdfasdf"},
        {id : "haedam choi [spiderverse modular]", img : haed, link : "/haed", title : "asdf", explanation : "asdfasdf"},
        {id : "haedam choi [spiderverse modular]", img : haed, link : "/haed", title : "asdf", explanation : "asdfasdf"},
        {id : "haedam choi [spiderverse modular]", img : haed, link : "/haed", title : "asdf", explanation : "asdfasdf"},
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
                    <div className={s.inputContainer}>
                        <input placeholder={"test.."}></input>
                        <IoMdSearch size={30} className={s.searchIcon}/>
                    </div>
                    <button>ADD YOUR ARTWORK</button>
                </section>
                <section className={s.itemList}>
                    {list.map((item) => (
                        <div style={{ backgroundImage: `url(${item.img})`, backgroundSize: 'cover'}} className={s.itemContainer} onClick={() => navigate(`${item.link}`)}>
                            <div className={s.informationSection}>
                                <p>{item.title}</p>
                                <span>{item.explanation}</span>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    )
}