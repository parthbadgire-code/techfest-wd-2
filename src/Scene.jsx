import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Stars, Text, MeshDistortMaterial, Sparkles, Ring, TorusKnot, Icosahedron } from '@react-three/drei';
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
      // Swirling galaxy effect with scroll impact
      const currentTheta = p.theta + t * p.speed + (scrollY * 0.001);
      const x = p.r * Math.sin(p.phi) * Math.cos(currentTheta);
      const z = p.r * Math.sin(p.phi) * Math.sin(currentTheta);
      
      dummy.position.set(x, p.y + Math.sin(t + i)*2 + (scrollY * 0.01), z);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    
    // Global mouse tracking
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

function InteractiveMesh({ children, position, scale = 1 }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  useFrame((state, delta) => {
    const targetScale = hovered ? scale * 1.5 : scale;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    
    if (clicked) {
      meshRef.current.rotation.x += 10 * delta;
      meshRef.current.rotation.y += 10 * delta;
      if (meshRef.current.rotation.x > Math.PI * 4) setClicked(false);
    }
  });

  return (
    <group 
      ref={meshRef} 
      position={position}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      onClick={(e) => { e.stopPropagation(); setClicked(true); }}
    >
      {children}
    </group>
  );
}

function FloatingAsteroids() {
  const group = useRef();
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const scrollY = window.scrollY || 0;
    
    group.current.rotation.y = t * 0.05 + (scrollY * 0.002);
    group.current.rotation.x = Math.sin(t * 0.05) * 0.2;
    group.current.position.y = scrollY * 0.005; // Float up slightly on scroll
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={3}>
        <InteractiveMesh position={[-8, 4, -5]}>
          <Icosahedron args={[0.5, 0]}>
            <meshStandardMaterial color="#00f0ff" wireframe />
          </Icosahedron>
        </InteractiveMesh>
        
        <InteractiveMesh position={[8, -3, -2]}>
          <TorusKnot args={[0.6, 0.1, 64, 8]}>
            <MeshDistortMaterial color="#ff003c" distort={0.2} speed={3} roughness={0.2} metalness={0.8} />
          </TorusKnot>
        </InteractiveMesh>
        
        <InteractiveMesh position={[6, 5, -8]}>
          <Icosahedron args={[0.8, 1]}>
            <meshStandardMaterial color="#ffffff" wireframe opacity={0.5} transparent />
          </Icosahedron>
        </InteractiveMesh>
      </Float>
    </group>
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
      <Ring args={[3.5, 3.52, 64]} rotation={[Math.PI/2, 0, 0]}>
        <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} transparent opacity={0.5} />
      </Ring>
      <Ring args={[4.5, 4.51, 64]} rotation={[Math.PI/2, 0, Math.PI/4]}>
        <meshBasicMaterial color="#ff003c" side={THREE.DoubleSide} transparent opacity={0.3} />
      </Ring>
      <Ring args={[5.5, 5.55, 64]} rotation={[Math.PI/3, 0, 0]}>
        <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.1} />
      </Ring>
      
      <mesh position={[3.5, 0, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>
      <mesh position={[-4.5, 0, 0]}>
        <octahedronGeometry args={[0.15]} />
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
    
    // 3D SCROLL ANIMATION
    // As user scrolls, the core rotates aggressively and zooms slightly towards camera
    const scrollRotation = scrollY * 0.005;
    const scrollScale = 1 + (scrollY * 0.001);
    
    coreRef.current.rotation.y = time * 0.2 + scrollRotation;
    coreRef.current.rotation.x = Math.sin(time * 0.5) * 0.2 + scrollRotation * 0.5;
    
    wireframeRef.current.rotation.y = -time * 0.15 - scrollRotation;
    wireframeRef.current.rotation.z = time * 0.1 + scrollRotation;
    
    groupRef.current.scale.lerp(new THREE.Vector3(scrollScale, scrollScale, scrollScale), 0.1);
    
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, state.mouse.y * 1.5, 0.05);
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, state.mouse.x * 1.5, 0.05);
  });

  return (
    <group ref={groupRef} position={[2, 0, 0]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={coreRef} scale={1.5}>
          <icosahedronGeometry args={[1, 4]} />
          <MeshDistortMaterial 
            color="#000000" 
            emissive="#00f0ff"
            emissiveIntensity={0.2}
            clearcoat={1} 
            clearcoatRoughness={0.1} 
            metalness={1} 
            roughness={0.1}
            distort={0.4}
            speed={2}
          />
        </mesh>
        
        <mesh ref={wireframeRef} scale={1.8}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color="#00f0ff" wireframe opacity={0.3} transparent />
        </mesh>
        
        <OrbitalRings />
      </Float>
      
      <Text 
        position={[-5, 0, -10]} 
        fontSize={12} 
        color="#ffffff" 
        fillOpacity={0.02} 
        letterSpacing={0.2}
        font="https://fonts.gstatic.com/s/syncopate/v19/pe0sMIuPIYBCpEV5eFdCBfe_.woff"
      >
        NEXUS
      </Text>
    </group>
  );
}

export default function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 10]} intensity={2} color="#00f0ff" />
      <directionalLight position={[-10, -10, -10]} intensity={1} color="#ff003c" />
      <spotLight position={[0, 5, 10]} angle={0.3} penumbra={1} intensity={5} color="#ffffff" castShadow />
      
      <TechCore />
      <FloatingAsteroids />
      <ParticleField count={2500} />
      <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={300} scale={15} size={6} speed={0.4} opacity={1} color="#00f0ff" />
      
      <fog attach="fog" args={['#030303', 5, 40]} />
    </>
  );
}
