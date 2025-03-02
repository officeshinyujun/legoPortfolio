import JSZip from "jszip";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface LoadZipProps {
    modelUrl: string;
}

async function loadZipModel({ modelUrl }: LoadZipProps) {
    try {
        const response = await fetch(modelUrl);
        const blob = await response.blob();
        const zip = await JSZip.loadAsync(blob);

        // .glb 파일 찾기
        const glbFiles = Object.keys(zip.files).filter(file => file.endsWith(".glb"));
        if (glbFiles.length === 0) throw new Error("GLB files not found in ZIP");

        const gltfModels = await Promise.all(
            glbFiles.map(async (glbFile) => {
                const glbBlob = await zip.files[glbFile].async("blob");

                // GLTFLoader 로 .glb 파일을 로드하여 파싱
                const url = URL.createObjectURL(glbBlob);
                const loader = new GLTFLoader();
                return new Promise<any>((resolve, reject) => {
                    loader.load(
                        url,
                        (gltf) => resolve(gltf),
                        undefined,
                        (error) => reject(error)
                    );
                });
            })
        );

        return gltfModels;
    } catch (error) {
        console.error("Failed to load ZIP model:", error);
        throw error;
    }
}

export default loadZipModel;
