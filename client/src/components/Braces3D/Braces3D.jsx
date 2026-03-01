import { Canvas } from '@react-three/fiber';
import { Text3D, Center, Float, Environment } from '@react-three/drei';
import './Braces3D.css';

function Brace({ character }) {
  return (
    <Float
      speed={1.2}
      rotationIntensity={0.08}
      floatIntensity={0.5}
      floatingRange={[-0.12, 0.12]}
    >
      <Center>
        <Text3D
          font="/fonts/helvetiker_bold.typeface.json"
          size={1.4}
          height={0.45}
          bevelEnabled
          bevelThickness={0.03}
          bevelSize={0.03}
          bevelSegments={8}
          curveSegments={12}
        >
          {character}
          <meshStandardMaterial
            color="#078f44"
            metalness={0.95}
            roughness={0.08}
            envMapIntensity={2.2}
          />
        </Text3D>
      </Center>
    </Float>
  );
}

function BraceCanvas({ character }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.8], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[-2, 2, 3]}  intensity={18} color="#00ff8c" />
      <pointLight position={[2, -1, -2]} intensity={10} color="#00d4ff" />
      <pointLight position={[0, -3, 1]}  intensity={4}  color="#dc08bc" />
      <Environment preset="night" />
      <Brace character={character} />
    </Canvas>
  );
}

export default function Braces3D() {
  return (
    <>
      <div className="brace-canvas-wrapper brace-canvas-left">
        <BraceCanvas character="{" />
      </div>
      <div className="brace-canvas-wrapper brace-canvas-right">
        <BraceCanvas character="}" />
      </div>
    </>
  );
}
