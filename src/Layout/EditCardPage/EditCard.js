import React, { useEffect, useState } from "react";
import EditCardNavBar from "./EditCardNav";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { readCard, readDeck } from "../../utils/api";
import EditCardView from "./EditCardView";
import EditAddCard from "../EditAddCard";


function EditCard(){
  //taking the cardId and deckId from the url
    const {deckId} = useParams();
    const {cardId} = useParams();
    const [deck, setDeck] = useState({})
    const [card, setCard] = useState({})

    //this will send a get request to for the deck
    useEffect(() => {
        async function getDeck() {
          const abortController = new AbortController();
          try {
            const data = await readDeck(deckId, abortController.signal);
            setDeck(data);
          } catch (e) {
            console.error(e);
          }
          return () => abortController.abort();
        }
        getDeck();
      }, [deckId]);

      //this will send a get request to for the given card
      useEffect(()=>{
        async function getCard(){
            const abortController = new AbortController();
            try{
                const data = await readCard(cardId, abortController.signal);
                setCard(data)
            } catch(e){
                console.error(e);
            }
            return ()=> abortController.abort();
        }
        getCard();
    },[cardId])
    

    return <div>
        <EditCardNavBar deck={deck} cardId={cardId}/>
        {/* conditional rendering if card.id exists then render EditCard View */}
        {card.id && <EditAddCard deckId={deckId} card={card} addCard={false}/>}
    </div>
}

export default EditCard;