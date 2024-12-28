import { useState } from 'react'
import Card from './components/Card';
import './App.css'

function App() {
  const [score, setScore] = useState({current: 0, highest: 0});
  const [cards, setCards] = useState([{id: 0, clicked: false}, {id: 1, clicked: false}, {id: 2, clicked: false}, {id: 3, clicked: false}, {id: 4, clicked: false}, {id: 5, clicked: false}, {id: 6, clicked: false}, {id: 7, clicked: false}, {id: 8, clicked: false}, {id: 9, clicked: false}, {id: 10, clicked: false}, {id: 11, clicked: false}]);
  const [animationKey, setAnimationKey] = useState(0);
  const [rightAnswer, setRightAnswer] = useState(null);
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const handleInfoClick = () => {
    setShowInfoWindow(!showInfoWindow);
  }

  const resetCards = () => {
    return [{id: 0, clicked: false}, {id: 1, clicked: false}, {id: 2, clicked: false}, {id: 3, clicked: false}, {id: 4, clicked: false}, {id: 5, clicked: false}, {id: 6, clicked: false}, {id: 7, clicked: false}, {id: 8, clicked: false}, {id: 9, clicked: false}, {id: 10, clicked: false}, {id: 11, clicked: false}];
  }

  const mixCards = (id, arr) => {
    let newArr = [];
    while (arr.length > 0) {
      const randomIndex = Math.floor(Math.random() * 16);
      if (arr[randomIndex] !== undefined) {
        newArr.push(arr.splice(randomIndex, 1)[0]);
      }
    }
    newArr.find(card => card.id === id).clicked = true;
    return newArr;
  }

  return (
    <div className="webpage-container">
      <div className={`info-window-container ${showInfoWindow ? "show-window" : ""}`}>
        <div className={`info-window`}>
          <div className='info-header'>Information</div>
          <div className="info-text">Welcome to Memory Card game! Your goal is to score 12 points after which game resets. You have to click every card only once, otherwise game ends and you lose your current score. Good luck!</div>
          <button className='close-btn' onClick={handleInfoClick}>Close</button>
        </div>
      </div>
      <div key={animationKey} className={`answer-window ${rightAnswer ? "right-answer-window" : rightAnswer === false ? "false-answer-window" : ""}`}>
        <div className="answer-window-text">{rightAnswer ? 'Right' : rightAnswer === false ? 'False' : ''}</div>
      </div>
      <nav className="nav-section">
        <ul className="nav-items">
          <li className="nav-item" style={{'paddingLeft': '45px', 'marginRight': 'auto', 'cursor': 'pointer'}} onClick={handleInfoClick}>Info</li>
          <li className="nav-item score"><span key={animationKey} className={`${rightAnswer ? "right-answer-score" : rightAnswer === false ? "false-answer-score" : ""}`}>Score: {score.current}</span></li>
          <li className="nav-item score" style={{'paddingRight': '45px'}}>Highest Score: {score.highest}</li>
        </ul>
      </nav>
      <main className="main-section"> 
        {cards.map((card) => {
          return <Card key={card.id} id={card.id} score={score} card={card} cards={cards} setScore={setScore} setCards={setCards} resetCards={resetCards} mixCards={mixCards} setRightAnswer={setRightAnswer} setAnimationKey={setAnimationKey}/>
        })}
      </main>
      <footer className="footer-section">
        <ul className="footer-items">
          <li className="footer-item"><a href="https://github.com/deseyo/memory-card.git" target="_blank">Github</a><img className="github-icon" src="../public/github.svg" alt="" /></li>
        </ul>
      </footer>
    </div>
  )
}

export default App
