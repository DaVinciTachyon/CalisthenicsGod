import React from 'react';
import './PieChart.css';

export default class PieChart extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		let segments = [];
		let offset = 0;
		const full = this.props.data.reduce((t, c) => {
			return t + c.value;
		}, 0);
		const data = this.props.data.sort((a, b) => a.value - b.value);
		for (let i = 0; i < data.length; i++) {
			console.log(data[i].value / full * 100);
			if (data[i].value > 0) {
				segments.push(
					<div
						key={i}
						className="pie-segment"
						style={{
							'--offset' : offset,
							'--value'  : Math.round(data[i].value / full * 100),
							'--bg'     : data[i].colour,
							'--over50' : data[i].value / full * 100 > 50 ? 1 : 0
						}}>
						<label
							className="pie-label"
							style={{
								'--colour' : data[i].labelColour
							}}>
							{data[i].label}
						</label>
					</div>
				);
				offset += Math.round(data[i].value / full * 100);
			}
		}
		return (
			<div
				style={{
					height : `${this.props.size}px`,
					width  : `${this.props.size}px`
				}}>
				<div
					className="pie"
					style={{
						'--size' : this.props.size
					}}>
					{segments}
				</div>
			</div>
		);
	}
}
