import styles from "./index.module.scss";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import JSZip from "jszip"; // ZIP 해제 라이브러리
import GlbLoader from "../../glbLoader";
import { PerspectiveCamera } from "@react-three/drei";
import ExplanationBox from "../../explanationBox";

export default function MainPage() {
    const TitleRef = useRef(null);
    const ModelRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [glbUrl, setGlbUrl] = useState<string | null>(null); // GLB 파일 URL 상태

    // ZIP 파일 로드 및 압축 해제
    useEffect(() => {
        async function loadZipModel() {
            try {
                const response = await fetch("/model/hhdd.zip"); // ZIP 파일 로드
                const blob = await response.blob();
                const zip = await JSZip.loadAsync(blob);

                // .glb 파일 찾기
                const glbFile = Object.keys(zip.files).find(file => file.endsWith(".glb"));
                if (!glbFile) throw new Error("GLB file not found in ZIP");

                // 압축 해제 후 Blob URL 생성
                const glbBlob = await zip.files[glbFile].async("blob");
                const url = URL.createObjectURL(glbBlob);
                setGlbUrl(url);
            } catch (error) {
                console.error("Failed to load ZIP model:", error);
            }
        }

        loadZipModel();
    }, []);

    useEffect(() => {
        gsap.fromTo(TitleRef.current, { left: 0 }, { left: '50%', duration: 1 });
    }, [isLoading]);

    return (
        <div className={styles.container}>
            <div className={styles.background}>
                {isLoading && <div className={styles.loadingContainer}><p>Loading...</p></div>}
                <Canvas style={{ width: '100%', height: '100%' }} gl={{ preserveDrawingBuffer: true }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[-10, 20, 10]} intensity={1} />
                    {glbUrl && <GlbLoader url={glbUrl} scale={100} onLoading={setIsLoading} ref={ModelRef} onClick={() => console.log("asdf")}/>}
                    <CameraRig />
                </Canvas>
            </div>
            {!isLoading && (
                <>
                    <p ref={TitleRef} className={styles.title}>SPIDERVERSE-MODULAR</p>
                    <div className={styles.overlay}></div>
                    <div className={styles.explanationSection}>
                        <ExplanationBox title={"haedam"} exploration={"haedam's ㄴㄹㅇ"} />
                    </div>
                </>
            )}
        </div>
    );
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
