
import AsyncStorage from "@react-native-community/async-storage";

const APP_THEME = 'APP_THEME';

const saveItem = (key, value) => {
    try {
        return AsyncStorage.setItem(key, value);
    } catch (error) {
        return error;
    }
};

const getItem = async key => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (error) {
        return error;
    }
};

const removeItem = key => {
    try {
        return AsyncStorage.removeItem(key);
    } catch (error) {
        return error;
    }
};

const getTheme = () => {
    return getItem(APP_THEME);
};

const setTheme = theme => {
    return saveItem(APP_THEME, JSON.stringify(theme));
};

export default {
    saveItem,
    getItem,
    removeItem,
    getTheme,
    setTheme
};
