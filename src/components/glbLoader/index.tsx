import { useState, useRef, useEffect } from "react";
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshPhysicalMaterial } from 'three';
import * as THREE from 'three';

interface GLBModelProps {
    url: string;
    scale?: number;
    color?: string;
    metalness?: number;
    roughness?: number;
    clearcoat?: number;
    transmission?: number;
    clearcoatRoughness?: number;
    sheen?: number;
    onLoading?: (loading: boolean) => void; // 로딩 상태 변경을 위한 콜백 추가
}

export default function GLBModel({
                      url,
                      scale = 1,
                      color,
                      metalness = 0.05,
                      roughness = 0.75,
                      clearcoat = 0.0,
                      transmission = 0.0,
                      clearcoatRoughness = 0.2,
                      sheen = 0.0,
                      onLoading
                  }: GLBModelProps){
    const gltf = useLoader(GLTFLoader, url, (loader) => {
        loader.manager.onLoad = () => onLoading(false); // 로딩 완료 시 상위에서 설정한 콜백 호출
    });
    const modelRef = useRef(null);

    useEffect(() => {
        if (gltf) {
            gltf.scene.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    const mesh = child as THREE.Mesh;
                    if (mesh.material) {
                        if (Array.isArray(mesh.material)) {
                            mesh.material.forEach((mat) => {
                                if (mat instanceof MeshPhysicalMaterial) {
                                    mat.metalness = metalness;
                                    mat.roughness = roughness;
                                    mat.clearcoat = clearcoat;
                                    mat.transmission = transmission;
                                    mat.clearcoatRoughness = clearcoatRoughness;
                                    mat.sheen = sheen;
                                    mat.transparent = false;
                                    if (color) mat.color.set(color);
                                }
                            });
                        } else if (mesh.material instanceof MeshPhysicalMaterial) {
                            mesh.material.metalness = metalness;
                            mesh.material.roughness = roughness;
                            mesh.material.clearcoat = clearcoat;
                            mesh.material.transmission = transmission;
                            mesh.material.clearcoatRoughness = clearcoatRoughness;
                            mesh.material.sheen = sheen;
                            mesh.material.transparent = false;
                            if (color) mesh.material.color.set(color);
                        }
                    }
                }
            });
        }
    }, [gltf, color, metalness, roughness, clearcoat, transmission, clearcoatRoughness, sheen]);

    useFrame((_, delta) => {
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.5 * delta;
        }
    });

    return <primitive object={gltf.scene} scale={scale} ref={modelRef} />;
};