import './About.css';

import React from 'react';

export default function AboutMe() {
	return (
		<div className='aboutContainer'>
			<div className='about'>
				<div className='profileImage'></div>
				<div>
					<h3>App created by: Eduardo Abelardo</h3>
					<p>
						Using: JavaScript | React | Redux | Node | Express | PostgreSQL |
						HTML | CSS
					</p>

					<p>You can learn more about me at LinkedIn</p>
					<a href='https://www.linkedin.com/in/eduardo-andres-abelardo/'>
						<button className='buttonLink'>LinkedIn</button>
					</a>
				</div>
			</div>
		</div>
	);
}
