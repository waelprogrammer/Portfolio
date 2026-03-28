import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

// A single wireframe geometric shape that slowly rotates
function FloatingShape({ position, geometry, color, speed = 0.4, scale = 1 }) {
  const mesh = useRef()

  useFrame((_, delta) => {
    if (!mesh.current) return
    mesh.current.rotation.x += delta * speed * 0.3
    mesh.current.rotation.y += delta * speed * 0.5
    mesh.current.rotation.z += delta * speed * 0.2
  })

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={mesh} position={position} scale={scale}>
        {geometry}
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.18}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  )
}

// Small glowing sphere
function GlowSphere({ position, color, scale = 0.12 }) {
  const mesh = useRef()
  const baseY = position[1]

  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.position.y = baseY + Math.sin(state.clock.elapsedTime * 0.8) * 0.3
  })

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        transparent
        opacity={0.7}
      />
    </mesh>
  )
}

// Particle field
function Particles({ count = 80 }) {
  const points = useRef()

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (!points.current) return
    points.current.rotation.y = state.clock.elapsedTime * 0.02
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#3b82f6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#3b82f6" />
      <pointLight position={[-5, -5, 3]} intensity={0.8} color="#06b6d4" />
      <pointLight position={[0, 5, -5]} intensity={0.5} color="#8b5cf6" />

      {/* Large shapes */}
      <FloatingShape
        position={[4.5, 1.5, -3]}
        geometry={<icosahedronGeometry args={[1.2, 0]} />}
        color="#3b82f6"
        speed={0.3}
        scale={1}
      />
      <FloatingShape
        position={[-4, -0.5, -4]}
        geometry={<octahedronGeometry args={[1.0, 0]} />}
        color="#06b6d4"
        speed={0.4}
        scale={0.9}
      />
      <FloatingShape
        position={[2, -2.5, -2]}
        geometry={<torusGeometry args={[0.7, 0.25, 8, 24]} />}
        color="#8b5cf6"
        speed={0.5}
        scale={0.8}
      />
      <FloatingShape
        position={[-2.5, 2.5, -5]}
        geometry={<tetrahedronGeometry args={[1.0, 0]} />}
        color="#3b82f6"
        speed={0.25}
        scale={0.75}
      />
      <FloatingShape
        position={[5.5, -1.5, -6]}
        geometry={<icosahedronGeometry args={[0.8, 0]} />}
        color="#06b6d4"
        speed={0.35}
        scale={0.7}
      />
      <FloatingShape
        position={[-5.5, 1, -3]}
        geometry={<dodecahedronGeometry args={[0.7, 0]} />}
        color="#8b5cf6"
        speed={0.2}
        scale={0.65}
      />

      {/* Glow spheres */}
      <GlowSphere position={[3.5, 2, -1]} color="#3b82f6" scale={0.08} />
      <GlowSphere position={[-3, -1.5, -2]} color="#06b6d4" scale={0.06} />
      <GlowSphere position={[0, 3, -3]} color="#8b5cf6" scale={0.05} />
      <GlowSphere position={[-1.5, -2.5, -1]} color="#3b82f6" scale={0.04} />

      {/* Stars/particles */}
      <Particles count={100} />
    </>
  )
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <SceneContent />
    </Canvas>
  )
}
