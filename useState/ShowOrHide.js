import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

/*
  Instructions:
    Given the array of "posts", recreate the functionality for this app. 
    By default, each post preview is cut off until the user clicks "Open". 
    Only one post can be "Open" at a time.
*/
const Text = ({ altTextStyles, text }) => {
  text = altTextStyles ? text : `${text.substring(0, 100)}...`;
  const textStyles = {
    fontSize: "30px"
  };
  return <p style={textStyles}>{text}</p>;
};

const Button = ({id, onClick}) => {
  const buttonStyles = {
    background: "#222",
    border: "none",
    borderRadius: "5px",
    color: "#fff",
    fontSize: "20px",
    padding: "10px",
    width: "100px"
  };
  return <button onClick={id => onClick(id)} style={buttonStyles} id={id}>Open</button>;
};

const Image = ({ imageUrl }) => {
  const imageStyles = {
    margin: "0 auto"
  };
  return <img src={imageUrl} style={imageStyles} alt='desc' />;
};

const App = ({ posts }) => {
  const [clickedPost, setClickedPost] = useState({ 
    post: null,
    isClicked: false
  })
  
  const handleOnClick = id => {
    setClickedPost({post: null, isClicked: false})
    setClickedPost({ post: id, isClicked: true })
  }

  const containerStyles = {
    padding: "16px 40px"
  };

  const listStyles = {
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    listStyleType: "none",
    margin: "50px",
    padding: "20px"
  };

  const altListStyles = {
    ...listStyles,
    border: '1px solid black'
  }

  return (
    <ul style={containerStyles}>
      {posts.map((post, idx) => {
        return (
          <li style={idx === clickedPost.post ? altListStyles : listStyles}>
            <Image imageUrl={post.img} />
            <Text text={post.text} altTextStyles={(idx === clickedPost.post) && clickedPost.isClicked} />
            <Button onClick={() => handleOnClick(post.id)}  />
          </li>
        );
      })}
    </ul>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <App
    posts={[
      {
        id: 0,
        img:
          "https://tylermcginnis.com/static/084b5fe6ce2589e754a188671ba13987/ec435/code-splitting-with-react-and-react-router.jpg",
        text:
          "Code splitting has gained popularity recently for its ability to allow you to split your app into separate bundles your users can progressively load. In this post we’ll take a look at not only what code splitting is and how to do it, but also how to implement it with React Router."
      },
      {
        id: 1,
        img:
          "https://tylermcginnis.com/static/e87fe9a59e14efa29d0fe8c1b3c47cae/ec435/javascript-inheritance-vs-composition.jpg",
        text:
          "The problem with object-oriented languages is they’ve got all this implicit environment that they carry around with them. You wanted a banana but what you got was a gorilla holding the banana and the entire jungle. - Joe Armstrong."
      },
      {
        id: 2,
        img:
          "https://tylermcginnis.com/static/d84e034af76365f2f08d939cbb5fc646/ec435/javascript-modules-iifes-commonjs-es6-modules.jpg",
        text:
          "I’ve taught JavaScript for a long time to a lot of people. Consistently the most commonly under-learned aspect of the language is the module system. There’s good reason for that. Modules in JavaScript have a strange and erratic history. In this post we’ll walk through that history and you’ll learn modules of the past to better understand how JavaScript modules work today."
      }
    ]}
  />,
  rootElement
);

/**
 * solution by tmg
 */
function App ({ posts }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <ul>
      {posts.map({ id, img, text }, index) => {
        const isOpen = openIndex === index

        const textToShow = isOpen ? text : `${text.substring(0, 100)}...`

        return (
          <li key={id} style={{border: isOpen? '1px solid black' : 'none'}}>
            <img src={img} alt='post avatar' />
            <p>{textToShow}</p>
            {
              !isOpen && (
                <button onClick={() => setOpenIndex(index)}>
                  Open
                </button>
              )
            }
          </li>
        )
      }}
    </ul>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <App posts={[
    {
      id: 0,
      img: 'https://tylermcginnis.com/static/084b5fe6ce2589e754a188671ba13987/ec435/code-splitting-with-react-and-react-router.jpg',
      text: 'Code splitting has gained popularity recently for its ability to allow you to split your app into separate bundles your users can progressively load. In this post we’ll take a look at not only what code splitting is and how to do it, but also how to implement it with React Router.'
    },
    {
      id: 1,
      img: 'https://tylermcginnis.com/static/e87fe9a59e14efa29d0fe8c1b3c47cae/ec435/javascript-inheritance-vs-composition.jpg',
      text: 'The problem with object-oriented languages is they’ve got all this implicit environment that they carry around with them. You wanted a banana but what you got was a gorilla holding the banana and the entire jungle. - Joe Armstrong.'
    },
    {
      id: 2,
      img: 'https://tylermcginnis.com/static/d84e034af76365f2f08d939cbb5fc646/ec435/javascript-modules-iifes-commonjs-es6-modules.jpg',
      text: 'I’ve taught JavaScript for a long time to a lot of people. Consistently the most commonly under-learned aspect of the language is the module system. There’s good reason for that. Modules in JavaScript have a strange and erratic history. In this post we’ll walk through that history and you’ll learn modules of the past to better understand how JavaScript modules work today.'
    }
  ]} />,
  rootElement
);

