import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function CreateDeckNavBar(){
    return <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item">Create Deck</li>
            </ol>
        </nav>
    </div>
}

export default CreateDeckNavBar;