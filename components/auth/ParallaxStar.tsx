// @ts-nocheck

import { View, Text } from "react-native";
import React, { useMemo, useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random'
import { Gyroscope, Accelerometer } from 'expo-sensors';
import gsap from "gsap";

function Stars() {
    const starRef = useRef(null)
    const sphere = useMemo(() => Float32Array.from(random.inCircle(new Float32Array(6000), { radius: 1.2 })), []);

    const [{ x, y, z }, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });

    const [subscription, setSubscription] = useState(null);
    Gyroscope.setUpdateInterval(16);
    const _subscribe = () => {
        setSubscription(
            Gyroscope.addListener(gyroscopeData => {
                setData(gyroscopeData);
            })
        );
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);


    // starRef.current.rotation.z = 0
    useFrame((state, delta) => {
        // console.log(state.clock.elapsedTime)
        starRef.current.rotation.z = starRef.current && state.clock.elapsedTime * 0.01

        gsap.to(starRef.current.rotation, {
            y: y * 0.03,
            x: x * 0.03,
            duration: 2
        })
    })


    return (
        <group rotation={[0, 0, 0]}>
            <Points ref={starRef} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial transparent color="#fff" size={0.005} sizeAttenuation={true} depthWrite={false} />
            </Points>
        </group>
    )
}

const ParallaxStar = () => {
    const canvasRef = useRef(null)
    const ref = useRef(null)
    const sphere = useMemo(() => Float32Array.from(random.inCircle(new Float32Array(6000), { radius: 1.2 })), []);

    useEffect(() => {
        return () => {
            canvasRef.current && canvasRef.current?.gl?.dispose()
            Gyroscope.removeAllListeners()
        }
    })

    return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            <Canvas ref={canvasRef} camera={{ position: [0, 0, 1] }}>
                <Stars />
            </Canvas>
        </View>
    );
};

export default ParallaxStar;
