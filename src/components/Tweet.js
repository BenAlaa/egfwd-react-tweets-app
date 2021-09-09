import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import {handleToggleTweet} from '../actions/tweets';
import {formatTweet, formatDate} from '../utils/helpers';
import {TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline} from 'react-icons/ti';

const Tweet = ({dispatch, tweet, authedUser}) => {

  const {
    name = '',
    avatar,
    timestamp,
    text,
    hasLiked,
    likes,
    replies,
    id,
    parent
  } = tweet;

  let history = useHistory();
  const toParent = (e, id) => {
    e.preventDefault();
    // todo: Redirect to parent Tweet.
    history.push(`/tweet/${id}`)
  }
  const handleLike = (e) => {
    e.preventDefault();

    dispatch(handleToggleTweet({id, authedUser, hasLiked}))
  }


  if(tweet === null) return <p>This Tweet doesn't exist</p>
  return ( 
    <Link to={`/tweet/${id}`} className="tweet">
      <img
        src={avatar}
        alt={`Avatar of ${name}`}
        className="avatar"
      />
      <div className="tweet-info">
        <div>
          <span>{name}</span>
          <div>{formatDate(timestamp)}</div>
          {parent && (
            <butto className="replying-to" onClick={(e) => toParent(e, parent.id)}>
              Replying to @{parent.author}
            </butto>
          )}
          <p>{text}</p>
        </div>
        <div className="tweet-icons">
            <TiArrowBackOutline className="tweet-icon" />
            <span>{replies !== 0 && replies}</span>
            <button className="heart-button" onClick={handleLike}>
              {hasLiked
                ? <TiHeartFullOutline color="#e0245e" className = 'tweet-icon' />
                : <TiHeartOutline className="tweet-icon" />
              }
            </button>
            <span>{likes !== 0 && likes}</span>
        </div>
      </div>
    </Link>
   );
}

const mapStateToProps = ({authedUser, users, tweets}, {id}) => {
  const tweet = tweets[id]
  const parentTweet = tweet ? tweets[tweet.replayingTo] : null;
  return {
    authedUser,
    tweet: tweet ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet) : null
  }
}
 
export default connect(mapStateToProps)(Tweet);