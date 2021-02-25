import './App.css';
import React from 'react';
import Confetti from 'react-confetti'
import BingoCard from './components/BingoCard'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      cards: [
        {
          completed: false,
          description: 'Task A'
        },
        {
          completed: false,
          description: 'Task B'
        },
        {
          completed: false,
          description: 'Task C'
        },
        {
          completed: false,
          description: 'Task D'
        },
        {
          completed: false,
          description: 'Task E'
        },
        {
          completed: false,
          description: 'Task F'
        },
        {
          completed: false,
          description: 'Task G'
        },
        {
          completed: false,
          description: 'Task H'
        },
        {
          completed: false,
          description: 'Task I'
        },
        {
          completed: false,
          description: 'Task J'
        },
        {
          completed: false,
          description: 'Task K'
        },
        {
          completed: false,
          description: 'Task L'
        },
        {
          completed: true,
          description: 'Task M'
        },
        {
          completed: false,
          description: 'Task N'
        },
        {
          completed: false,
          description: 'Task O'
        },
        {
          completed: false,
          description: 'Task P'
        },
        {
          completed: false,
          description: 'Task Q'
        },
        {
          completed: false,
          description: 'Task R'
        },
        {
          completed: false,
          description: 'Task S'
        },
        {
          completed: false,
          description: 'Task T'
        },
        {
          completed: false,
          description: 'Task U'
        },
        {
          completed: false,
          description: 'Task V'
        },
        {
          completed: false,
          description: 'Task W'
        },
        {
          completed: false,
          description: 'Task X'
        },
        {
          completed: false,
          description: 'Task Y'
        }
      ],
      winningRules: [
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],
        [0, 5, 10, 15, 20],
        [1, 6, 11, 16, 21],
        [2, 7, 12, 17, 22],
        [3, 8, 13, 18, 23],
        [4, 9, 14, 19, 24],
        [4, 8, 12, 16, 20],
        [0, 6, 12, 18, 24]
      ],
      bingo: false,
      passedRules: [],
      toggleSmilies:false
    };
  }
  celebrateBingo = () => {
    this.setState({bingo: true})
  }

  checkIfBingo = () => {
    this.toggleSmilies()
    const winningRules = this.state.winningRules;
    const passedRules = this.state.passedRules;
    winningRules.forEach((rule) => {
      const result = [];
      rule.forEach((pattern) => {
        result.push(this.state.cards[pattern].completed)
      })
      if (!result.includes(false)) {
        this.celebrateBingo();

        const passedRule = winningRules.filter( r => r === rule)
        passedRules.push(passedRule[0]);
        const filteredRules = winningRules.filter( r => r !== rule)
        this.setState({winningRules: filteredRules})
        this.setState({passedRules: passedRules})
      }
    })
  }
  checkIfPassedRuleAffected = () => {
    const winningRules = this.state.winningRules;
    const passedRules = this.state.passedRules;
    if (passedRules.length > 0) {
      passedRules.forEach((rule) => {
        const result = [];
        rule.forEach((pattern) => {
          result.push(this.state.cards[pattern].completed)
        })
        if (result.includes(false)) {
          winningRules.push(rule)
          this.setState({winningRules: winningRules})
        }
      })
    }
  }

  checkBox = (value, index) => {
    const changedCards = this.state.cards;
    if (index !== 12) {
      this.setState({bingo: false})
      changedCards[index].completed =  !changedCards[index].completed
      if (!changedCards[index].completed) {
        this.checkIfPassedRuleAffected();
      }
    }
    this.setState({cards: changedCards})
    this.checkIfBingo();
  }
  toggleSmilies = () => {
    this.setState({toggleSmilies: !this.state.toggleSmilies})
  }
  render() {
    const cards = [];
    this.state.cards.forEach((value, index) => {
        cards.push(
          <BingoCard
            card={value}
            index={index}
            bingo={this.state.bingo}
            checkBox={this.checkBox}
            toggleSmilies={this.state.toggleSmilies}/>
        )
    })

    return (
      <div>
        <Confetti run={this.state.bingo} recycle={!this.state.bingo} key={this.state.bingo ? 1 : 0}/>
      <div className="container">
        <h1>Bingo Game!</h1>
        <div className="cards-container">
          {cards}
        </div>
      </div>
      </div>
    );
  }
}

export default App;
