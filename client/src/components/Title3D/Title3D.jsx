import { Canvas } from '@react-three/fiber';
import { Text3D, Center, Environment } from '@react-three/drei';
import './Title3D.css';

// ── Constants ─────────────────────────────────────────────────────────────
// ha=850 for all Space Mono chars → advance per char = size * 0.85
// "[ INSTVNCE_BLOG ]" = 17 chars × 1.2 * 0.85 = 17.34 units wide
// Camera z=3.8, fov=50 → visible_width ≈ 20 units → ~87% fill

const FONT = '/fonts/space_mono_bold.typeface.json';

const TEXT_PROPS = {
  size: 1.2,
  height: 0.35,       // extrusion depth
  bevelEnabled: true,
  bevelThickness: 0.03,
  bevelSize: 0.02,
  bevelSegments: 8,
  curveSegments: 12,
};

// ── Text mesh ──────────────────────────────────────────────────────────────
function TitleMesh() {
  return (
    <Center>
      <Text3D font={FONT} {...TEXT_PROPS}>
        {'[ INSTVNCE_BLOG ]'}
        <meshStandardMaterial
          color="#fcf8f8"
          metalness={0.85}
          roughness={0.1}
          envMapIntensity={2.0}
        />
      </Text3D>
    </Center>
  );
}

// ── Canvas ─────────────────────────────────────────────────────────────────
// Alpha canvas so the page background shows through.
// Static — no Float wrapper, just clean 3D geometry sitting in place.
// Environment preset gives the metallic material realistic reflections.

export default function Title3D() {
  return (
    <div className="title3d-wrapper">
      <Canvas
        camera={{ position: [0, 0, 3.6], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[0, 5, 5]}   intensity={4}  color="#ffffff" />
        <pointLight       position={[-8, 3, 4]}  intensity={12} color="#0e0d0d" />
        <pointLight       position={[8, -2, 3]}  intensity={6}  color="#0d0d0d" />
        {/* Green rim from below — ties into the page accent colour */}
        <pointLight       position={[0, -5, -2]} intensity={3}  color="#00ff8c" />
        <Environment preset="night" />

        <TitleMesh />
      </Canvas>
    </div>
  );
}
