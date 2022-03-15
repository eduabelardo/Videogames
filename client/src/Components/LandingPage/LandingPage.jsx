import React from 'react';
import {Link} from 'react-router-dom';
import '../LandingPage/LandingPage.css';

export default function LandingPage() {
	return (
		<div className='background'>
			<div className='title'>
				<Link to='/home'>
					<button className='title' type='submit'>
						COME INSIDE
					</button>
				</Link>
			</div>
			<div className='footer'>
				<p>App created by: Eduardo Abelardo</p>
			</div>
		</div>
	);
}
