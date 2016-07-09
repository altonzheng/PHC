import { reduxForm } from 'redux-form'

import CheckIn from 'components/CheckIn'

const fields = [
  'firstName',
  'lastName',
  'socialSecurityNumber',
  'dateOfBirth',
  'phoneNumber',
  'emailAddress',

  'gender',
  'isTransexual',
  'isLGBTQ',

  'ethnicity',

  'language',

  'hasBeenInFosterCare',

  'hasServedInTheMilitary',

  'primaryHealthcareLocation',

  'isHomeless',
  'lengthOfHomelessness',
];

const validate = (values) => {
  const errors = {}
  if (!values.first) {
    errors.first = 'Required'
  }

  if (!values.last) {
    errors.last = 'Required'
  }

  if (!values.dob) {
    errors.last = 'Required'
  }

  return errors;
};
/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapActionCreators = {

}

const mapStateToProps = (state) => ({

})

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const counter = (state) => state.counter
    const tripleCount = createSelector(counter, (count) => count * 3)
    const mapStateToProps = (state) => ({
      counter: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default reduxForm({
  form: 'checkIn',
  fields,
  validate
},
mapStateToProps,
mapActionCreators
)(CheckIn)
