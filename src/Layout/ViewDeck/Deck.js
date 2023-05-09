import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { readDeck } from "../../utils/api/index";
import DeckInfo from "./DeckInfo";

function Deck(){
    const {deckId} = useParams();
    const [deck, setDeck] = useState({})
    const [cards, setCards] = useState([])
    
    //if will get the deck to show it on screen
    useEffect(() => {
        async function getDeck() {
          const abortController = new AbortController();
          try {
            const data = await readDeck(deckId, abortController.signal);
            setDeck(data);
            setCards([...data.cards]);
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
        <NavBar deck={deck}/>
        <DeckInfo deck={deck} cards={cards} deckId={deckId}/>
    </div>
}

export default Deck;