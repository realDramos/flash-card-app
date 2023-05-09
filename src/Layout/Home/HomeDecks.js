import React, { useState, useEffect} from "react";
import { NavLink} from "react-router-dom/cjs/react-router-dom.min";
import { deleteDeck } from "../../utils/api/index";

function HomeDecks({deck}){
    const [destroy, setDestroy] = useState(false);
    //this is the delete function when the user clicks delete button and confirms it. The deck will be deleted and then the page will reload to reflect the change
    useEffect(() => {
      async function deleteDeckEffect() {
        const abortController = new AbortController();
        try {
          await deleteDeck(deck.id, abortController.signal);
        } catch (e) {
          console.error(e);
        }
        return () => {
          abortController.abort();
        };
      }
      if (destroy === true) {
        deleteDeckEffect();
      }
    }, [destroy, deleteDeck, deck.id]);
  
    const useDeleteDeckHandler = () => {
      const confirmDestroy = window.confirm(
        "Delete this Deck?\n\n You will not be able to recover it."
      );
      if (confirmDestroy) {
        setDestroy(true);
        window.location.reload();
      } else {
        window.location.reload();
      }
    };
      

    return (
        <div className="border mt-2">
            <div className="m-3">
            <div>
                <h3>{deck.name}</h3> 
                <p>{deck.cards.length} cards</p>
            </div>
                <p>{deck.description}</p>
            
                <NavLink to={`/decks/${deck.id}`} className="btn btn-secondary">View</NavLink>
                <NavLink to={`/decks/${deck.id}/study`} className="btn btn-primary ml-3">Study</NavLink>
                <button onClick={useDeleteDeckHandler} className="btn btn-danger">Delete</button>
            </div>
        </div>
    )
}
export default HomeDecks;