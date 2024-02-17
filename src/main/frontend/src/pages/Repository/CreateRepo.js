import React, { useState } from 'react';
import axios from 'axios';

const CreateRepo = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const postDTO = {
            title: title,
            content: content,
            userId: localStorage.getItem("username"),
            uploadDate: new Date().toISOString()
        };

        try {
            const response = await axios.post('http://localhost:8000/repository/savepost', postDTO, {
                headers: {
                    Authorization: localStorage.getItem("jwtToken")
                }
            });
            if (response.data === "success") {
                alert("저장소 등록 성공!");
                window.location.href = "http://localhost:3000/repository";
            } else {
                alert("이미 존재하는 타이틀 입니다.")
            }
        } catch (error) {
            alert('로그인 세션 만료! 다시 로그인하세요.');
            window.location.href = "http://localhost:3000/";
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
                <input type="submit" value="등록" />
            </form>
        </div>
    );
};

export default CreateRepo;
