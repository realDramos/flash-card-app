import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
function StudyDeckNavBar({deck}){
    return <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item">Study</li>
            </ol>
        </nav>
    </div>
}

export default StudyDeckNavBar;