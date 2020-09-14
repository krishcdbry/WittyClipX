import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomeTab from '../../../components/Tabs/HomeTab';
import { selectTheme } from '../../Screens/LandingScreen/selector';
import { toggleTheme } from '../../Screens/LandingScreen/actions';

const mapStateToProps = createStructuredSelector({
  theme: selectTheme,
});

const mapDispatchToProps = dispatch => {
  return {
    toggleTheme: () => {
      dispatch(toggleTheme());
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeTab);
