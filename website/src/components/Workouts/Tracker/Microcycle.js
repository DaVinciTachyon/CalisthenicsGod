import React from 'react'
import { Row } from '../../../style/table'

export default class Microcycle extends React.Component {
  constructor() {
    super()
    this.state = {
      microcycle: {
        days: [
          {
            sessions: [
              { time: 'morning', type: 'upper' },
              { time: 'afternoon', type: 'heavy stretch' },
            ],
          },
          {
            sessions: [
              { time: 'morning', type: 'lower' },
              { time: 'afternoon', type: 'light stretch' },
            ],
          },
          {
            sessions: [
              { time: 'morning', type: 'upper' },
              { time: 'afternoon', type: 'heavy stretch' },
            ],
          },
          { sessions: [{ time: 'afternoon', type: 'light stretch' }] },
          {
            sessions: [
              { time: 'morning', type: 'upper' },
              { time: 'afternoon', type: 'heavy stretch' },
            ],
          },
          {
            sessions: [
              { time: 'morning', type: 'lower' },
              { time: 'afternoon', type: 'light stretch' },
            ],
          },
          { sessions: [] },
        ],
      },
    }
  }

  render() {
    const { microcycle } = this.state
    return (
      <div>
        <Row>Microcycle</Row>
        <Row columns={microcycle.days.length}>
          {microcycle.days.map(({ sessions }, index) => (
            <div>
              <div>Day {index + 1}</div>
              <div>
                {sessions.map(({ time, type }) => (
                  <div>
                    {time} {type}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Row>
      </div>
    )
  }
}
