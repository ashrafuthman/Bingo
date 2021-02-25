import {Transition} from 'react-spring/renderprops'
import './BingoCard.css';

function BingoCard(props) {
  return (
    <div onClick={() => props.checkBox(props.card, props.index)} className={ props.index === 12 ?  'card middle' : props.card.completed ? 'note card completed' : 'note card incomplete'} key={props.index}>
      <div className="card-number"> 
        {props.index}
      </div>
      <div className={
        props.index === 12
          ?
          'completed-card' : props.card.completed
            ?
            'card-description completed-text' : 'card-description'}> 
        <p>
          {
            props.bingo && props.index === 12
              ? <Transition  items={props.toggleSmilies}
                from={{
                  position: 'absolute',
                  opacity: 0, top: '10px',
                  right: '0px', left: '0px'
                }}
                width={100}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}>
                {toggle =>
                toggle
                ? props => <div style={props}>😄 Bingo!</div>
                : props => <div style={props}>🤪 Bingo!</div>
                }
              </Transition>
            :  props.index === 12 ? 'CONF CALL BINGO! 😄' : props.card.description
          }
            </p>
        </div>
    </div>
  )
}

export default BingoCard;