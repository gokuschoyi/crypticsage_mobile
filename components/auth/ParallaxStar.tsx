import React, { useEffect, useMemo, useCallback } from 'react';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import * as THREE from 'three';
import { Renderer, TextureLoader } from 'expo-three';
import * as random from 'maath/random'
import { Accelerometer } from 'expo-sensors';
import { useFocusEffect } from '@react-navigation/native';
import gsap from "gsap";

export default function ThreeJsScreenView() {
    let x = 0;
    let y = 0;
    useEffect(() => {
        Accelerometer.setUpdateInterval(16);
        const subscription = Accelerometer.addListener((data) => {
            x = data.x;
            y = data.y;
        });

        return () => {
            subscription && subscription.remove();
        };
    }, []);

    let timeout: number;

    const sphere = useMemo(() => Float32Array.from(random.inCircle(new Float32Array(6000), { radius: 1.2 })), []);

    useFocusEffect(
        useCallback(() => {
            // console.log('focused')
            return () => {
                // console.log('unfocused')
                cancelAnimationFrame(timeout);
            };
        }, [])
    );

    const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
        const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
        const sceneColor = '#000';

        // Create a WebGLRenderer without a DOM element
        const renderer = new Renderer({ gl });
        renderer.setSize(width, height);
        renderer.setClearColor(sceneColor);

        const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 2000);
        camera.position.z = 1

        const starsGeometry = new THREE.BufferGeometry();
        starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(sphere, 3));
        const texture = new TextureLoader().load(require('../../assets/images/circle.png'));
        const starMaterials = new THREE.PointsMaterial({
            color: 0x888888,
            size: 0.005,
            transparent: true,
            sizeAttenuation: true,
            depthWrite: false,
            map: texture
        });

        const starField = new THREE.Points(starsGeometry, starMaterials);

        const scene = new THREE.Scene();

        scene.add(starField);

        const clock = new THREE.Clock();
        const update = () => {
            const elapsedTime = clock.getElapsedTime();
            starField.rotation.z = elapsedTime * 0.01;
            gsap.to(starField.rotation, {
                x: y * 0.3,
                y: -x * 0.3,
                duration: 2
            })
        };

        // Setup an animation loop
        const render = () => {
            timeout = requestAnimationFrame(render);
            update();
            try {
                renderer.render(scene, camera);
            } catch (error) {
                console.log('error', error)
                cancelAnimationFrame(timeout);
            }
            gl.endFrameEXP();
        };
        render();
    };

    return (
        <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} key="d" />
    );
}