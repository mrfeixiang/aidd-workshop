import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import {
  AMINO_ACIDS,
  ATOM_COLORS,
  ATOM_RADII,
  TYPE_COLORS,
  generatePeptide,
  getOptions,
  CODON_TABLE,
  type AminoAcid,
} from "@/data/aminoAcids";

// ─── molecule builder ────────────────────────────────────────────────────────

function buildMolecule(aa: AminoAcid): THREE.Group {
  const group = new THREE.Group();

  const atomMeshes: THREE.Mesh[] = [];
  for (const atom of aa.atoms) {
    const r = ATOM_RADII[atom.element] ?? 0.3;
    const geo = new THREE.SphereGeometry(r, 14, 10);
    const mat = new THREE.MeshPhongMaterial({
      color: ATOM_COLORS[atom.element] ?? 0x555555,
      shininess: 120,
      specular: 0x444444,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...atom.pos);
    group.add(mesh);
    atomMeshes.push(mesh);
  }

  const bondMat = new THREE.MeshPhongMaterial({ color: 0x888888, shininess: 60 });
  for (const [i, j] of aa.bonds) {
    const a = new THREE.Vector3(...aa.atoms[i].pos);
    const b = new THREE.Vector3(...aa.atoms[j].pos);
    const len = a.distanceTo(b);
    const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
    const dir = new THREE.Vector3().subVectors(b, a).normalize();
    const geo = new THREE.CylinderGeometry(0.08, 0.08, len, 8);
    const mesh = new THREE.Mesh(geo, bondMat.clone());
    mesh.position.copy(mid);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    group.add(mesh);
  }

  // Center the molecule vertically around its midpoint
  const box = new THREE.Box3().setFromObject(group);
  const centerY = (box.min.y + box.max.y) / 2;
  group.children.forEach((c) => (c.position.y -= centerY));

  return group;
}

// ─── ribosome decoration ─────────────────────────────────────────────────────

function buildRibosome(): THREE.Group {
  const group = new THREE.Group();
  const largeMat = new THREE.MeshPhongMaterial({ color: 0xc084bc, shininess: 60, transparent: true, opacity: 0.85 });
  const smallMat = new THREE.MeshPhongMaterial({ color: 0xa855a8, shininess: 60, transparent: true, opacity: 0.8 });

  // Large subunit – blob of overlapping ellipsoids
  const lsPositions: [number, number, number, number, number, number][] = [
    [0, 1.2, 0, 2.8, 2.2, 2.2],
    [-1.2, 0, 0.3, 1.8, 1.5, 1.6],
    [1.0, 0.5, -0.4, 2.0, 1.6, 1.4],
    [0.2, -1.0, 0.5, 1.6, 1.4, 1.3],
    [-0.5, 1.8, -0.3, 1.4, 1.2, 1.2],
    [1.2, -0.5, 0.8, 1.3, 1.2, 1.0],
  ];
  for (const [x, y, z, sx, sy, sz] of lsPositions) {
    const geo = new THREE.SphereGeometry(1, 16, 12);
    const mesh = new THREE.Mesh(geo, largeMat);
    mesh.position.set(x, y, z);
    mesh.scale.set(sx, sy, sz);
    group.add(mesh);
  }

  // Small subunit – sits below
  const ssPositions: [number, number, number, number, number, number][] = [
    [0, -2.5, 0, 2.4, 1.4, 1.8],
    [-1.0, -3.0, 0.4, 1.5, 1.1, 1.2],
    [1.1, -2.8, -0.3, 1.4, 1.0, 1.1],
  ];
  for (const [x, y, z, sx, sy, sz] of ssPositions) {
    const geo = new THREE.SphereGeometry(1, 14, 10);
    const mesh = new THREE.Mesh(geo, smallMat);
    mesh.position.set(x, y, z);
    mesh.scale.set(sx, sy, sz);
    group.add(mesh);
  }

  return group;
}

// ─── mRNA strand ─────────────────────────────────────────────────────────────

function buildMRNA(scene: THREE.Scene): THREE.Object3D {
  const points: THREE.Vector3[] = [];
  for (let t = 0; t <= 1; t += 0.02) {
    points.push(new THREE.Vector3(-12 + t * 18, -3.5 + Math.sin(t * Math.PI * 3) * 0.4, Math.cos(t * Math.PI * 2) * 0.3));
  }
  const curve = new THREE.CatmullRomCurve3(points);
  const geo = new THREE.TubeGeometry(curve, 60, 0.18, 8, false);
  const mat = new THREE.MeshPhongMaterial({ color: 0x44ccff, shininess: 80, transparent: true, opacity: 0.75 });
  const tube = new THREE.Mesh(geo, mat);
  scene.add(tube);
  return tube;
}

// ─── star field ──────────────────────────────────────────────────────────────

function buildStars(scene: THREE.Scene) {
  const positions = new Float32Array(600 * 3);
  for (let i = 0; i < 600; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 80;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
    positions[i * 3 + 2] = -20 + Math.random() * -30;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.12, transparent: true, opacity: 0.6 });
  scene.add(new THREE.Points(geo, mat));
}

// ─── peptide chain visualization ──────────────────────────────────────────────

function buildChainBead(aa: AminoAcid, index: number): THREE.Mesh {
  const geo = new THREE.SphereGeometry(0.45, 14, 10);
  const color = parseInt(TYPE_COLORS[aa.type].replace("#", ""), 16);
  const mat = new THREE.MeshPhongMaterial({ color, shininess: 100 });
  const mesh = new THREE.Mesh(geo, mat);
  // Arrange as a horizontal chain
  mesh.position.set(index * 1.1, 0, 0);
  return mesh;
}

// ─── game types ───────────────────────────────────────────────────────────────

interface GameState {
  phase: "start" | "playing" | "end";
  peptideAbbrevs: string[];
  peptideCodons: string[];
  currentIdx: number;
  options: string[];
  builtAbbrevs: string[];
  startTime: number;
  endTime: number;
  wrongClicks: number;
}

interface Anim {
  type: "correct" | "wrong";
  optionIdx: number;
  t: number;       // 0..1 progress
  duration: number;
}

const PEPTIDE_LENGTH = 10;
const GRID_COLS = [-3.6, 0, 3.6];
const GRID_ROWS = [3.8, 0, -3.8];
const MOLECULE_SCALE = 0.44;

// ─── component ────────────────────────────────────────────────────────────────

export default function AminoAcidGame() {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rafRef = useRef<number>(0);
  const ribosomeRef = useRef<THREE.Group | null>(null);
  const optionGroupsRef = useRef<THREE.Group[]>([]);
  const chainGroupRef = useRef<THREE.Group | null>(null);
  const hoverIdxRef = useRef<number>(-1);
  const animRef = useRef<Anim | null>(null);
  const clockRef = useRef(new THREE.Clock());

  const [game, setGame] = useState<GameState>({
    phase: "start",
    peptideAbbrevs: [],
    peptideCodons: [],
    currentIdx: 0,
    options: [],
    builtAbbrevs: [],
    startTime: 0,
    endTime: 0,
    wrongClicks: 0,
  });
  const gameRef = useRef(game);
  gameRef.current = game;

  const [elapsedSec, setElapsedSec] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  // ── Three.js init (runs once) ─────────────────────────────────────────────
  useEffect(() => {
    if (!mountRef.current) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x080818);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const w = mountRef.current.clientWidth;
    const h = mountRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(52, w / h, 0.1, 200);
    camera.position.set(0, 0, 20);
    cameraRef.current = camera;

    // Lights
    scene.add(new THREE.AmbientLight(0x334466, 1.2));
    const dir = new THREE.DirectionalLight(0xffffff, 1.4);
    dir.position.set(6, 10, 12);
    scene.add(dir);
    const fill = new THREE.PointLight(0x6633cc, 1.2, 40);
    fill.position.set(-8, 4, 6);
    scene.add(fill);
    const rim = new THREE.PointLight(0x0088ff, 0.8, 30);
    rim.position.set(10, -3, 5);
    scene.add(rim);

    buildStars(scene);
    buildMRNA(scene);

    const ribosome = buildRibosome();
    ribosome.position.set(-10, 0, -2);
    scene.add(ribosome);
    ribosomeRef.current = ribosome;

    const chainGroup = new THREE.Group();
    chainGroup.position.set(-4.5, -6.5, 0);
    scene.add(chainGroup);
    chainGroupRef.current = chainGroup;

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      const delta = clockRef.current.getDelta();

      // Rotate ribosome slowly
      if (ribosomeRef.current) {
        ribosomeRef.current.rotation.y += delta * 0.15;
        ribosomeRef.current.rotation.x += delta * 0.05;
      }

      // Hover glow: scale selected option
      optionGroupsRef.current.forEach((g, i) => {
        const isHovered = i === hoverIdxRef.current;
        const target = isHovered ? 1.12 : 1.0;
        g.scale.lerp(new THREE.Vector3(target, target, target), 0.15);
      });

      // Feedback animation
      if (animRef.current) {
        const anim = animRef.current;
        anim.t += delta / anim.duration;
        const g = optionGroupsRef.current[anim.optionIdx];
        if (g) {
          if (anim.type === "correct") {
            // Scale up then fly right
            const s = anim.t < 0.4 ? 1 + anim.t * 0.6 : Math.max(0, 1.24 - (anim.t - 0.4) * 3);
            g.scale.setScalar(s);
            if (anim.t > 0.4) {
              g.position.x += delta * 14;
              g.position.y += delta * 2;
            }
            for (const child of g.children) {
              if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshPhongMaterial) {
                child.material.emissive.setHex(0x003300);
              }
            }
          } else {
            // Shake + red flash
            g.position.x += Math.sin(anim.t * 60) * delta * 4;
            for (const child of g.children) {
              if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshPhongMaterial) {
                child.material.emissive.setHex(anim.t < 0.5 ? 0x330000 : 0x000000);
              }
            }
          }
        }
        if (anim.t >= 1) {
          animRef.current = null;
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
      renderer.dispose();
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Project world coords → screen percentage (for label overlay)
  const project3D = useCallback((wx: number, wy: number, wz = 0): { x: number; y: number } => {
    const cam = cameraRef.current;
    if (!cam) return { x: 50, y: 50 };
    const v = new THREE.Vector3(wx, wy, wz).project(cam);
    return { x: ((v.x + 1) / 2) * 100, y: ((1 - v.y) / 2) * 100 };
  }, []);

  // ── Rebuild option molecules when options change ──────────────────────────
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || game.options.length === 0) return;

    // Remove and dispose old option groups
    optionGroupsRef.current.forEach((g) => {
      scene.remove(g);
      g.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
    });
    optionGroupsRef.current = [];

    // Build 3×3 grid of molecules
    game.options.forEach((abbrev, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const aa = AMINO_ACIDS[abbrev];
      const group = buildMolecule(aa);
      group.scale.setScalar(MOLECULE_SCALE);
      group.position.set(GRID_COLS[col] - 1.8, GRID_ROWS[row], 0);
      group.userData.optionIndex = i;
      group.userData.abbrev = abbrev;

      // Tag all meshes for raycasting
      group.traverse((obj) => {
        if (obj instanceof THREE.Mesh) obj.userData.optionIndex = i;
      });

      scene.add(group);
      optionGroupsRef.current.push(group);
    });
  }, [game.options]);

  // ── Update chain beads when peptide grows ────────────────────────────────
  useEffect(() => {
    const scene = sceneRef.current;
    const chainGroup = chainGroupRef.current;
    if (!scene || !chainGroup) return;

    // Clear old beads
    while (chainGroup.children.length) chainGroup.remove(chainGroup.children[0]);

    game.builtAbbrevs.forEach((abbrev, i) => {
      const aa = AMINO_ACIDS[abbrev];
      const bead = buildChainBead(aa, i);
      chainGroup.add(bead);

      // Bond cylinder between beads
      if (i > 0) {
        const geo = new THREE.CylinderGeometry(0.08, 0.08, 1.1, 8);
        const mat = new THREE.MeshPhongMaterial({ color: 0x888888 });
        const bond = new THREE.Mesh(geo, mat);
        bond.rotation.z = Math.PI / 2;
        bond.position.set(i * 1.1 - 0.55, 0, 0);
        chainGroup.add(bond);
      }
    });

    // Center the chain
    chainGroup.position.x = -game.builtAbbrevs.length * 0.55;
  }, [game.builtAbbrevs]);

  // ── Timer ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (game.phase !== "playing") return;
    const id = setInterval(() => {
      setElapsedSec(((Date.now() - game.startTime) / 1000));
    }, 100);
    return () => clearInterval(id);
  }, [game.phase, game.startTime]);

  // ── Start game ───────────────────────────────────────────────────────────
  const startGame = useCallback(() => {
    const { codons, abbrevs } = generatePeptide(PEPTIDE_LENGTH);
    const options = getOptions(abbrevs[0], 9);
    setFeedback(null);
    setElapsedSec(0);
    animRef.current = null;
    hoverIdxRef.current = -1;

    setGame({
      phase: "playing",
      peptideAbbrevs: abbrevs,
      peptideCodons: codons,
      currentIdx: 0,
      options,
      builtAbbrevs: [],
      startTime: Date.now(),
      endTime: 0,
      wrongClicks: 0,
    });
  }, []);

  // ── Handle option click ───────────────────────────────────────────────────
  const handleOptionClick = useCallback((optionIdx: number) => {
    const g = gameRef.current;
    if (g.phase !== "playing" || animRef.current) return;

    const clicked = g.options[optionIdx];
    const correct = g.peptideAbbrevs[g.currentIdx];
    const isCorrect = clicked === correct;

    setFeedback(isCorrect ? "correct" : "wrong");
    animRef.current = { type: isCorrect ? "correct" : "wrong", optionIdx, t: 0, duration: isCorrect ? 0.7 : 0.55 };

    setTimeout(() => {
      setFeedback(null);
      if (!isCorrect) return;

      setGame((prev) => {
        const nextIdx = prev.currentIdx + 1;
        const newBuilt = [...prev.builtAbbrevs, correct];

        if (nextIdx >= prev.peptideAbbrevs.length) {
          return { ...prev, phase: "end", builtAbbrevs: newBuilt, endTime: Date.now() };
        }
        const nextAA = prev.peptideAbbrevs[nextIdx];
        const nextOptions = getOptions(nextAA, 9);
        return { ...prev, currentIdx: nextIdx, options: nextOptions, builtAbbrevs: newBuilt };
      });
    }, isCorrect ? 700 : 560);

    if (!isCorrect) {
      setGame((prev) => ({ ...prev, wrongClicks: prev.wrongClicks + 1 }));
    }
  }, []);

  // ── Mouse events ─────────────────────────────────────────────────────────
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (gameRef.current.phase !== "playing" || !cameraRef.current || !mountRef.current) return;
    const rect = mountRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const ray = new THREE.Raycaster();
    ray.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

    const targets: THREE.Object3D[] = [];
    optionGroupsRef.current.forEach((g) => g.traverse((o) => { if (o instanceof THREE.Mesh) targets.push(o); }));

    const hits = ray.intersectObjects(targets);
    hoverIdxRef.current = hits.length > 0 ? (hits[0].object.userData.optionIndex ?? -1) : -1;
  }, []);

  const onClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (gameRef.current.phase !== "playing" || !cameraRef.current || !mountRef.current) return;
    const rect = mountRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const ray = new THREE.Raycaster();
    ray.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

    const targets: THREE.Object3D[] = [];
    optionGroupsRef.current.forEach((g) => g.traverse((o) => { if (o instanceof THREE.Mesh) targets.push(o); }));

    const hits = ray.intersectObjects(targets);
    if (hits.length > 0) {
      const idx = hits[0].object.userData.optionIndex;
      if (idx !== undefined) handleOptionClick(idx);
    }
  }, [handleOptionClick]);

  // ── Derived values ────────────────────────────────────────────────────────
  const currentAA: AminoAcid | null = game.phase === "playing" && game.peptideAbbrevs[game.currentIdx]
    ? AMINO_ACIDS[game.peptideAbbrevs[game.currentIdx]]
    : null;

  const finalTimeSec = game.endTime && game.startTime ? (game.endTime - game.startTime) / 1000 : 0;
  const speedAAS = finalTimeSec > 0 ? (PEPTIDE_LENGTH / finalTimeSec).toFixed(2) : "0";
  const accuracy = game.phase === "end"
    ? Math.round((PEPTIDE_LENGTH / (PEPTIDE_LENGTH + game.wrongClicks)) * 100)
    : 0;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toFixed(1).padStart(4, "0");
    return `${m}:${sec}`;
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#080818] select-none">
      {/* Three.js canvas mount */}
      <div
        ref={mountRef}
        className="absolute inset-0"
        onMouseMove={onMouseMove}
        onClick={onClick}
        style={{ cursor: game.phase === "playing" ? "crosshair" : "default" }}
      />

      {/* ── Option labels overlay (3×3 grid) ── */}
      {game.phase === "playing" && (
        <div className="absolute inset-0 pointer-events-none">
          {game.options.map((abbrev, i) => {
            const col = i % 3;
            const row = Math.floor(i / 3);
            // Project the 3D grid position to 2D screen coords; label sits 1.8 units below molecule center
            const wx = GRID_COLS[col];
            const wy = GRID_ROWS[row] - 1.8;
            const { x: lx, y: ly } = project3D(wx, wy);
            const aa = AMINO_ACIDS[abbrev];
            const typeColor = TYPE_COLORS[aa.type];
            return (
              <div
                key={i}
                className="absolute text-center transform -translate-x-1/2"
                style={{ left: `${lx}%`, top: `${ly}%` }}
              >
                <div
                  className="text-white font-mono font-bold tracking-widest text-sm px-2 py-0.5 rounded"
                  style={{ background: `${typeColor}30`, border: `1px solid ${typeColor}60`, textShadow: "0 0 8px rgba(255,255,255,0.5)" }}
                >
                  {abbrev}
                </div>
                <div className="text-[10px] mt-0.5" style={{ color: typeColor, opacity: 0.8 }}>
                  {aa.name}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── HUD ── */}
      {game.phase === "playing" && (
        <>
          {/* Current codon – bottom left */}
          <div className="absolute bottom-20 left-6 text-white font-mono">
            <div className="text-xs text-cyan-400 mb-1 tracking-widest uppercase">Codon</div>
            <div
              className="text-5xl font-black tracking-widest"
              style={{ textShadow: "0 0 20px rgba(0,200,255,0.8), 0 0 40px rgba(0,100,255,0.4)", color: "#44ddff" }}
            >
              {game.peptideCodons[game.currentIdx] ?? "---"}
            </div>
          </div>

          {/* Timer – top right */}
          <div className="absolute top-4 right-6 text-white font-mono text-right">
            <div className="text-3xl font-bold tabular-nums" style={{ textShadow: "0 0 12px rgba(255,255,255,0.4)" }}>
              {formatTime(elapsedSec)}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {elapsedSec > 0 ? `${(game.builtAbbrevs.length / elapsedSec).toFixed(1)} aa/s` : "0.0 aa/s"}
            </div>
          </div>

          {/* Progress – top left */}
          <div className="absolute top-4 left-6 text-white font-mono">
            <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Peptide</div>
            <div className="text-lg font-bold">
              {game.currentIdx} <span className="text-gray-500">/ {PEPTIDE_LENGTH}</span>
            </div>
            {/* Mini progress bar */}
            <div className="mt-2 w-32 h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${(game.currentIdx / PEPTIDE_LENGTH) * 100}%`, background: "linear-gradient(90deg, #44ccff, #aa44ff)" }}
              />
            </div>
          </div>

          {/* Current amino acid info – right panel */}
          {currentAA && (
            <div className="absolute top-1/3 right-6 text-white font-mono text-right max-w-[140px]">
              <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Match this</div>
              <div className="text-2xl font-black" style={{ color: TYPE_COLORS[currentAA.type], textShadow: `0 0 16px ${TYPE_COLORS[currentAA.type]}88` }}>
                {currentAA.abbrev}
              </div>
              <div className="text-xs text-gray-300 mt-0.5">{currentAA.name}</div>
              <div className="text-[10px] text-gray-500 mt-1">{currentAA.codons.join(" · ")}</div>
            </div>
          )}

          {/* Built peptide chain label */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-mono text-center">
            <div className="text-[10px] text-gray-500 mb-1 uppercase tracking-widest">Building peptide</div>
            <div className="flex gap-1 justify-center flex-wrap max-w-xs">
              {game.builtAbbrevs.map((abbrev, i) => {
                const aa = AMINO_ACIDS[abbrev];
                return (
                  <span
                    key={i}
                    className="text-[9px] font-bold px-1 py-0.5 rounded"
                    style={{ background: `${TYPE_COLORS[aa.type]}40`, color: TYPE_COLORS[aa.type], border: `1px solid ${TYPE_COLORS[aa.type]}60` }}
                  >
                    {abbrev}
                  </span>
                );
              })}
              {Array.from({ length: PEPTIDE_LENGTH - game.builtAbbrevs.length }).map((_, i) => (
                <span key={`empty-${i}`} className="text-[9px] px-1 py-0.5 rounded border border-gray-700 text-gray-700">···</span>
              ))}
            </div>
          </div>

          {/* Feedback flash */}
          {feedback && (
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-200"
              style={{ background: feedback === "correct" ? "rgba(0,255,100,0.06)" : "rgba(255,0,0,0.08)", opacity: 1 }}
            />
          )}
        </>
      )}

      {/* ── START screen ── */}
      {game.phase === "start" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-lg px-6">
            <div className="text-6xl mb-4">🧬</div>
            <h1 className="text-4xl font-black text-white mb-2 tracking-tight" style={{ textShadow: "0 0 30px rgba(100,100,255,0.6)" }}>
              Ribosome Rush
            </h1>
            <p className="text-gray-300 mb-2 text-lg">Build a peptide as fast as you can!</p>
            <p className="text-gray-500 text-sm mb-6">
              A codon will appear. Click the matching amino acid to add it to your chain.<br />
              Prokaryotic ribosomes incorporate <span className="text-cyan-400 font-bold">20 aa/s</span> — can you keep up?
            </p>

            <div className="grid grid-cols-4 gap-2 mb-8 text-xs font-mono">
              {[
                { label: "Nonpolar", color: "#aaaaaa" },
                { label: "Polar", color: "#55cc55" },
                { label: "Positive", color: "#4488ff" },
                { label: "Negative", color: "#ff5555" },
              ].map(({ label, color }) => (
                <div key={label} className="flex items-center gap-1.5 justify-center">
                  <div className="w-3 h-3 rounded-full" style={{ background: color }} />
                  <span style={{ color }}>{label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={startGame}
              className="px-10 py-3 text-white font-bold text-lg rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg, #4444cc, #8833cc)", boxShadow: "0 0 30px rgba(100,50,200,0.5)" }}
            >
              Start Game
            </button>
          </div>
        </div>
      )}

      {/* ── END screen ── */}
      {game.phase === "end" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="text-center max-w-md px-8 py-10 rounded-2xl" style={{ background: "rgba(10,10,40,0.95)", border: "1px solid rgba(100,100,255,0.3)", boxShadow: "0 0 60px rgba(80,0,180,0.3)" }}>
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-3xl font-black text-white mb-6">Peptide Complete!</h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <StatBox label="Time" value={`${finalTimeSec.toFixed(1)}s`} color="#44ccff" />
              <StatBox label="Speed" value={`${speedAAS} aa/s`} color="#aa44ff" />
              <StatBox label="Accuracy" value={`${accuracy}%`} color="#55cc55" />
              <StatBox label="Errors" value={`${game.wrongClicks}`} color={game.wrongClicks === 0 ? "#55cc55" : "#ff5555"} />
            </div>

            {/* Comparison bar */}
            <div className="mb-6 text-left text-xs font-mono text-gray-400">
              <p className="mb-2 text-gray-300">Speed comparison:</p>
              <CompBar label="You" value={parseFloat(speedAAS)} max={22} color="#aa44ff" />
              <CompBar label="E. coli ribosome" value={20} max={22} color="#44ccff" />
              <CompBar label="Human ribosome" value={6} max={22} color="#55cc55" />
            </div>

            {/* Peptide sequence */}
            <div className="mb-6 text-xs font-mono text-gray-500">
              <p className="mb-1 text-gray-400">Your peptide:</p>
              <div className="flex gap-1 flex-wrap justify-center">
                {game.builtAbbrevs.map((abbrev, i) => {
                  const aa = AMINO_ACIDS[abbrev];
                  return (
                    <span key={i} className="px-1.5 py-0.5 rounded text-[10px] font-bold"
                      style={{ background: `${TYPE_COLORS[aa.type]}30`, color: TYPE_COLORS[aa.type] }}>
                      {abbrev}
                    </span>
                  );
                })}
              </div>
            </div>

            <button
              onClick={startGame}
              className="w-full py-3 text-white font-bold rounded-lg transition-all hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg, #4444cc, #8833cc)", boxShadow: "0 0 20px rgba(100,50,200,0.4)" }}
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {/* Legend – always visible */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-3 text-[10px] font-mono text-gray-400 pointer-events-none">
        {Object.entries(TYPE_COLORS).map(([type, color]) => (
          <span key={type} className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: color }} />
            <span style={{ color }}>{type}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── small UI helpers ─────────────────────────────────────────────────────────

function StatBox({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-lg p-3 text-center" style={{ background: `${color}15`, border: `1px solid ${color}40` }}>
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div className="text-2xl font-black" style={{ color }}>{value}</div>
    </div>
  );
}

function CompBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="flex items-center gap-2 mb-1.5">
      <span className="w-32 text-right truncate" style={{ color }}>{label}</span>
      <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span style={{ color }}>{value.toFixed(1)}</span>
    </div>
  );
}
