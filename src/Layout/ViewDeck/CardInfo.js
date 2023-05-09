import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { deleteCard } from "../../utils/api";

function CardInfo({card, deckId}){
    const [destroy, setDestroy] = useState(false);

    //this will delete the card when called
    useEffect(() => {
        async function deleteCardEffect() {
          const abortController = new AbortController();
          try {
            await deleteCard(card.id, abortController.signal);
          } catch (e) {
            console.error(e);
          }
          return () => {
            abortController.abort();
          };
        }
        if (destroy === true) {
          deleteCardEffect();
        }
      }, [destroy, deleteCard, card.id]);
      
      //when called it will prompt the user to confirm the the delete prompt
      const useDeleteCardHandler = () => {
        const confirmDestroy = window.confirm(
          "Delete this Card?\n\n You will not be able to recover it."
        );
        if (confirmDestroy) {
          setDestroy(true);
          window.location.reload();
        } else {
          window.location.reload();
        }
      };

    return <div className="border">
        <p>{card.front}</p>
        <p>{card.back}</p>
        <NavLink to={`/decks/${deckId}/cards/${card.id}/edit`}className="btn btn-secondary mr-1"> Edit</NavLink>
        <button onClick={useDeleteCardHandler} className="btn btn-danger">Delete</button>
    </div>
}

export default CardInfo;