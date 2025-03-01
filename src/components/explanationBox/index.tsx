import styles from "./index.module.scss"

interface ExplorationBoxProps {
    title : string,
    exploration : string,
    ref ?: any,
    backGrond ?: string,
}

export default function ExplanationBox(props: ExplorationBoxProps) {
    const { title, exploration, ref, backGrond } = props;

    return (
        <div className={styles.container} ref={ref} style={{background:`${backGrond}`}}>
            <p className={styles.title}>{title}</p>
            <p>{exploration}</p>
            <div>

            </div>
        </div>
    )
}