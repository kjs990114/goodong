import React, { useEffect, useState } from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import '../../styles/ShowRepo.css'

const ShowRepo = () => {
    const [repoData, setRepoData] = useState(null);
    const navigate = useNavigate();
    const { userID } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/repository/showpost', {
                    params: {
                        username: userID
                    }
                });
                if (response.data.length !== 0) {
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
        <div className="container">
            {repoData ? (
                <div>
                    <div className={"repo-header"}>
                        <span className={"repo-username"}>kjs990114</span>
                        <Link to="/repository/create">
                            <button className="btn-create">New</button>
                        </Link>
                    </div>


                    <hr/>
                    <ul>
                        {repoData.map((item, index) => (
                            <Link className={"repo-link"} to={`/${item.userId}/repository/${item.postId}`} key={index}>
                                <div className="repo-item">
                                    <span>{item.title}</span>
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
            <hr/>
        </div>
    );
};

export default ShowRepo;
