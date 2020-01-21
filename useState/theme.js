import React from "react";
import ReactDOM from "react-dom";
import './styles.css'

/*
  INSTRUCTIONS:
  Convert the code below from a Class component
  using setState to a function component using 
  the useState Hook.
*/

class Theme extends React.Component {
  state = {
    theme: "light"
  }
  toDark = () => this.setState({ theme: "dark" })
  toLight = () => this.setState({ theme: "light" })
  render() {
    const { theme } = this.state

    return (
      <div className={theme}>
        {theme === "light" 
          ? <button onClick={this.toDark}>🔦</button>
          : <button onClick={this.toLight}>💡</button>}
      </div>
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Theme />, rootElement);

const Theme = () => {
  const [theme, setTheme] = useState('light')

  const toDark = () => () => setTheme('dark')
  const toLight = () => () => setTheme('light')
  return (
    <div className={theme}>
      {theme === 'light'
        ? <button onClick={toDark}>🔦</button>
        : <button onClick={toLight}>💡</button>
      }
    </div>
  )
}

export default Theme
