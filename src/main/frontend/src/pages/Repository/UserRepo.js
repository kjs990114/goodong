import React from 'react';
import {Link} from "react-router-dom";

const UserRepo = () => {
    return(
        <div>
            User Repository has currently been empty! <br/>
            <Link to={"/repository/create"}>
                <button>Create Repository</button>
            </Link>
        </div>
    );
};

export default UserRepo;