import React from 'react';
import { Float, Sphere, Box, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShapes = () => {
  return (
    <group>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Sphere position={[4, 2, -2]} args={[0.5, 32, 32]}>
          <meshStandardMaterial
            color="#60a5fa"
            transparent
            opacity={0.6}
            roughness={0.1}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <Box position={[-4, -1, -1]} args={[0.8, 0.8, 0.8]}>
          <meshStandardMaterial
            color="#a855f7"
            transparent
            opacity={0.7}
            roughness={0.2}
            metalness={0.6}
          />
        </Box>
      </Float>

      <Float speed={1.8} rotationIntensity={2} floatIntensity={1}>
        <Octahedron position={[2, -3, 1]} args={[0.6]}>
          <meshStandardMaterial
            color="#06b6d4"
            transparent
            opacity={0.8}
            roughness={0.1}
            metalness={0.9}
          />
        </Octahedron>
      </Float>

      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={2.5}>
        <Sphere position={[-2, 3, 0]} args={[0.4, 16, 16]}>
          <meshStandardMaterial
            color="#f59e0b"
            transparent
            opacity={0.6}
            roughness={0.3}
            metalness={0.7}
          />
        </Sphere>
      </Float>

      <Float speed={2.5} rotationIntensity={1} floatIntensity={1.8}>
        <Box position={[3, 1, 2]} args={[0.6, 0.6, 0.6]}>
          <meshStandardMaterial
            color="#ec4899"
            transparent
            opacity={0.7}
            roughness={0.2}
            metalness={0.8}
          />
        </Box>
      </Float>
    </group>
  );
};

export default FloatingShapes;
