import React from "react";
import HomeDecks from "./HomeDecks";
import { useState, useEffect } from "react";
import { listDecks } from "../../utils/api";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function Home(){

  const [decks, setDecks] = useState([])
  //gets all the decks to list them all
  useEffect(()=>{
    const abortController = new AbortController();

    async function getDecks() {
      try {
        let response = await listDecks( abortController.signal);
        setDecks(response);
      } catch (e) {
        if (e.name === 'AbortError') {
          // abort errors are expected, so don't worry about it
          console.log('abort error');
        } else {
          throw e;
        }
      }
    }
    getDecks();
    return () => {
        abortController.abort();
    }
  },[])

    return <div>
       {/* this is the create button that send user to create new deck */}
      <div>
        <NavLink to={`/decks/new`} className="btn btn-primary">+ Create Deck</NavLink>
      </div>
      <div>
        {/* maps through the decks to create their own block*/}
        {decks.map(deck => <HomeDecks deck={deck} key={deck.id}/>) }
      </div>
        
    </div>
}

export default Home;