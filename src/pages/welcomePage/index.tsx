import s from "./index.module.scss"
import ProductItem from "../../components/productItem";
import haed from "../../assets/haed.jpg"
import woov from "../../assets/wov.png"
import backss from "../../assets/backss.svg"
import Marquee from "react-fast-marquee";

export default function WelcomePage(){

    const list = [
        {id : "haedam choi [spiderverse modular]", img : haed, link : "haed"},
        {id : "vinjas [Vans]", img: woov, link : "woov"},
        {id : "vinjas [Vans]", img: woov, link : "woov"},
        {id : "vinjas [Vans]", img: woov, link : "woov"},
        {id : "vinjas [Vans]", img: woov, link : "woov"},
        {id : "vinjas [Vans]", img: woov, link : "woov"},
        {id : "vinjas [Vans]", img: woov, link : "woov"},
    ]

    return(
        <div className={s.container}>
            <div className={s.header}>
                <div className={s.titleSection}>
                    <p className={s.title}>LEFA</p>
                    <span>여러분의 작품을 웹페이지에서</span>
                </div>
                <img src={backss}/>
            </div>
            <div className={s.footer}>
                <div className={s.footerTopSection}>
                    <div className={s.footerTitleSection}>
                        <p>LEFA</p>
                        <span>여러분의 작품을 편하게 웹페이지에서 만나보세요</span>
                    </div>
                    <div className={s.button}>
                        보러가기
                    </div>
                </div>
                <Marquee gradient={false} speed={40} className={s.marqueeContainer} style={{padding:"20px 0"}}>
                    {list.map((item) => (
                        <div style={{padding:"0 20px"}}>
                            <ProductItem title={item.id} backImage={item.img} link={item.link}/>
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    )
}