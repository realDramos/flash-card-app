import React, { useEffect, useState } from "react";
import AddCardNavbar from "./AddCardNavbar"
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { readDeck } from "../../utils/api";
import AddCardView from "./AddCardView";

//this is the AddCard parent component I call read deck to access the correct card from the correct deck
function AddCard(){
    const {deckId} = useParams();
    const [deck, setDeck] = useState({})

    useEffect(() => {
        async function getDeck() {
          const abortController = new AbortController();
          try {
            const data = await readDeck(deckId, abortController.signal);
            setDeck(data);
          } catch (e) {
            console.error(e);
          }
          return () => {
            abortController.abort();
          };
        }
        getDeck();
      }, [deckId]);


    return <div>
        <AddCardNavbar deck={deck}/>
        <AddCardView deck={deck} />
    </div>
}

export default AddCard;