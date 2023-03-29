import '../App.css';
import React, { useState } from 'react';
import BingoCard from '../components/BingoCard'
import Confetti from 'react-confetti'
import { cardProps } from '../types';
import { BingoCardsArray, winningRulesArray } from '../constants';

const Bingo = () => {
  const [cards, setCards] = useState<cardProps[]>(BingoCardsArray);
  const [winningRules, setWinningRules] = useState<number[][]>(winningRulesArray);
  const [bingo, setBingo] = useState<boolean>(false);
  const [passedRules, setPassedRules] = useState<number[][]>([]);

  const celebrateBingo = () => {
    setBingo(true);
  }

  const checkIfBingo = () => {
    winningRules.forEach((rule: Array<number>) => {
      const result: boolean[] = [];
      rule.forEach((pattern: number) => {
        result.push(cards[pattern].completed);
      });
      if (!result.includes(false)) {
        celebrateBingo();

        const passedRule = winningRules.filter((r: Array<number>) => r === rule);
        setPassedRules([...passedRules, passedRule[0]]);
        const filteredRules = winningRules.filter((r: Array<number>) => r !== rule);
        setWinningRules(filteredRules);
      }
    });
  }

  const checkIfPassedRuleAffected = () => {
    const newWinningRules = [...winningRules];
    passedRules.forEach((rule) => {
      const result: boolean[] = [];
      rule.forEach((pattern: number) => {
        result.push(cards[pattern].completed);
      });
      if (result.includes(false)) {
        newWinningRules.push(rule);
        setWinningRules(newWinningRules);
      }
    });
  }

  const checkBox = (index: number) => {
    const changedCards = [...cards];
    const isMiddleCard = index === 12;
    if (!isMiddleCard) {
      setBingo(false);
      changedCards[index].completed = !changedCards[index].completed;
      if (!changedCards[index].completed) {
        checkIfPassedRuleAffected();
      }
    }
    setCards(changedCards);
    checkIfBingo();
  }

  const shuffleCards = () => {
    setCards(BingoCardsArray);
    const shuffledCards = [...cards];
    shuffledCards.forEach((card: cardProps) => (card.completed = false));
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
    shuffledCards[12].completed = true;
    setCards(shuffledCards);
  }

  const renderedCards = cards.map((value: cardProps, index: number) => {
    return (
      <BingoCard key={index} card={value} index={index} bingo={bingo} checkBox={checkBox} shuffle={shuffleCards}/>
    );
  });
    return (
      <div>
      <Confetti run={bingo} recycle={bingo} key={bingo ? 1 : 0}/>
    <div className="container">
      <h1>Bingo Game!</h1>
      <div className="cards-container">
        {renderedCards}
      </div>
    </div>
    </div>
    );
}

export default Bingo;
