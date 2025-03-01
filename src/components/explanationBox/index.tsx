import styles from "./index.module.scss"

interface ExplorationBoxProps {
    title : string,
    exploration : string,
    ref ?: any
}

export default function ExplanationBox(props: ExplorationBoxProps) {
    const { title, exploration, ref } = props;

    return (
        <div className={styles.container} ref={ref}>
            <p>{title}</p>
            <p>{exploration}</p>
        </div>
    )
}