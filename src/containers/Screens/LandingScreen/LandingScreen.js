import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import LandingScreen from '../../../components/Screens/LandingScreen';
import { selectTheme } from './selector';
import { setTheme } from './actions';

import { SessionStorage } from '../../../utils';

const mapStateToProps = createStructuredSelector({
  theme: selectTheme,
});

const mapDispatchToProps = dispatch => {
  return {
    setTheme: payload => {
      SessionStorage.setTheme(payload);
      dispatch(setTheme(payload));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen)
