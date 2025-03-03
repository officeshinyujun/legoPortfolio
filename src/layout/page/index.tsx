import styles from "./index.module.scss";
import {useEffect, useRef, useState} from "react";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import GlbLoader from "../../components/glbLoader"
import { PerspectiveCamera } from "@react-three/drei";
import ExplanationBox from "../../components/explanationBox";
import Header from "../../components/header";
import loadZipModel from "../../feature/useLoadZip.ts";
import useTheme from "../../feature/useTheme.ts";

interface PageLayoutProps {
    name : string;
    theme : string;
    modelUrl : string;
    title : string;
    explanation : string;
    explainUrl : string;
}

export default function PageLayout(props : PageLayoutProps) {
    const {theme, explainUrl, modelUrl, explanation, title} = props;
    const TitleRef = useRef(null);
    const ModelRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [model, setModel] = useState<any>(null);  // 모델 상태를 초기화.
    const [isTurn, setIsTurn] = useState(false);  // isTurn 상태 추가

    useEffect(() => {
        async function fetchModels() {
            try {
                const hhddModels = await loadZipModel({ modelUrl: modelUrl });
                setModel(hhddModels[0]);  // 모델 배열에서 첫 번째 모델을 사용.
                setIsLoading(true);
            } catch (e) {
                console.log(e);
            }
        }
        fetchModels();
        gsap.fromTo(TitleRef.current, { left: 0 }, { left: '50%', duration: 1 });
        useTheme(theme);
    }, []);

    if (!isLoading) {
        return <div className={styles.loadingContainer}>loading</div>;
    } else {
        return (
            <div className={styles.container}>
                <div className={styles.background}>
                    <Canvas style={{ width: '100%', height: '100%' }} gl={{ preserveDrawingBuffer: true }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[-10, 20, 10]} intensity={1} />
                        {model && <GlbLoader gltfModel={model} scale={100} ref={ModelRef} isTurning={isTurn}/>}
                        <CameraRig />
                    </Canvas>
                </div>
                <p ref={TitleRef} className={styles.title}>{`${title.toUpperCase()}`}</p>
                <Header isTurn={isTurn} setIsTurn={setIsTurn} />
                <div className={styles.overlay}></div>
                <div className={styles.explanationSection}>
                    <ExplanationBox
                        title={title}
                        exploration={explanation}
                        url={explainUrl}
                    />
                </div>
            </div>
        );
    }
}

// 카메라 설정
const CameraRig = () => {
    const cameraRef = useRef(null);
    useEffect(() => {
        if (cameraRef.current) {
            //@ts-ignore
            cameraRef.current.lookAt(0, 30, 0);
        }
    }, []);
    return <PerspectiveCamera ref={cameraRef} makeDefault position={[70, 30, 0]} />;
};
