import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { useAuth } from "../context/AuthContext";

function BearModel() {
  const mountRef = useRef(null);
  const { user } = useAuth();
  const points = user?.points ?? 0;

  const bearModel =
    points >= 100
      ? "/beruangdewasa.glb"
      : points >= 50
        ? "/beruangremaja.glb"
        : "/beruangkecil.glb";
  useEffect(() => {
    // Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight,
    );
    mountRef.current.appendChild(renderer.domElement);
    camera.position.z = 3;

    // Pencahayaan
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    // Load model beruang
    const loader = new GLTFLoader();
    let bearObject = null;
    loader.load(bearModel, (gltf) => {
      gltf.scene.position.set(0, -0.5, 0);
      scene.add(gltf.scene);
      bearObject = gltf.scene;
    });

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (bearObject) {
        bearObject.rotation.y += 0.003;
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
    // Cleanup
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [bearModel]);

  return <div ref={mountRef} className="w-full h-full" />;
}

export default BearModel;
