import React, { useEffect, useState } from 'react';
import { Link, useNavigate  } from "react-router-dom";
import axios from 'axios';

const ShowRepo = () => {
    const [repoData, setRepoData] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/repository/showpost', {
                    headers: {
                        Authorization: localStorage.getItem("jwtToken")
                    }
                });
                if(response.data.length != 0) {
                    setRepoData(response.data);
                }
            } catch (error) {
                alert("로그인이 필요합니다.");
                navigate('/');
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            {repoData ? (
                <div>
                    <h2>Repository Data:</h2>
                    <ul>
                        {repoData.map((item, index) => (
                            <li key={index}>
                                Title: {item.title}, Content: {item.content}, Upload Date: {item.uploadDate}, User ID: {item.userId}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    User Repository is currently empty!<br />
                    <Link to={"/repository/create"}>
                        <button>Create Repository</button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ShowRepo;
