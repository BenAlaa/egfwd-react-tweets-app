import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {handleAddTweet} from '../actions/tweets';

const NewTweet = ({dispatch, id}) => {
  const [text, setText] = useState('');
  const [toHome, setToHome] = useState(false);


  const handleChange = ({target: {value}}) => setText(value);
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(handleAddTweet(text, id))
    setText('');
    setToHome(id ? false : true)

  }
  
  const tweetLeft = 280 - text.length;
  if(toHome === true) return <Redirect to="/" />
  return (
    <div>
      <h3 className="center">Compose new Tweet</h3>
      <form className="new-tweet" onSubmit={handleSubmit}>
        <textarea
          placeholder="What's happening?"
          value={text}
          onChange={handleChange}
          className="textarea"
          maxLength={280}
        />
        {tweetLeft <= 100 && (
          <div className="tweet-length">{tweetLeft}</div>
        )}
        <button
          className="btn"
          type="submit"
          disabled={text === ''}
        >
          Submit
        </button>
      </form>
    </div> 
  );
}
 
export default connect()(NewTweet);