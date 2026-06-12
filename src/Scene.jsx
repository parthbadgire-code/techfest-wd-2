import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Stars, Text, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// 3D Particles that react to scroll
function ParticleField({ count = 1000 }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 50;
      const factor = Math.random() * 2 + 1;
      const speed = Math.random() * 0.01 + 0.005;
      temp.push({ x, y, z, factor, speed });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { x, y, z, factor, speed } = particle;

      // Make particles float up slowly and rotate around center
      const t = state.clock.elapsedTime;
      
      dummy.position.set(
        x + Math.cos(t * speed) * factor,
        y + Math.sin(t * speed) * factor + (state.mouse.y * 5),
        z + (state.mouse.x * 5)
      );
      
      // Rotate individually
      dummy.rotation.set(
        (t * speed) / 2,
        (t * speed) / 2,
        (t * speed) / 2
      );
      
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    
    // Global rotation based on scroll/mouse
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, state.mouse.x * 0.5, 0.05);
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, -state.mouse.y * 0.5, 0.05);
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <dodecahedronGeometry args={[0.05, 0]} />
      <meshBasicMaterial color="#00f0ff" transparent opacity={0.6} />
    </instancedMesh>
  );
}

// Main Interactive Object
function TechCore() {
  const coreRef = useRef();
  const wireframeRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Complex rotation
    coreRef.current.rotation.y = time * 0.2;
    coreRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    
    wireframeRef.current.rotation.y = -time * 0.15;
    wireframeRef.current.rotation.z = time * 0.1;
    
    // Hover effect using mouse position
    coreRef.current.position.y = THREE.MathUtils.lerp(coreRef.current.position.y, state.mouse.y * 1, 0.1);
    coreRef.current.position.x = THREE.MathUtils.lerp(coreRef.current.position.x, state.mouse.x * 1, 0.1);
    
    wireframeRef.current.position.copy(coreRef.current.position);
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        {/* Inner Core */}
        <mesh ref={coreRef} scale={1.5}>
          <icosahedronGeometry args={[1, 4]} />
          <MeshDistortMaterial 
            color="#00f0ff" 
            envMapIntensity={1} 
            clearcoat={1} 
            clearcoatRoughness={0.1} 
            metalness={0.8} 
            roughness={0.2}
            distort={0.4}
            speed={2}
          />
        </mesh>
        
        {/* Outer Wireframe */}
        <mesh ref={wireframeRef} scale={1.8}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color="#fff" wireframe opacity={0.3} transparent />
        </mesh>
      </Float>
      
      {/* Dynamic Text in 3D */}
      <Text 
        position={[0, 0, -5]} 
        fontSize={10} 
        color="#ffffff" 
        fillOpacity={0.05} 
        letterSpacing={0.2}
        font="https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQoQDjQSkGpu8pnHXFAA_vS2A.woff"
      >
        TECHFEST
      </Text>
    </group>
  );
}

export default function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={2} color="#00f0ff" />
      <directionalLight position={[-10, -10, -10]} intensity={1} color="#ff00f0" />
      <spotLight position={[0, 5, 10]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" castShadow />
      
      <TechCore />
      <ParticleField count={1500} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={200} scale={10} size={4} speed={0.4} opacity={0.5} color="#00f0ff" />
      
      <fog attach="fog" args={['#050505', 5, 30]} />
    </>
  );
}
