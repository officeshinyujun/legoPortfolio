import styles from "./index.module.scss";
import {useEffect, useRef, useState} from "react";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import GlbLoader from "../../components/glbLoader"
import { PerspectiveCamera } from "@react-three/drei";
import ExplanationBox from "../../components/explanationBox";
import Header from "../../components/header";
import loadZipModel from "../../feature/useLoadZip.ts";

export default function HaedPage() {
    const TitleRef = useRef(null);
    const ModelRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [model, setModel] = useState<any>(null);  // 모델 상태를 초기화.
    const [isTurn, setIsTurn] = useState(false);  // isTurn 상태 추가

    useEffect(() => {
        async function fetchModels() {
            try {
                const hhddModels = await loadZipModel({ modelUrl: "/model/hhdd.zip" });
                setModel(hhddModels[0]);  // 모델 배열에서 첫 번째 모델을 사용.
                setIsLoading(true);
            } catch (e) {
                console.log(e);
            }
        }
        fetchModels();
        gsap.fromTo(TitleRef.current, { left: 0 }, { left: '50%', duration: 1 });
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
                        {model && <GlbLoader gltfModel={model} scale={100} ref={ModelRef} isTurning={isTurn} rotation={0.37} />}
                        <CameraRig />
                    </Canvas>
                </div>
                <p ref={TitleRef} className={styles.title}>SPIDERVERSE-MODULAR</p>
                <Header isTurn={isTurn} setIsTurn={setIsTurn} /> {/* Header에 상태와 setter 전달 */}
                <div className={styles.overlay}></div>
                <div className={styles.explanationSection}>
                    <ExplanationBox
                        title={"spiderverse-modular"}
                        exploration={"스파이더버스 모듈러는 모든 스파이더맨 세계관의 캐릭터들을 총집합한 컨셉의 작품입니다.\n" +
                            "건물 자체는 피터 파커의 아파트로 컨셉을 잡았으며, 그 외에 지하철역과 지하철, 경찰차 및 페니파커의 Sp//dr과 함께 여러가지 미니피겨들도 구성되어 있는 작품입니다.\n" +
                            "작품 곳곳에 숨겨진 이스터에그나 기믹을 찾는 재미가 있는 작품입니다."}
                        url={"https://cafe.naver.com/legolateautumn?iframe_url_utf8=%2FArticleRead.nhn%253Fclubid%3D30794520%2526articleid%3D10419"}
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
