import React from 'react';
import { Line } from 'react-chartjs-2';
import Card from '../../style/card';
import { connect } from 'react-redux';
import { getMeasurementHistory } from '../../stateManagement/reducers/measurements';

class MeasurementHistory extends React.Component {
  constructor() {
    super();
    this.state = {
      chart: {
        labels: [],
        datasets: [
          {
            label: 'Weight',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [],
          },
        ],
      },
    };
  }
  componentDidMount() {
    this.props.getMeasurementHistory('weight');
  }

  render() {
    const chart = Object.assign({}, this.state.chart);
    chart.labels = [];
    chart.datasets[0].data = [];
    for (let i = 0; i < this.props.measurements.weight?.length; i++) {
      const date = new Date(this.props.measurements.weight[i].date);
      chart.labels.unshift(
        `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
      );
      chart.datasets[0].data.unshift(this.props.measurements.weight[i].value);
    }
    return (
      <Card>
        <Line
          data={chart}
          options={{
            title: {
              display: true,
              text: 'Weight History',
              fontSize: 20,
            },
            legend: {
              display: false,
              position: 'right',
            },
          }}
        />
      </Card>
    );
  }
}

export default connect(({ measurements }) => ({ measurements }), {
  getMeasurementHistory,
})(MeasurementHistory);
