import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';

// ---------------- Quantum Globe ---------------- //
const QuantumSphere = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Sphere ref={meshRef} args={[4, 32, 32]}>
      <meshBasicMaterial color="#a855f7" transparent opacity={0.3} wireframe />
    </Sphere>
  );
};

const FloatingParticles = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 50 }, (_, i) => {
        const radius = 5.2 + Math.random() * 2.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial
              color={
                i % 4 === 0 ? '#00d4ff' :
                i % 4 === 1 ? '#ff0080' :
                i % 4 === 2 ? '#8b5cf6' :
                '#00ff88'
              }
              transparent
              opacity={0.9}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const QuantumComputer = () => {
  const group = useRef();
  const wireRefs = useRef([]);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(clock.elapsedTime * 0.15) * 0.1;
    }
    // Animate pulsing wires
    wireRefs.current.forEach((mat, i) => {
      if (mat) {
        mat.emissiveIntensity =
          0.9 + Math.sin(clock.elapsedTime * 3 + i * 0.5) * 0.6;
      }
    });
  });

  const silverMatProps = {
    color: "#cccccc",
    metalness: 0.9,
    roughness: 0.2,
  };

  const goldMatProps = {
    color: "#ffcc66",
    emissive: "#ffaa00",
    emissiveIntensity: 1.2,
    metalness: 0.8,
    roughness: 0.3,
  };

  return (
    // 🔹 Raised a bit higher to avoid merging into globe
    <group ref={group} position={[0, 11.2, 0]} scale={1}>
      {/* Top cryostat lid */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[2, 2, 0.6, 64]} />
        <meshStandardMaterial color="#dddddd" metalness={1} roughness={0.2} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[2, 2, 0.3, 64]} />
        <meshStandardMaterial {...silverMatProps} />
      </mesh>

      {/* 🔹 Exactly 3 golden plates */}
      {[-2.5, -4.5, -6.5].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <cylinderGeometry args={[1.6 - i * 0.1, 1.6 - i * 0.1, 0.15, 64]} />
          <meshStandardMaterial {...goldMatProps} />
        </mesh>
      ))}

      {/* Central shaft */}
      <mesh position={[0, -3.5, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 7, 16]} />
        <meshStandardMaterial {...silverMatProps} />
      </mesh>

      {/* Pulsing golden wires (shortened so bottom clears globe) */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const path = new THREE.CatmullRomCurve3([
          new THREE.Vector3(Math.cos(angle) * 1.1, 0, Math.sin(angle) * 1.1),
          new THREE.Vector3(Math.cos(angle) * 1.1, -7.2, Math.sin(angle) * 1.1),
        ]);
        const tube = new THREE.TubeGeometry(path, 40, 0.025, 8, false);
        return (
          <mesh key={i} geometry={tube}>
            <meshStandardMaterial
              ref={(el) => (wireRefs.current[i] = el)}
              {...goldMatProps}
            />
          </mesh>
        );
      })}

      {/* Support rods matching plate positions */}
      {[-2.5, -4.5, -6.5].map((y, i) => (
        <group key={i}>
          {Array.from({ length: 6 }).map((_, j) => {
            const angle = (j / 6) * Math.PI * 2;
            return (
              <mesh
                key={j}
                position={[Math.cos(angle) * 1.4, y, Math.sin(angle) * 1.4]}
              >
                <cylinderGeometry args={[0.05, 0.05, 1.8, 12]} />
                <meshStandardMaterial {...silverMatProps} />
              </mesh>
            );
          })}
        </group>
      ))}

      {/* Coaxial spiral wires for each plate */}
      {[-2.5, -4.5, -6.5].map((y, i) =>
        Array.from({ length: 2 }).map((_, k) => {
          const points = [];
          const turns = 4;
          const radius = 0.25 + k * 0.15;
          for (let t = 0; t < Math.PI * 2 * turns; t += 0.2) {
            points.push(
              new THREE.Vector3(
                Math.cos(t) * radius,
                y - t * 0.04,
                Math.sin(t) * radius
              )
            );
          }
          const curve = new THREE.CatmullRomCurve3(points);
          const geo = new THREE.TubeGeometry(curve, 200, 0.015, 6, false);
          return (
            <mesh key={`${i}-${k}`} geometry={geo} position={[0, -0.2, 0]}>
              <meshStandardMaterial
                color="#dddddd"
                emissive="#66ccff"
                emissiveIntensity={0.3}
                metalness={0.7}
                roughness={0.2}
              />
            </mesh>
          );
        })
      )}
    </group>
  );
};

// ---------------- Qubits ---------------- //
const Qubit = ({ id, position, onFadeComplete }) => {
  const possibleLabels = [
    "|0⟩",
    "|1⟩",
    "|ψ1⟩",
    "|ψ2⟩",  
  ];

  const meshRef = useRef();
  const [label] = useState(
    possibleLabels[Math.floor(Math.random() * possibleLabels.length)]
  );
  const [opacity, setOpacity] = useState(1);
  const velocity = useRef(0.03 + Math.random() * 0.015);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.y -= velocity.current;

      if (meshRef.current.position.y <= -4.2) {
        setOpacity((prev) => {
          if (prev <= 0.01) {
            onFadeComplete(id);
            return 0;
          }
          return prev - 0.02;
        });
      }
    }
  });

  let sphereColor = "#39FF14"; 
  let textColor = "#39FF14";

  if (label.includes("1")) { // |1⟩ or <1|
    sphereColor = "#FF9933"; // bright orange
    textColor = "#FF9933";
  } else if (label.includes("|0⟩ + |1⟩") || label.includes("|0⟩ - |1⟩")) {
    sphereColor = "#FFFF33"; // neon yellow
    textColor = "#FFFF33";
  }

  return (
    <group ref={meshRef} position={position}>
      {/* Bright & Larger Sphere */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color={sphereColor}
          emissive={sphereColor}
          emissiveIntensity={3.0}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Bold Glowing Text Label */}
      <Text
        position={[0.5, 0.4, 0]}
        fontSize={0.60}
        color={textColor}
        anchorX="left"
        anchorY="middle"
        fontWeight="bold"
        outlineWidth={0.06}
        outlineColor="#000000"
        fillOpacity={opacity}
      >
        {label}
      </Text>
    </group>
  );
};
// ---------------- Entanglement Line ---------------- //
const EntanglementLine = ({ start, end }) => {
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  const lineGeom = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={lineGeom}>
      <lineBasicMaterial color="#00ffff" linewidth={3} transparent opacity={0.8} />
    </line>
  );
};

// ---------------- Main QuantumGlobe ---------------- //
const QuantumGlobe = () => {
  const [qubits, setQubits] = useState([]);
  const [entangled, setEntangled] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setQubits((prev) => {
        let newQ = [...prev, { id: Date.now(), position: [0, 7.5, 0] }];
        if (newQ.length > 3) newQ = newQ.slice(1); // keep max 3 active

        // Random entanglement if 2 exist
        if (newQ.length === 2 && Math.random() > 0.6) {
          setEntangled([newQ[0].id, newQ[1].id]);
        } else {
          setEntangled(null);
        }

        return newQ;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleFadeComplete = (id) => {
    setQubits((prev) => prev.filter((q) => q.id !== id));
    if (entangled && entangled.includes(id)) {
      setEntangled(null);
    }
  };

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{
          position: [0, 0, 13],
          fov: window.innerWidth < 768 ? 65 : 75,
        }}
        className="w-full h-full"
      >
        <ambientLight intensity={1.2} />
        <pointLight position={[6, 6, 6]} intensity={1.5} color="#00d4ff" />
        <pointLight position={[-6, -6, -6]} intensity={1.2} color="#a855f7" />
        <pointLight position={[0, 6, -6]} intensity={1.0} color="#ff0080" />

        {/* Keep globe + particles */}
        <QuantumSphere />
        <FloatingParticles />

        {/* Quantum Computer */}
        <QuantumComputer />

        {/* Qubits */}
        {qubits.map((q) => (
          <Qubit key={q.id} {...q} onFadeComplete={handleFadeComplete} />
        ))}

        {/* Entanglement Line */}
        {entangled && qubits.length === 2 && (
          <EntanglementLine
            start={qubits[0].position}
            end={qubits[1].position}
          />
        )}
      </Canvas>

      {/* Glow overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-purple-400/40 via-purple-500/15 to-transparent rounded-full transform scale-110" />
        <div className="absolute inset-0 bg-gradient-radial from-cyan-400/30 via-cyan-500/10 to-transparent rounded-full animate-pulse transform scale-105" />
        <div
          className="absolute inset-0 bg-gradient-radial from-pink-400/20 via-transparent to-transparent animate-pulse transform scale-120"
          style={{ animationDelay: '0.5s' }}
        />
      </div>
    </div>
  );
};

export default QuantumGlobe;