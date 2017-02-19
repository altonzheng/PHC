import React from 'react'
import Helmet from 'react-helmet'
import 'react-select/dist/react-select.css'

import Header from '../../components/Header'
import classes from './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = (props) => (
  <div className={classes.layoutContainer}>
    <Helmet title="Project Homeless Connect" />
    <Header />
    <div className={classes.mainContainer}>
      {props.children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired,
}

export default CoreLayout
