import React, { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

const postIds = [1, 2, 3, 4, 5, 6, 7, 8];

const App = () => {
  const [loading, setLoading] = useState(true);
  const [requestError, setRequestError] = useState(false);
  const [post, setPost] = useState(null);
  const [requestedPost, setRequestedPost] = useState(1);

  const getNextPost = requestedPost => {
    requestedPost === postIds.length - 1
      ? setRequestedPost(1)
      : setRequestedPost(++requestedPost);
  };

  const fetchPost = id => {
    setLoading(true);
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => res.json())
      .then(res => {
        setPost(res);
        setLoading(false);
      })
      .catch(error => setRequestError(error));
  };

  useEffect(() => {
    fetchPost(requestedPost);
  }, [requestedPost]);

  return (
    <div className="App">
      {loading && <p>Getting post...</p>}
      {!loading && !requestError && (
        <Fragment>
          <p>{post.title}</p>
          <p>{post.body}</p>
          <button onClick={() => getNextPost(requestedPost)}>
            Get Next Post
          </button>
        </Fragment>
      )}
      {!loading && requestError && <p>{`Error message: ${requestError}`}.</p>}
    </div>
  );
};

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
