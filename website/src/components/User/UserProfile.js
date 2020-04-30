import React from 'react';
import '../Main.css';
import ProfileEditor from './ProfileEditor';

export default class UserProfile extends React.Component {
	constructor() {
		super();
		this.state = {
			update: false
		};
	}

	async componentDidMount() {
		if (!localStorage.getItem('authToken')) window.location = '/login';
	}

	editProfile = () => {
		this.setState({ update: !this.state.update });
	};

	render() {
		return (
			<div style={{ padding: '100px' }}>
				<ProfileEditor editProfile={this.editProfile} />
			</div>
		);
	}
}
