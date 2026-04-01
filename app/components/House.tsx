"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export function House() {
  const { scene } = useGLTF("/House.glb");

  useEffect(() => {
    if (scene) {
      scene.traverse((node) => {
        if ((node as THREE.Mesh).isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });
      
      // Center the model
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      scene.position.sub(center);
      scene.position.y += 0.5;
    }
  }, [scene]);

  return (
    <primitive object={scene} />
  );
}

useGLTF.preload("/House.glb");
