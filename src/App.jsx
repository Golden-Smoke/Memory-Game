import { useState,useEffect } from 'react'
import MemoryBox from './MemoryBox.jsx'
import icons from "./icons.js"
import "./styles.css"
import Confetti from "react-confetti"

function App() {
  const [boxes,setBoxes] = useState(icons)
  const [firstSelect,setFirstSelect] = useState(null)
  const [secondSelect,setSecondSelect] = useState(null)
  const [win,setWin] = useState(false)

  useEffect(() =>{
    setTimeout(() =>{
      if(firstSelect){
        if(firstSelect.pair === secondSelect.pair){ 
          console.log("Matched!")
          setBoxes(prevBoxes =>{
            return prevBoxes.map(box => box.pair === firstSelect.pair || box.pair ===  secondSelect.pair ? {...box,isCompleted:true} : box)
          })
          setFirstSelect(null)
          setSecondSelect(null)
        }
        else{
          console.log("Not matched!")
          setBoxes(prevBoxes =>{
            return prevBoxes.map(box => firstSelect || secondSelect ? {...box,isSelected:false} : box)
          })
          setFirstSelect(null)
          setSecondSelect(null)
        }
      }
    },1000)
    
  },[secondSelect])

  useEffect(() =>{
    const isWon = boxes.every(box => box.isCompleted)
    setWin(isWon)
  },[boxes])

  const memoryBoxes = boxes.map(icon => <MemoryBox key={icon.id} box={icon} handleClick={() =>selectBox(icon.id)}/>)

  function selectBox(id){
    const selectedBox = boxes.find(box => box.id === id)
    if(!firstSelect){
      setFirstSelect(selectedBox)
      console.log("First selected : " + selectedBox.pair)
      const newBoxes = boxes.map(box =>{ 
        return box.id === id ? {...box,isSelected:true} : box
      })
      setBoxes(newBoxes)
      return
    }

    if(!secondSelect){
      setSecondSelect(selectedBox)
      console.log("Second selected : " + selectedBox.pair)
      const newBoxes = boxes.map(box =>{ 
        return box.id === id ? {...box,isSelected:true} : box
      })
      setBoxes(newBoxes)
    } 
  }
  function restartGame(){
    setBoxes(icons)
  }
  return (
    <>
      {win && <Confetti/>}
      <div className="game-container">
        {memoryBoxes}
      </div>
      {win && <div className={`overlay ${win ? "won" : "pending"}`}></div>}
      <button className={`btn--end-game ${win ? "won" : "pending"}`} onClick={restartGame}>Play Again</button>
    </>
  )
}

export default App
