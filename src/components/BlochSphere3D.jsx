import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";

const BlochSphereVisualization = ({ blochVec }) => {
  const sphereRef = useRef();

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  // Make sure blochVec is an array
  const [x = 0, y = 0, z = 1] = Array.isArray(blochVec) ? blochVec : [0,0,1];

  // 🔄 Remap axes:
  // Original (backend): [x,y,z]
  // Target: Vertical=Z, Depth=X, Side=Y
  const nx = y; // side axis (new X = backend Y)
  const ny = z; // vertical (new Y = backend Z)
  const nz = x; // depth (new Z = backend X)

  // Normalize so state is always on the Bloch sphere
  const mag = Math.sqrt(nx*nx + ny*ny + nz*nz);
  const qx = mag > 0 ? nx/mag : 0;
  const qy = mag > 0 ? ny/mag : 0;
  const qz = mag > 0 ? nz/mag : 1;

  return (
    <>
      {/* Sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#8B5DFF" transparent opacity={0.15} wireframe />
      </mesh>

      {/* Axes (correct remap) */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={6}
            array={new Float32Array([
              // Side axis → Y (left-right)
              -1.3, 0, 0, 1.3, 0, 0,
              // Vertical axis → Z (up-down)
              0, -1.3, 0, 0, 1.3, 0,
              // Depth axis → X (front-back)
              0, 0, -1.3, 0, 0, 1.3
            ])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="white" />
      </lineSegments>

      {/* Bloch Vector (with remapped coords) */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array([0,0,0, qx,qy,qz])}
            count={2}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="red" />
      </line>

      {/* Tip */}
      <mesh position={[qx, qy, qz]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="red" />
      </mesh>

      {/* Axis Labels */}
      <Text position={[1.5, 0, 0]} fontSize={0.2} color="white">Y</Text>
      <Text position={[0, 1.5, 0]} fontSize={0.2} color="white">Z</Text>
      <Text position={[0, 0, 1.5]} fontSize={0.2} color="white">X</Text>

      {/* Poles */}
      <Text position={[0, 1.6, 0]} fontSize={0.2} color="white">|0⟩</Text>
      <Text position={[0, -1.6, 0]} fontSize={0.2} color="white">|1⟩</Text>
    </>
  );
};

const BlochSphere3D = ({ blochVec }) => {
  return (
    <Canvas camera={{ position: [2.5, 2.5, 2.5], fov: 45 }} style={{ width: "350px", height: "350px" }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} />
      <BlochSphereVisualization blochVec={blochVec} />
    </Canvas>
  );
};

export default BlochSphere3D;