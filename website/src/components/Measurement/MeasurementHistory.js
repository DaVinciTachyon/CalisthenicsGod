import React from 'react';
import { Line } from 'react-chartjs-2';
import Card from '../../style/card';
import axios from 'axios';

export default class MeasurementHistory extends React.Component {
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

  componentDidUpdate(prevProps) {
    if (prevProps.update !== this.props.update) {
      this.getWeightHistory();
    }
  }

  componentDidMount() {
    this.getWeightHistory();
  }

  getWeightHistory = async () => {
    try {
      const { weight } = (await axios.get('/measurement/weight/history/')).data;
      let chart = Object.assign({}, this.state.chart);
      chart.labels = [];
      chart.datasets[0].data = [];
      for (let i = 0; i < weight.length; i++) {
        chart.labels.unshift(
          `${new Date(weight[i].date).getDate()}/${new Date(
            weight[i].date
          ).getMonth()}/${new Date(weight[i].date).getFullYear()}`
        );
        chart.datasets[0].data.unshift(weight[i].value);
      }
      this.setState({ chart });
    } catch (err) {
      if (err.response?.status === 400) console.error(err.response.data.error);
      else console.error(err.response);
    }
  };

  addWeightHistory = () => {
    return this.state.weightHistory.map((weight) => {
      let date = new Date(weight.date);
      return (
        <tr key={weight._id}>
          <td>
            {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}-
            {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
          </td>
          <td>{weight.value}</td>
        </tr>
      );
    });
  };

  render() {
    return (
      <Card>
        <Line
          data={this.state.chart}
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
