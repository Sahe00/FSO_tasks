import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return(
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
  )
}

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

const Statistics = ({good, neutral, bad}) => { 
  if (good + neutral + bad === 0) {
    return (
      <div>
        <Header text='statistics'/>
        <p> No feedback given </p>
      </div>
    )
  }
  return (
    <div>
        <Header text='statistics'/>
        <table>
          <tbody>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='all' value={good + neutral + bad} />
            <StatisticLine text='average' value={((good * 1) + (neutral * 0) + (bad * -1)) / (good + neutral + bad)} />
            <StatisticLine text='positive' value={`${good / (good + neutral + bad) * 100} %`} />
          </tbody>
        </table>
    </div>
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
      <Statistics good={good} neutral={neutral} bad={bad} />
      
    </div>
  )
}

export default App