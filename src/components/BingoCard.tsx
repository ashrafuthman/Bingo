import { useState } from 'react';
import { Transition } from 'react-spring/renderprops';
import { BingoCardProps, SmileyProps } from '../types';
import './BingoCard.css';

const BingoCard = ({
  index,
  card,
  bingo,
  shuffle,
  checkBox,
}: BingoCardProps) => {
  const isMiddleCard: boolean = index === 12;
  const [toggle, setToggle] = useState(false);

  const handleTransition = () => {
    checkBox(index);
    setToggle(!toggle);
  }
  return (
    <div
      onClick={ () =>
        isMiddleCard && !bingo ? shuffle() : handleTransition()
      }
      className={
        isMiddleCard
          ? 'card middle'
          : card.completed
          ? 'note card completed'
          : 'note card incomplete'
      }
      key={index}
    >
      <div className="card-number">{index}</div>
      <div
        className={
          isMiddleCard
            ? 'completed-card'
            : card.completed
            ? 'card-description completed-text'
            : 'card-description'
        }
      >
        <span>
          {bingo && isMiddleCard ? (
            <Transition
              items={toggle}
              from={{
                position: 'absolute',
                opacity: 0,
                top: '10px',
                right: '0px',
                left: '0px',
              }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {(toggle) =>
                toggle ? (
                  (props: SmileyProps) => (
                    <div style={props}>😄 Bingo!</div>
                  )
                ) : (
                  (props: SmileyProps) => (
                    <div style={props}>🤪 Bingo!</div>
                  )
                )
              }
            </Transition>
          ) : isMiddleCard ? (
            'Click to Shuffle 😄'
          ) : (
            card.description
          )}
        </span>
      </div>
    </div>
  );
};

export default BingoCard;
