import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const ShowRepo = () => {
    const [repoData, setRepoData] = useState(null);

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
                console.error('Error fetching repository data:', error);
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
