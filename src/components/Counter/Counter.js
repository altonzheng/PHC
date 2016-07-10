import React from 'react'
import classes from './Counter.scss'

export const Counter = (props) => (
  <section className={classes.counterSection}>
    <h2>
      Counter:
      {' '}
      <span>
        {props.counter}
      </span>
    </h2>
    <div className={classes.actionButtons}>
      <button className={classes.actionButton} onClick={props.increment}>
        Increment
      </button>
      {' '}
      <button className={classes.actionButton} onClick={props.doubleAsync}>
        Double (Async)
      </button>
    </div>
  </section>
)

Counter.propTypes = {
  counter: React.PropTypes.number.isRequired,
  doubleAsync: React.PropTypes.func.isRequired,
  increment: React.PropTypes.func.isRequired
}

export default Counter
