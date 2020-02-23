import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"

import "./styles.css"

/*
  Instructions:
    You're given a `useWindowDimensions` custom Hook. Your
    job is to finish implementing it. It should return
    an object with a `width` property that represents the current
    width of the window and a `height` property which represents
    the current height. 

    To get those values, you can use teh `window.addEventListener`
    API.https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event
*/

const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  })

  const handleChange = () => {
    return setDimensions({
      height: window.innerHeight,
      width: window.innerWidth
    })
  }

  useEffect(() => {
    window.addEventListener('resize', handleChange, true)

    return () => window.removeEventListener('resize', handleChange, true)
  })
 
  return dimensions
}


const App = () => {
  const { width, height } = useWindowDimensions()

  return (
    <div className="App">
      <h2>width: {width}</h2>
      <h2>height: {height}</h2>
      <p>Resize the window.</p>
    </div>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)

/**
 * tmg solution
 */

function useWindowDimensions() {
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  useEffect(() => {
    const listener = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }

    window.addEventListener('resize', listener)

    return () => window.removeEventListener('resize', listener)
  })

  return {width, height}
}


function App() {
  const { width, height } = useWindowDimensions()

  return (
    <div className="App">
      <h2>width: {width}</h2>
      <h2>height: {height}</h2>
      <p>Resize the window.</p>
    </div>
  )
}
