import styles from "./index.module.scss"

interface ExplorationBoxProps {
    title : string,
    exploration : string,
    ref ?: any,
    backGround ?: string,
    url ?: string,
}

export default function ExplanationBox(props: ExplorationBoxProps) {
    const { title, exploration, ref, backGround, url } = props;

    return (
        <div className={styles.container} ref={ref} style={{background:`${backGround}`}}>
            <p className={styles.title}>{title}</p>
            <p>{exploration}</p>
            <a href={`${url}`} className={styles.url}>
                <img src={"/btn_naver.svg"} alt={"naver"} width={30}></img>
            </a>
        </div>
    )
}