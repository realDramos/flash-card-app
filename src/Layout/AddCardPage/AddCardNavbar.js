import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

//the addCard page nav bar i set it in a different component to make it cleaner
function AddCardNavbar({deck}){
    return<div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item">Add Card</li>
            </ol>
        </nav>
        <div>
        <h1>Add Card</h1>
        </div>
    </div>
}

export default AddCardNavbar;