import React from "react";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";

function StudyDeckView({deck, card, cardSide, cards, cardIndex, getDeck, setCardSideHandler}){ 
    const history = useHistory();
    //if the this is called the user will be prompted to either restart the cards or go to the home page
    const finalCardHandler = () => {
        const restart = window.confirm(
          "Restart Cards?\n\nClick 'OK' to restart, or 'Cancel' to return to the home page."
        );
        if (restart) {
          window.location.reload();
        } else {
          history.push("/");
        }
      };
    return <div>
        {/* if the cards is less than 3 than it will prompt the user to create more cards */}
        <h1>Study: {deck.name}</h1>
        {cards.length <=2 ? 
            <div> 
                <h2>Not enough cards.</h2>
                <p> You need at least 3 cards to study. There are {cards.length} cards in this deck</p>
                <NavLink to={`/decks/${deckId}/cards/new`} className="btn btn-primary"> +Add Cards</NavLink>
            </div>
            :
            //if the deck is 3 or more show the cards to study
            <div className="border">
                <div className="m-3">
                    <h3>Card {cardIndex} of {cards.length}</h3>
                {/* if the cardSide === 1 show the front otherwise show the back and the onClicks will help with flipping the cards */}
                {cardSide === 1 ?
                    <div>
                        <p>{card.front}</p>
                        <button onClick={()=>setCardSideHandler(2)} className="btn btn-secondary">Flip</button>
                    </div>
                    :
                    //on the back side the next button will appear
                    <div>
                        <p>{card.back}</p>
                        <button onClick={()=>setCardSideHandler(1)} className="btn btn-secondary">Flip</button>
                        {/* if on the final card then the next button will have a different action it will call the finalCardHandler */}
                        {cardIndex === cards.length ? 
                            <button onClick={finalCardHandler} className="btn btn-primary ml-2">Next</button> 
                            :
                            <button onClick={getDeck} className="btn btn-primary ml-2">Next</button> 
                        }
                    </div>
                    }
                </div>
            </div>
            }
    </div>
}

export default StudyDeckView;