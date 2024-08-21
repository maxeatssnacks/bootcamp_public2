import React from "react";
import PlayingCard from "./PlayingCard";
import { useAxios } from './hooks';
import "./PlayingCardList.css";

/* Renders a list of playing cards.
 * Can also add a new card at random. */
function PlayingCardList() {

  console.log("Rendering PlayingCardList");
  const [cards, addCard] = useAxios("https://deckofcardsapi.com/api/deck/new/draw/");

  console.log("Cards:", cards);

  return (
    <div className="PlayingCardList">
      <h3>Pick a card, any card!</h3>
      <div>
        <button onClick={() => addCard()}>Add a playing card!</button>
      </div>
      <div className="PlayingCardList-card-area">
        {cards.map(cardData => (
          <PlayingCard key={cardData.id} front={cardData.cards[0].image} />
        ))}
      </div>
    </div>
  );
}

export default PlayingCardList;
