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
    const [yPos, setYPos] = useState(0);
    const [xPos, setXPos] = useState(0);
    const [min2, setMin] = useState([Infinity, Infinity, Infinity]);
    const [max2, setMax] = useState([-Infinity, -Infinity, -Infinity]);

    const gltf = useLoader(GLTFLoader, url);
    const [scaleFactor, setScaleFactor] = useState(1);

    useEffect(() => {
        if (gltf) {
            const bbox = new THREE.Box3().setFromObject(gltf.scene);
            const min = bbox.min;
            const max = bbox.max;
            const miny = parseInt(min.y)
            const maxy = parseInt(max.y);

            console.log(bbox);
            console.log((miny + maxy)/2);
            console.log(miny);
            console.log(maxy);
            setYPos((miny + maxy) / 2 );
            setXPos(((min.x) + (max.x)) /2)
            console.log(((min.x) + (max.x)) /2);
            const size = new THREE.Vector3();
            bbox.getSize(size);
            const newScaleFactor = 4 / Math.max(size.x, size.y, size.z);
            setScaleFactor(newScaleFactor);
        };
    }, [gltf]);

    return (
        <>
            <primitive  position={[xPos, yPos, 0]} object={gltf.scene} scale={scaleFactor} />
        </>
    );
};


const ShowModel = () => {
    const [postData, setPostData] = useState(null);
    const params = useParams();
    const postId = params['postID'];
    const userId = localStorage.getItem('username');
    // const modelPath = "https://raw.githubusercontent.com/dwqdaiwenqi/react-3d-viewer/master/site/src/lib/model/DamagedHelmet.gltf";
    // const modelPath2 = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/WaterBottle/glTF/WaterBottle.gltf';
    // const modelPath3 ="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/DragonAttenuation/glTF/DragonAttenuation.gltf";
    // const modelPath4 = "http://localhost:8000/models/1.gltf";
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/repository/showpostByPostId", {
                    params: {
                        postId: postId
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
                            <Model url={postData['fileUrl']} />
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
