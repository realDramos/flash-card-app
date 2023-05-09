import React, { useEffect, useState } from "react";
import EditNavBar from "./EditNavBar";
import EditView from "../EditDeckPage/EditView"
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { readDeck } from "../../utils/api";

function EditDeck(){
    const {deckId} = useParams();
    const [deck, setDeck] = useState({})
  //calling a readDeck function to get the deck
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
        <EditNavBar deck={deck} />
        {/* conditional rendering if deck.id exists render EditView */}
       {deck.id && < EditView deck={deck} />}
    </div>
};

export default EditDeck;