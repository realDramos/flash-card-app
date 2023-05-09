import React from "react";
import CardInfo from "./CardInfo";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { deleteDeck } from "../../utils/api";
import {useHistory } from "react-router-dom/cjs/react-router-dom.min";

function DeckInfo({deck, cards, deckId}){
    const history = useHistory();
    //will delete the deck when the user confirms their choice
    const useDeleteDeckHandler = async () => {
      const confirmDestroy = window.confirm(
        "Delete this Deck?\n\n You will not be able to recover it."
        );
        const abortController = new AbortController();
        if (confirmDestroy) {
          try {
            //when deleted it will send the user back to the home page if not it will reload the page
            await deleteDeck(deck.id, abortController.signal);
            history.push("/");
          } catch (error) {
            console.error(error);
          }
        } else {
          window.location.reload();
        }
        return ()=> abortController.abort();
      };
      
      return <div>
        <div>
          <h3>{deck.name}</h3>
          <p>{deck.description}</p>
          <NavLink to={`/decks/${deckId}/edit`} className="btn btn-secondary">Edit</NavLink>
          <NavLink to={`/decks/${deckId}/study`} className="btn btn-primary ml-1">Study</NavLink>
          <NavLink to={`/decks/${deckId}/cards/new`} className="btn btn-primary ml-1">Add Cards</NavLink>
          <button onClick={useDeleteDeckHandler} className="btn btn-danger ml-1">Delete</button>
          
        </div>
        <div>
            <h2>Cards</h2>
             {/* maps through the cards to show each card on the page in their separate block */}
                {cards.map(card=> <CardInfo card={card} key={card.id} deckId={deckId}/>)}     
        </div>
    </div>
}

export default DeckInfo;
