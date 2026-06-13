"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PETAL_COUNT = 32;
const AREA = { x: 11, y: 7, z: 5 };
const PALETTE = ["#e795ae", "#dd7f9e", "#f2b9c9", "#d06d90", "#eeC9b4"];

type Petal = {
  pos: THREE.Vector3;
  rot: THREE.Euler;
  scale: number;
  fallSpeed: number;
  swayAmp: number;
  swayFreq: number;
  spin: THREE.Vector3;
  seed: number;
};

function makePetals(): Petal[] {
  return Array.from({ length: PETAL_COUNT }, () => ({
    pos: new THREE.Vector3(
      (Math.random() - 0.5) * AREA.x * 2,
      (Math.random() - 0.5) * AREA.y * 2,
      (Math.random() - 0.5) * AREA.z * 2 - 1
    ),
    rot: new THREE.Euler(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2
    ),
    scale: 0.32 + Math.random() * 0.5,
    fallSpeed: 0.16 + Math.random() * 0.3,
    swayAmp: 0.5 + Math.random() * 1.1,
    swayFreq: 0.25 + Math.random() * 0.5,
    spin: new THREE.Vector3(
      (Math.random() - 0.5) * 0.7,
      (Math.random() - 0.5) * 0.7,
      (Math.random() - 0.5) * 0.7
    ),
    seed: Math.random() * 100,
  }));
}

/** Пелюстка — сплющена сфера зі злегка підкрученим профілем. */
function usePetalGeometry() {
  return useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 24, 16);
    const p = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i);
      const y = p.getY(i);
      const z = p.getZ(i);
      // профіль пелюстки: вузька основа, широка верхівка, легкий вигин
      const taper = 0.55 + 0.45 * (z + 1) * 0.5;
      p.setX(i, x * taper);
      p.setY(i, y * 0.085 + Math.sin(z * Math.PI) * 0.14);
      p.setZ(i, z * 0.62);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);
}

function Petals() {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const petals = useMemo(makePetals, []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const geometry = usePetalGeometry();

  useEffect(() => {
    const c = new THREE.Color();
    for (let i = 0; i < PETAL_COUNT; i++) {
      c.set(PALETTE[i % PALETTE.length]);
      mesh.current.setColorAt(i, c);
    }
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    petals.forEach((petal, i) => {
      petal.pos.y -= petal.fallSpeed * delta;
      if (petal.pos.y < -AREA.y) {
        petal.pos.y = AREA.y;
        petal.pos.x = (Math.random() - 0.5) * AREA.x * 2;
      }
      const swayX = Math.sin(t * petal.swayFreq + petal.seed) * petal.swayAmp;
      const swayZ = Math.cos(t * petal.swayFreq * 0.8 + petal.seed) * 0.5;

      dummy.position.set(petal.pos.x + swayX * 0.3, petal.pos.y, petal.pos.z + swayZ * 0.2);
      dummy.rotation.set(
        petal.rot.x + t * petal.spin.x,
        petal.rot.y + t * petal.spin.y,
        petal.rot.z + t * petal.spin.z
      );
      dummy.scale.setScalar(petal.scale);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[geometry, undefined, PETAL_COUNT]}>
      <meshPhysicalMaterial
        side={THREE.DoubleSide}
        roughness={0.55}
        sheen={1}
        sheenColor="#ffd9e3"
        clearcoat={0.4}
        transparent
        opacity={0.92}
      />
    </instancedMesh>
  );
}

function GoldDust() {
  const points = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(140 * 3);
    for (let i = 0; i < 140; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    points.current.rotation.y = t * 0.018;
    points.current.position.y = Math.sin(t * 0.22) * 0.35;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#dcc08a"
        transparent
        opacity={0.75}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/** Паралакс сцени за рухом миші. */
function Rig() {
  const group = useRef<THREE.Group>(null!);
  useFrame((state, delta) => {
    const { pointer } = state;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      pointer.x * 0.14,
      2.2,
      delta
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      -pointer.y * 0.1,
      2.2,
      delta
    );
  });
  return (
    <group ref={group}>
      <Petals />
      <GoldDust />
    </group>
  );
}

export default function PetalCanvas({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 6, 5]} intensity={1.4} color="#fff1dd" />
        <pointLight position={[-6, -2, 3]} intensity={12} color="#f0b9c9" />
        <pointLight position={[6, 3, -2]} intensity={9} color="#dcc08a" />
        <fog attach="fog" args={["#fffaf4", 9, 17]} />
        <Rig />
      </Canvas>
    </div>
  );
}
