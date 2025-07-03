"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { Float } from "@react-three/drei";

export const DevObjects = () => {
  const sphereRef = useRef<Mesh>(null);
  const torusRef = useRef<Mesh>(null);
  const octahedronRef = useRef<Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(time * 0.5) * 0.5;
      sphereRef.current.rotation.x = time * 0.3;
      sphereRef.current.rotation.y = time * 0.2;
    }

    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.2;
      torusRef.current.rotation.y = time * 0.3;
    }

    if (octahedronRef.current) {
      octahedronRef.current.position.y = Math.cos(time * 0.5) * 0.5;
      octahedronRef.current.rotation.x = time * 0.4;
      octahedronRef.current.rotation.y = time * 0.3;
    }
  });

  return (
    <group>
      {/* Sphere centrale */}
      <Float
        speed={1.5}
        rotationIntensity={0.5}
        floatIntensity={0.5}
      >
        <mesh ref={sphereRef} position={[0, 0, 0]}>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshStandardMaterial
            color="#0099cc"
            metalness={0.7}
            roughness={0.2}
            emissive="#003B5C"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>

      {/* Torus orbitant */}
      <Float
        speed={2}
        rotationIntensity={1}
        floatIntensity={0.5}
      >
        <mesh ref={torusRef} position={[2, 0, -2]}>
          <torusGeometry args={[0.8, 0.2, 16, 32]} />
          <meshStandardMaterial
            color="#00b3e6"
            metalness={0.8}
            roughness={0.2}
            emissive="#0099cc"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      {/* Octaèdre orbitant */}
      <Float
        speed={1.8}
        rotationIntensity={0.8}
        floatIntensity={0.5}
      >
        <mesh ref={octahedronRef} position={[-2, 0, -1]}>
          <octahedronGeometry args={[0.8]} />
          <meshStandardMaterial
            color="#E6F7FF"
            metalness={0.9}
            roughness={0.1}
            emissive="#0099cc"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>

      {/* Particules d'ambiance */}
      {Array.from({ length: 50 }).map((_, i) => (
        <Float
          key={i}
          speed={Math.random() * 2 + 0.5}
          rotationIntensity={Math.random()}
          floatIntensity={Math.random() * 0.5}
        >
          <mesh
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10
            ]}
          >
            <sphereGeometry args={[0.05]} />
            <meshStandardMaterial
              color="#0099cc"
              emissive="#0099cc"
              emissiveIntensity={1}
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}; 