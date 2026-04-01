"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { House } from "./House";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useEffect, useState, useRef, useImperativeHandle, forwardRef } from "react";
import * as THREE from "three";

const SceneInner = ({ 
  cardMode, 
  targetRotationY, 
  targetScale, 
  cameraRef, 
  controlsRef, 
  houseGroupRef,
  onReady
}: any) => {
  const hasInitialized = useRef(false);

  // Initial imperative setup to match original main.js
  // This avoids React props "fighting" with GSAP animations
  useEffect(() => {
    if (hasInitialized.current) return;

    // Wait until both camera and controls are available
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(50, 20, 50);
      controlsRef.current.target.set(30, 0, 30);
      controlsRef.current.update();
      
      hasInitialized.current = true;
      
      // Signal that the 3D scene is fully initialized and ready for animation
      if (onReady) onReady();
    }
  }); // No dependency array ensures we catch the moment refs mount

  // Use useFrame for smooth lerping (matching original animate loop)
  useFrame(() => {
    // Always update controls if enabled to ensure damping works
    if (controlsRef.current && controlsRef.current.enabled) {
      controlsRef.current.update();

      if (houseGroupRef.current) {
        // Smooth lerp for rotation (Y-axis spin)
        houseGroupRef.current.rotation.y += (targetRotationY - houseGroupRef.current.rotation.y) * 0.05;
        houseGroupRef.current.rotation.z = 0;
        
        // Smooth lerp for scale (dynamic zoom)
        const currentScale = houseGroupRef.current.scale.x;
        const s = currentScale + (targetScale - currentScale) * 0.05;
        houseGroupRef.current.scale.set(s, s, s);
      }
    }
  });

  return (
    <>
      <PerspectiveCamera 
        ref={cameraRef}
        makeDefault 
        fov={75} 
        near={0.1}
        far={1000}
      />
      
      <OrbitControls 
        ref={controlsRef}
        enableDamping
        dampingFactor={0.05}
        enabled={cardMode}
        maxPolarAngle={Math.PI / 2}
        minDistance={5}
        maxDistance={30}
      />

      <fogExp2 attach="fog" args={[0x0a1422, 0.03]} />
      <color attach="background" args={[0x0a1422]} />

      <ambientLight intensity={0.5} color="#f0f8ff" />
      <directionalLight
        position={[15, 8, 10]}
        intensity={2.0}
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-10, 3, 5]} intensity={1.2} color="#ddeeff" />
      <directionalLight position={[0, 4, -15]} intensity={1.5} color="#1E3A5F" />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.5, 0]} receiveShadow>
        <planeGeometry args={[250, 250]} />
        <meshStandardMaterial color={0x050a11} roughness={0.3} metalness={0.2} />
      </mesh>

      <group ref={houseGroupRef}>
        <House />
      </group>
    </>
  );
};

const Scene3D = forwardRef(({ cardMode = false, onReady }: { cardMode?: boolean, onReady?: () => void }, ref) => {
  const [targetRotationY, setTargetRotationY] = useState(0);
  const [targetScale, setTargetScale] = useState(1.1);
  const controlsRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const houseGroupRef = useRef<THREE.Group>(null);

  useImperativeHandle(ref, () => ({
    get camera() { return cameraRef.current; },
    get controls() { return controlsRef.current; },
  }));

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      
      const scrollFraction = scrollY / maxScroll;
      
      // Sublte spin: max 45 degrees (approx 0.8 rad)
      setTargetRotationY(scrollFraction * 0.8);
      
      // Dynamic Zoom: Larger at top (1.1), Smaller at bottom (0.8)
      setTargetScale(1.1 - (scrollFraction * 0.3));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Canvas
      shadows
      dpr={[1, 2]} // Matching devicePixelRatio
      gl={{ 
        antialias: true, 
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.4 
      }}
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
    >
      <SceneInner 
        cardMode={cardMode}
        targetRotationY={targetRotationY}
        targetScale={targetScale}
        cameraRef={cameraRef}
        controlsRef={controlsRef}
        houseGroupRef={houseGroupRef}
        onReady={onReady}
      />
    </Canvas>
  );
});

export default Scene3D;
