import './App.css';
import React from 'react';
import {Route} from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import LandingPage from './Components/LandingPage/LandingPage.jsx';
import CreateGame from './Components/CreateGame/CreateGame';
import ContCards from './Components/ContCards/ContCards';
import GameDetail from './Components/GameDetail/GameDetail';

function App() {
	return (
		<div className='App'>
			<Route path={'/'} component={NavBar} />
			<Route exact path={'/'} component={LandingPage} />
			<Route exact path={'/createGame'} component={CreateGame} />
			<Route exact path={'/home'} component={ContCards} />
			<Route exact path={'/home/:id'} component={GameDetail} />
		</div>
	);
}

export default App;
