import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Card from './Card';

const Deck = () => {
    const deckIdRef = useRef(null);
    const [cards, setCards] = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);
    const [isDeckReady, setIsDeckReady] = useState(false);

    useEffect(() => {
        shuffleDeck();
    }, []);

    const shuffleDeck = async () => {
        setIsShuffling(true);

        try {
            let response;
            if (deckIdRef.current) {
                response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckIdRef.current}/shuffle/`);
            } else {
                response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
            }
            deckIdRef.current = response.data.deck_id;
            setCards([]);
            setIsDeckReady(true);
        } catch (error) {
            console.error("Error shuffling deck:", error);
            setIsDeckReady(false);
        }

        setIsShuffling(false);
    };

    const drawCard = async () => {
        if (!deckIdRef.current) return;
        try {
            const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckIdRef.current}/draw/?count=1`);
            if (response.data.success) {
                setCards(prevCards => [...prevCards, response.data.cards[0]]);
            } else {
                throw new Error("No cards remaining");
            }
        } catch (error) {
            console.error("Error drawing card:", error);
            if (error.message === "No cards remaining") {
                alert("Error: no cards remaining!");
            }
        }
    };


    return (
        <>
            <button onClick={drawCard} disabled={!isDeckReady || isShuffling}>Draw a Card</button>
            <button onClick={shuffleDeck} disabled={isShuffling}>
                {isShuffling ? 'Shuffling...' : 'Shuffle Deck'}
            </button>
            <ul>
                {cards.map((card, index) => (
                    <li key={index}>
                        <Card src={card.image} alt={`${card.value} of ${card.suit}`} />
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Deck;