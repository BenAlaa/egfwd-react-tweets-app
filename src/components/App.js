import React, {useEffect} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import {handleInitialData} from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import Dashboard from './Dashboard';
import NewTweet from './NewTweet';
import TweetPage from './TweetPage';
import Nav from './Nav'


const App = (props) => {

  useEffect(() => {
    props.dispatch(handleInitialData());
  })
  return (
    <Router>
      <LoadingBar />
      <div className="container">
        <Nav />
        {props.loading
          ? null
          : 
          <div>
            <Route path='/' exact component={Dashboard} />
            <Route path='/tweet/:id' component={TweetPage} />
            <Route path='/new' component={NewTweet} />
          </div>
          
        }
      </div>
    </Router>
  )


}


const mapStateToProps = ({authedUser}) => ({
  loading: authedUser === null
})

export default connect(mapStateToProps)(App);