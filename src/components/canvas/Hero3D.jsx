"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls, Environment, Float } from '@react-three/drei';
import { useRef } from 'react';

const Particles = () => {
  const mesh = useRef();
  
  useFrame((state) => {
    mesh.current.rotation.x = state.clock.elapsedTime * 0.1;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  return (
    <group ref={mesh}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
};

const FloatingObject = ({ position, color, scale }) => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2} position={position}>
      <mesh scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={color} wireframe />
      </mesh>
    </Float>
  );
};

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#D32F2F" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
        
        <Particles />
        
        <FloatingObject position={[-4, 2, -2]} color="#D32F2F" scale={1.5} />
        <FloatingObject position={[4, -2, -4]} color="#ffffff" scale={1} />
        <FloatingObject position={[0, -4, -6]} color="#D32F2F" scale={2} />
        
        <Environment preset="city" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
