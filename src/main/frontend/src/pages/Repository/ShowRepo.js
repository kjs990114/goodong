import React, { useEffect, useState } from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from 'axios';

const ShowRepo = () => {
    const [repoData, setRepoData] = useState(null);
    const navigate = useNavigate();
    const {userID} = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/repository/showpost', {
                    // headers: {
                    //     Authorization: localStorage.getItem("jwtToken")
                    // },
                    params : {
                        username : userID
                    }
                });
                if(response.data.length != 0) {
                    console.log(response.data);
                    setRepoData(response.data);
                }
            } catch (error) {
                alert("로그인이 필요합니다.");
                console.log(error);
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
                            <Link to={`/${item.userId}/repository/${item.postId}`}>
                                <div>
                                    <a>Title: {item.title}, Content: {item.content}, Upload Date: {item.uploadDate}, User ID: {item.userId}</a>
                                </div>
                            </Link>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    User Repository is currently empty!<br />
                </div>
            )}
            <Link to={"/repository/create"}>
                <button>Create Repository</button>
            </Link>
        </div>
    );
};

export default ShowRepo;
