import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

export default class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = { class: '' };
		this.element = document.createElement('div');
		this.element.style.display = 'none';
	}

	componentDidUpdate(prevProps) {
		if (prevProps.isOpen !== this.props.isOpen) {
			if (this.props.isOpen) {
				document.getElementById('root').classList = 'blur';
				document.addEventListener('mousedown', this.toggle, false);
			} else {
				document.getElementById('root').classList = '';
				document.removeEventListener('mousedown', this.toggle, false);
			}
		}
	}

	componentDidMount() {
		document.body.appendChild(this.element);
	}

	componentWillUnmount() {
		document.body.removeChild(this.element);
	}

	toggle = (e) => {
		if (this.ref.contains(e.target) && !this.props.onInternalClick) {
			return;
		}
		this.props.toggle();
	};

	render() {
		if (!this.props.isOpen) this.element.style.display = 'none';
		else this.element.style.display = 'contents';
		return ReactDOM.createPortal(
			<div className="modal">
				<div className="modal-container" ref={(ref) => (this.ref = ref)}>
					{this.props.children}
				</div>
			</div>,
			this.element
		);
	}
}
