'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from './theme-provider';

interface NeuronNode {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  connections: number[];
}

function NeuronNetwork() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  
  const nodeCount = 50;
  const maxDistance = 3;
  
  const nodes = useMemo<NeuronNode[]>(() => {
    return Array.from({ length: nodeCount }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      ),
      connections: [],
    }));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !linesRef.current) return;

    const time = state.clock.getElapsedTime();
    const matrix = new THREE.Matrix4();
    const positions: number[] = [];

    // Update node positions and create instances
    nodes.forEach((node, i) => {
      // Apply velocity
      node.position.add(node.velocity);

      // Bounce off boundaries
      ['x', 'y', 'z'].forEach((axis) => {
        const limit = axis === 'z' ? 5 : 10;
        if (Math.abs(node.position[axis as 'x' | 'y' | 'z']) > limit) {
          node.velocity[axis as 'x' | 'y' | 'z'] *= -1;
        }
      });

      // Mouse interaction
      const mouseInfluence = new THREE.Vector2(mousePos.current.x * 5, mousePos.current.y * 5);
      const distance = Math.sqrt(
        Math.pow(node.position.x - mouseInfluence.x, 2) + 
        Math.pow(node.position.y - mouseInfluence.y, 2)
      );
      
      if (distance < 3) {
        const force = (3 - distance) * 0.01;
        node.velocity.x += (node.position.x - mouseInfluence.x) * force;
        node.velocity.y += (node.position.y - mouseInfluence.y) * force;
      }

      // Create instance matrix
      matrix.setPosition(node.position);
      const scale = 0.05 + Math.sin(time + i) * 0.02;
      matrix.scale(new THREE.Vector3(scale, scale, scale));
      meshRef.current!.setMatrixAt(i, matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;

    // Find connections and create lines
    nodes.forEach((node, i) => {
      node.connections = [];
      nodes.forEach((otherNode, j) => {
        if (i !== j) {
          const dist = node.position.distanceTo(otherNode.position);
          if (dist < maxDistance) {
            positions.push(node.position.x, node.position.y, node.position.z);
            positions.push(otherNode.position.x, otherNode.position.y, otherNode.position.z);
          }
        }
      });
    });

    // Update line geometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    linesRef.current.geometry.dispose();
    linesRef.current.geometry = geometry;
  });

  return (
    <>
      <instancedMesh ref={meshRef} args={[undefined, undefined, nodeCount]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#8a2be2" toneMapped={false} />
      </instancedMesh>
      
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#8a2be2" transparent opacity={0.3} />
      </lineSegments>
      
      {/* Ambient particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={200}
            array={new Float32Array(
              Array.from({ length: 200 * 3 }, () => (Math.random() - 0.5) * 30)
            )}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#00ffff"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    </>
  );
}

export function NeuronBackground() {
  const { theme } = useTheme();
  
  if (theme === 'bright') {
    return null; // No background animation in bright mode
  }

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        className="opacity-40"
      >
        <color attach="background" args={['#0a0015']} />
        <NeuronNetwork />
      </Canvas>
    </div>
  );
}

