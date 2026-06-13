import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleField({ count = 2000 }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 20 + Math.random() * 30; // Spread out
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      const speed = Math.random() * 0.02 + 0.005;
      temp.push({ x, y, z, speed, theta, phi, r });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const scrollY = window.scrollY || 0;
    
    particles.forEach((p, i) => {
      const currentTheta = p.theta + t * p.speed + (scrollY * 0.001);
      const x = p.r * Math.sin(p.phi) * Math.cos(currentTheta);
      const z = p.r * Math.sin(p.phi) * Math.sin(currentTheta);
      
      dummy.position.set(x, p.y + Math.sin(t + i)*2 + (scrollY * 0.01), z);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, state.mouse.x * 0.2, 0.05);
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, -state.mouse.y * 0.2, 0.05);
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.04, 4, 4]} />
      <meshBasicMaterial color="#00f0ff" transparent opacity={0.6} />
    </instancedMesh>
  );
}

function OrbitalRings() {
  const groupRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const scrollY = window.scrollY || 0;
    
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.5 + 1 + (scrollY * 0.001);
    groupRef.current.rotation.y = t * 0.1 + (scrollY * 0.002);
    groupRef.current.rotation.z = Math.cos(t * 0.1) * 0.2;
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI/2, 0, 0]}>
        <ringGeometry args={[3.5, 3.52, 64]} />
        <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI/2, 0, Math.PI/4]}>
        <ringGeometry args={[4.5, 4.51, 64]} />
        <meshBasicMaterial color="#ff003c" side={THREE.DoubleSide} transparent opacity={0.3} />
      </mesh>
      
      {/* Small orbiting satellites */}
      <mesh position={[3.5, 0, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>
      <mesh position={[-4.5, 0, 0]}>
        <octahedronGeometry args={[0.25]} />
        <meshBasicMaterial color="#ff003c" />
      </mesh>
    </group>
  );
}

function TechCore() {
  const coreRef = useRef();
  const wireframeRef = useRef();
  const groupRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scrollY = window.scrollY || 0;
    
    const scrollRotation = scrollY * 0.005;
    const scrollScale = 1 + (scrollY * 0.001);
    
    coreRef.current.rotation.y = time * 0.2 + scrollRotation;
    coreRef.current.rotation.x = Math.sin(time * 0.5) * 0.2 + scrollRotation * 0.5;
    
    wireframeRef.current.rotation.y = -time * 0.15 - scrollRotation;
    wireframeRef.current.rotation.z = time * 0.1 + scrollRotation;
    
    groupRef.current.scale.lerp(new THREE.Vector3(scrollScale, scrollScale, scrollScale), 0.1);
    
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, state.mouse.y * 1.5 + Math.sin(time)*0.5, 0.05);
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, state.mouse.x * 1.5, 0.05);
  });

  return (
    <group ref={groupRef} position={[2, 0, 0]}>
      <mesh ref={coreRef} scale={1.5}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#0a0a0a" emissive="#00f0ff" emissiveIntensity={0.5} roughness={0.1} metalness={0.8} />
      </mesh>
      
      <mesh ref={wireframeRef} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#00f0ff" wireframe transparent opacity={0.5} />
      </mesh>
      
      <OrbitalRings />
    </group>
  );
}

export default function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={2} color="#00f0ff" />
      <directionalLight position={[-10, -10, -10]} intensity={2} color="#ff003c" />
      
      <TechCore />
      <ParticleField count={2500} />
    </>
  );
}
