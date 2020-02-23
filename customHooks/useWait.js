import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";

import "./styles.css";

/*
  Instructions:
    Finish implementing the `useWait` custom Hook.
    `useWait` should return a boolean that changes from
    `false` to `true` after `delay` seconds. 
*/

const useWait = (delay = 0) => {
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFinished(true)
    }, delay);

    const cleanup = () => clearTimeout(timer)

    return cleanup
  })

  return isFinished
}

const Wait = ({ delay = 1000, placeholder, ui }) => {
  const show = useWait(delay)

  return show === true
    ? ui
    : placeholder
}

const App = () => {
  return (
    <div className="App">
      <Wait
        delay={3000}
        placeholder={<p>Waiting...</p>}
        ui={<p>This text should appear after 3 seconds.</p>}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

/**
 * tmg solution
 */


function useWait (delay) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => {
      setShow(true)
    }, delay)
    
    return () => window.clearTimeout(id)
  }, [delay])

  return show
}

function Wait({ delay = 1000, placeholder, ui }) {
  const show = useWait(delay)

  return show === true
    ? ui
    : placeholder
}

function App() {
  return (
    <div className="App">
      <Wait
        delay={3000}
        placeholder={<p>Waiting...</p>}
        ui={<p>This text should appear after 3 seconds.</p>}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
