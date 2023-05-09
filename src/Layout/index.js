import React from "react";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home/Home"
import Study from "./Study-Page/Study"
import CreateDeck from "./DecksCreatePage/CreateDeck";
import Deck from "./ViewDeck/Deck";
import EditDeck from "./EditDeckPage/EditDeck";
import EditCard from "./EditCardPage/EditCard";
import AddCard from "./AddCardPage/AddCard";


function Layout() {
  // has all the routes in this file
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
            <Route exact={true} path="/">
              <Home />
            </Route>
            <Route path="/decks/:deckId/study">
              <Study/>
            </Route>
            <Route path="/decks/:deckId/cards/new">
              <AddCard/>
            </Route>
            <Route path="/decks/:deckId/cards/:cardId/edit">
              <EditCard/>
            </Route>
            <Route path="/decks/new">
              <CreateDeck/>
            </Route> 
            <Route path="/decks/:deckId/edit">
              <EditDeck/>
            </Route>
            <Route path="/decks/:deckId">
              <Deck/>
            </Route>
             <Route>
              <NotFound />
            </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default Layout;
