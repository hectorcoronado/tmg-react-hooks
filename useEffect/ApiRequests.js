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

/**
 * tmg solution
 */

/*
  Instructions:
    You're given an array of `postIds` and a `fetchPost` function.
    When you invoke `fetchPost`, you'll need to pass it an `id` from
    the `postIds` array. `fetchPost` returns a promise that will resolve
    with a post shaped like this

    {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }

    The UI should show `Loading` if the request is still being made,
    an error message if there was an error, or the post title, body,
    and a button to fetch the next post on a successful request.
*/

const postIds = [1,2,3,4,5,6,7,8]

function fetchPost (id) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((res) => res.json())
}

function App() {
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [post, setPost] = useState(null)

  const incrementIndex = () => {
    setIndex(i => i === postIds.length - 1 ? i : i + 1)
  }

  useEffect(() => {
    setLoading(true);
    fetchPost(postIds[index])
      .then(post => {
        setPost(post)
        setError(null)
        setLoading(false)
      })
      .catch(err => {
        console.error(err.message)
        setError('Error fetching data. Try again.')
        setLoading(false);
      })
  }, [index])
  
  if (loading) {
    return <p>Loading</p>
  }

  if (error) {
    return (
      <Fragment>
        <p>{error}</p>
        <button onClick={incrementIndex}>Next Post</button>
      </Fragment>
    )
  }

  return (
    <div className="App">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      {
        index === postIds.length - 1
          ? <p>No more posts.</p>
          : <button onClick={incrementIndex}>Next Post</button>
      }
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
