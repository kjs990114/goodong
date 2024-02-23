import React, {useEffect, useState, Suspense, useRef} from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import {Canvas, useThree} from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {Environment, OrbitControls} from '@react-three/drei';
import * as THREE from 'three';
import '../../styles/Canvas.css';



const Model = ({url}) => {
    const gltf = useLoader(GLTFLoader, url);
    const [scaleFactor, setScaleFactor] = useState(1);
    const [yPos, setYPos] = useState(0);

    useEffect(() => {
        if (gltf) {
            const bbox = new THREE.Box3().setFromObject(gltf.scene);
            const min = bbox.min;
            const max = bbox.max;
            const miny = parseInt(min.y)
            const maxy = parseInt(max.x);
            setYPos((miny + maxy) / 2 );

            const size = new THREE.Vector3();
            bbox.getSize(size);
            const newScaleFactor = 4 / Math.max(size.x, size.y, size.z);
            setScaleFactor(newScaleFactor); // scaleFactor 변경 후
        }
    }, [gltf]);

    return (
        <>
            <primitive  position={[0, yPos, 0]} object={gltf.scene} scale={scaleFactor} />
        </>
    );
};


const ShowModel = () => {
    const [postData, setPostData] = useState(null);
    const params = useParams();
    const modelPath = "https://raw.githubusercontent.com/dwqdaiwenqi/react-3d-viewer/master/site/src/lib/model/DamagedHelmet.gltf";
    const modelPath2 = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/WaterBottle/glTF/WaterBottle.gltf';
    const modelPath3 ="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/DragonAttenuation/glTF/DragonAttenuation.gltf";
    const modelPath4 = "http://localhost:8000/models/1.gltf";
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/repository/showpostByPostId", {
                    params: {
                        postId: params["postID"]
                    }
                });
                console.log(response.data);
                setPostData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [params]); // Only run useEffect when `params` changes

    return (
        <div id={"model-canvas"} >
        {postData ? (
            <>

            <div id={"title"}>{postData.title} </div>
                <hr/>
                <div id={"canvas-container"}>
                    <Canvas>
                        <OrbitControls/>
                        <Environment preset="city" background blur={1} />
                        <Suspense>
                            <Model url={modelPath4} />
                        </Suspense>
                    </Canvas>
                </div>
                <div id={"content-container"}>
                    <div id={"content-description"}>Description</div>
                    <hr id={"readme"}/>
                    <div id={"content"}>
                        {postData.content}
                    </div>
                </div>
            </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ShowModel;
