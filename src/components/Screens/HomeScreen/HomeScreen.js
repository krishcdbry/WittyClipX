import React, { useEffect } from "react";

import TabBar from "../../../plugins/TabBar";
import HomeTab from "../../../containers/Tabs/HomeTab";
import TvTab from "../../../containers/Tabs/TvTab";

import HomeIcon from '../../../../assets/images/icons/home.svg';
import TvIcon from '../../../../assets/images/icons/tv.svg';
import SearchIcon from '../../../../assets/images/icons/search.svg';

import { clearStack } from "../../../utils/navigation";

const HomeScreen = ({ navigation, theme }) => {
  useEffect(() => {
    clearStack(navigation, "HomeScreen");
  }, [navigation]);

  return (
    <TabBar
      backgroundColor={theme.transparentBackgroundColor} 
      defaultColor={theme.tabIconColor}
      selectedColor={theme.tabIconActiveColor}
      navigation={navigation}
    >
      <TabBar.Item
        icon={HomeIcon}
        title="Tab1"
      >
        <HomeTab navigation={navigation} />
      </TabBar.Item>
      <TabBar.Item
        icon={TvIcon}
        title="Tab2"
      >
        <TvTab navigation={navigation}/>
      </TabBar.Item>
      <TabBar.Item
        icon={SearchIcon}
        title="Tab3"
      >
        <TvTab navigation={navigation}/>
      </TabBar.Item>
    </TabBar>
  );
};


export default HomeScreen;
