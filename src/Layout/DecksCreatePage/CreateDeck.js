import React from "react";
import CreateDeckNavBar from "./CreateDeckNavBar";
import CreateDeckView from "./CreateDeckView";

//set it in 2 components to keep it cleaner
function CreateDeck(){
    return <div>
        <CreateDeckNavBar/>
        <CreateDeckView/>
    </div>
}

export default CreateDeck; 