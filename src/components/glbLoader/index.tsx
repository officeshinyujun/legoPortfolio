import { useEffect } from "react";
import { useFrame } from '@react-three/fiber';
import { MeshPhysicalMaterial } from 'three';
import * as THREE from 'three';

interface GLBModelProps {
    ref: any;
    scale?: number;
    color?: string;
    metalness?: number;
    roughness?: number;
    clearcoat?: number;
    transmission?: number;
    clearcoatRoughness?: number;
    sheen?: number;
    onClick?: () => void;
    isTurning?: boolean;
    gltfModel ?: any
}

export default function GLBModel(props: GLBModelProps) {
    const {
        scale = 1,
        color,
        metalness = 0.05,
        roughness = 0.75,
        clearcoat = 0.0,
        transmission = 0.0,
        clearcoatRoughness = 0.2,
        sheen = 0.0,
        ref,
        onClick,
        isTurning,
        gltfModel
    } = props;

    const gltf = gltfModel;

    useEffect(() => {
        if (gltf) {
            //@ts-ignore
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

    useEffect(() => {
        handleSizeCheck();
        window.addEventListener("resize", handleSizeCheck);
        return () => window.removeEventListener("resize", handleSizeCheck);
    }, []);

    useEffect(() => {
        handleSizeCheck();
    }, [scale]);

    // Always call useFrame, manage the logic inside the callback
    useFrame((_, delta) => {
        if (isTurning && ref.current) {
            ref.current.rotation.y += 0.5 * delta;
        }
    });

    const handleSizeCheck = () => {
        if (window.document.documentElement.clientWidth <= 500) {
            ref.current.scale.set(scale * 0.75, scale * 0.75, scale * 0.75);
        } else {
            ref.current.scale.set(scale, scale, scale);
        }
    };

    return <primitive object={gltf.scene} ref={ref} onClick={onClick} />;
};
