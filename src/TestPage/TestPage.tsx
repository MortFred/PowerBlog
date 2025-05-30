import * as THREE from "three";
import { useEffect, useRef } from "react";

export function TestPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, premultipliedAlpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    useEffect(() => {
        if (!containerRef.current) return;
        let animationFrameId = 0;

        containerRef.current.appendChild(renderer.domElement);

        function animate() {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            // animationFrameId = requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }

        renderer.setAnimationLoop(animate);

        // Cleanup function
        return () => {
            // Stop animation
            cancelAnimationFrame(animationFrameId);

            if (renderer.domElement.parentElement) {
                renderer.domElement.parentElement.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
}
