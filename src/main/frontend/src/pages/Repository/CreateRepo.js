import React, { useState } from 'react';
import axios from 'axios';

const CreateRepo = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [gltfFile, setGltfFile] = useState(null); // 추가: glTF 파일 상태

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleFileChange = (event) => {
        setGltfFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('userId', localStorage.getItem("username"));
        formData.append('uploadDate', new Date().toISOString());
        formData.append('file', gltfFile); // 추가: glTF 파일 추가

        try {
            const response = await axios.post('http://localhost:8000/repository/savepost', formData, {
                headers: {
                    Authorization: localStorage.getItem("jwtToken"),
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data === "success") {
                alert("저장소 등록 성공!");
                window.location.href = "http://localhost:3000/repository";
            } else {
                alert("이미 존재하는 타이틀 입니다.")
            }
        } catch (error) {
            console.error(error);
            // alert('로그인 세션 만료! 다시 로그인하세요.');
            // window.location.href = "http://localhost:3000/";
        }
    };

    return (
        <div>
            <h1>작품 등록</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">작품 제목:</label><br />
                <input type="text" id="title" name="title" value={title} onChange={handleTitleChange} /><br />
                <label htmlFor="content">작품 설명:</label><br />
                <textarea id="content" name="content" value={content} onChange={handleContentChange} rows="4" cols="50" /><br />
                <label htmlFor="file">glTF 파일:</label><br />
                <input type="file" id="file" name="file" onChange={handleFileChange} /><br />
                <input type="submit" value="등록" />
            </form>
        </div>
    );
};

export default CreateRepo;
