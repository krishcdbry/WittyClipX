import {Dimensions} from 'react-native';

const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

const screenDimensions = {
    ScreenWidth,
    ScreenHeight
}


export {
    screenDimensions
}