import s from "./index.module.scss"
import Header from "../../components/header";
import ProductItem from "../../components/productItem";
import haed from "../../assets/haed.jpg"
import woov from "../../assets/wov.png"

export default function WelcomePage(){

    const list = [
        {id : "haedam choi [spiderverse modular]", img : haed, link : "haed"},
        {id : "vinjas [Vans]", img: woov, link : "woov"},
    ]

    return(
        <div className={s.container}>
            <Header seeTurnButton={false}/>
            <div className={s.welcomeBox}>
                <p className={s.title}>LEPER</p>
                <p className={s.exp}>여러분의 레고를 웹페이지에서</p>
                {list.map((item) => (
                    <ProductItem title={item.id} backImage={item.img} link={item.link}/>
                ))}
            </div>
        </div>
    )
}