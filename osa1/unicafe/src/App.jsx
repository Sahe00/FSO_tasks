import { useState } from 'react'

const Display = props => <div>{props.value}</div>

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Button = ({ handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    console.log("good clicked", good)
  }
  
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    console.log("neutral clicked", neutral)
  }
  
  const handleBadClick = () => {
    setBad(bad + 1)
    console.log("bad clicked", bad)
  }

  return (
    <div>
      <div>
        <Header text='give feedback'/>
        <Button handleClick={handleGoodClick} text='good' />
        <Button handleClick={handleNeutralClick} text='neutral' />
        <Button handleClick={handleBadClick} text='bad' />
      </div>

      <div>
        <Header text='statistics'/>
        <Display value={`good ${good}`} />
        <Display value={`neutral ${neutral}`} />
        <Display value={`bad ${bad}`} />
      </div>
    </div>
  )
}

export default App