import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomeScreen from '../../../components/Screens/HomeScreen';
import { selectTheme } from '../LandingScreen/selector';

const mapStateToProps = createStructuredSelector({
  theme: selectTheme,
});

export default connect(mapStateToProps, null)(HomeScreen)
