"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function WavyProfileImage({ position, scale }) {
  const mesh = useRef();
  const material = useRef();
  const scroll = useScroll();
  const texture = useTexture('/profile.jpg');
  texture.colorSpace = THREE.SRGBColorSpace; // Ensure colors are bright and proper

  // Custom shader for the wave reveal effect
  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uReveal: { value: 0 },
    }),
    [texture]
  );

  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Calculate a reveal value based on scroll position
      // It is placed at the end (page 5). fully reveal by offset 0.95
      const revealProgress = Math.max(0, Math.min(1, (scroll.offset - 0.8) * 10));
      
      // Smoothly interpolate the reveal uniform
      material.current.uniforms.uReveal.value = THREE.MathUtils.lerp(
        material.current.uniforms.uReveal.value,
        revealProgress,
        0.1
      );
    }
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      {/* Aspect ratio roughly matches portrait image (e.g. 1 : 1.3) */}
      <planeGeometry args={[1, 1.3, 32, 32]} />
      <shaderMaterial
        ref={material}
        transparent
        side={THREE.DoubleSide}
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          uniform float uReveal;
          varying vec2 vUv;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            // When uReveal == 1.0, waveIntensity is exactly 0.0
            float waveIntensity = 1.0 - smoothstep(0.0, 1.0, uReveal);
            
            // Create small high-frequency ripples
            float wave = sin(pos.x * 20.0 + uTime * 4.0) * cos(pos.y * 20.0 + uTime * 3.0) * 0.05;
            
            // Apply small wave to Z axis (depth)
            pos.z += wave * waveIntensity;
            
            // Small subtle wobble on X and Y to simulate water/fluid
            pos.x += sin(uTime * 2.0 + pos.y * 15.0) * waveIntensity * 0.02;
            pos.y += cos(uTime * 2.0 + pos.x * 15.0) * waveIntensity * 0.02;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform sampler2D uTexture;
          uniform float uReveal;
          varying vec2 vUv;
          
          void main() {
            vec4 texColor = texture2D(uTexture, vUv);
            
            // Simple opacity fade based on reveal progress
            float alpha = smoothstep(0.0, 0.8, uReveal);
            
            // When uReveal is exactly 1, guarantee no transparency loss
            if (uReveal > 0.99) {
              alpha = 1.0;
            }
            
            gl_FragColor = vec4(texColor.rgb, texColor.a * alpha);
          }
        `}
      />
    </mesh>
  );
}
