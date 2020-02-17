import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

/*
  Instructions:
    Assume you're creating an app that allows the user to 
    post status updates (ala Twitter). Your UI should have a
    textarea and a button. The button should be disabled if the
    length of the textarea is 0 or greater than 240 characters.
    The document's title should inform the user on how many
    characters they have left to type before they hit the 240
    character limit - "115 characters left."
*/

const App = () => {
  const [text, setText] = useState("");
  let charCount = text.length;
  let disabledButton = text.length === 0 || text.length > 240;

  console.log("text:", text);

  const handleSubmit = () => {
    console.log("clicked!");
  };
  const handleOnChange = event => {
    setText(event.target.value);
  };

  useEffect(() => {
    document.title = `${240 - charCount} characters left.`;
  }, [charCount]);

  return (
    <div className="App">
      <textarea
        value={text}
        onChange={handleOnChange}
        placeholder="Max characters 240"
      />
      <button disabled={disabledButton} onClick={handleSubmit}>
        Submit
      </button>
      <p>{`${240 - charCount} characters left.`}</p>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
