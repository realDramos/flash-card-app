import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function EditCardNavBar({deck, cardId}){
    return <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>Deck {deck.name}</Link></li>
                <li className="breadcrumb-item">Edit Card {cardId}</li>
            </ol>
        </nav>
    </div>
}

export default EditCardNavBar;