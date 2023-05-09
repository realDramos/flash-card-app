import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom/cjs/react-router-dom.min";
import { readDeck } from "../../utils/api";
import StudyDeckView from "./StudyDeckView";
import StudyDeckNavBar from "./StudyDeckNavBar";


function Study (){
  const {deckId} = useParams();
  const [deck , setDeck] = useState({});
  const [card , setCard] = useState({});
  const [cardSide , setCardSide] = useState(1);
  const [cardIndex , setCardIndex] = useState(0);
  const [cards , setCards] = useState([]);

  //get the deck for the page
  async function getDeck() {
    const abortController = new AbortController();
    try {
      const data = await readDeck(deckId);
      setDeck(data);
      setCard(data.cards[cardIndex]);
      setCardIndex(cardIndex + 1);
      setCards(data.cards);
      setCardSide(1);
    } catch (e) {
      console.error(e);
    }
    return () => {
      abortController.abort();
    };
  }
      
  useEffect(() => {
      getDeck();
  }, [deckId])
        
  const setCardSideHandler = (number)=> setCardSide(number);

  return <div>
      <StudyDeckNavBar deck={deck}/>
      {/* sends setCardSideHandler so that the state can be uplifted */}
      <StudyDeckView deck={deck} card={card} cardSide={cardSide} cards={cards} 
        cardIndex={cardIndex} getDeck={getDeck} setCardSideHandler={setCardSideHandler}
      />
  </div>
}

export default Study;
