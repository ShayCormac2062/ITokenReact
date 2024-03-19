import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from "../screens/Profile";
import {Image, StyleSheet, Text, View} from "react-native";
import searchBtn from '../assets/images/navigation/searchBlack.png'
import profileActive from '../assets/images/navigation/ico-profile-active.png'
import profileNoActive from '../assets/images/navigation/ico-profile-no-actrive.png'
import homeActive from '../assets/images/navigation/ion_home-active.png'
import homeNoActive from '../assets/images/navigation/icon_home_no-active.png'
import colors from "../styles/colors";
import CustomTabBar from './CustomTabBar'
import {useKeyBoardStatus} from "../hook/useKeyBoardStatus";
import Home from "../screens/Home";
import SearchS from "../screens/SearchS";
import {routerConstants} from "../constants/routerConstants";

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
    const {keyboardStatus} = useKeyBoardStatus()
    return (
        <Tab.Navigator
            tabBar={props => {
                if (keyboardStatus) return null
                return <CustomTabBar {...props} />
            }}
            initialRouteName={'Home'}
            screenOptions={{
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarShowLabel: false,
                headerShadowVisible: false,
                tabBarStyle: styles.tabBarStyle,
                tabBarLabelStyle: {
                    fontSize: 14
                },
                tabBarActiveTintColor: colors.purpleDark,
            }}
        >
            <Tab.Screen  name="Home" options={{
              /*  header: ({ navigation, route, options }) => {
                    const title = getHeaderTitle(options, route.name);
                    return <MyHeader title={title} style={options.headerStyle} />;
                },*/
                tabBarIcon: ({focused}) => (
                    <View style={styles.barIconContainer}>
                        {focused && <View style={styles.dot}/>}
                        <Image style={{width: 24, height: 24}} source={focused ? homeActive : homeNoActive}/>
                        <Text style={{
                            color: focused ? colors.purpleDark : colors.gray,
                            fontWeight: 'bold'
                        }}>Главная</Text>
                    </View>

                )
            }} component={Home}/>
            <Tab.Screen name={routerConstants.SEARCH_S} options={{
                tabBarIcon: ({focused}) => (
                    <>

                        <View style={styles.searchContainer}>
                            <Image style={{width: 76, height: 76}} source={searchBtn}/>
                            {focused && <View style={[styles.dot, styles.dotSearch]}/>}
                        </View>
                    </>
                )
            }} component={SearchS}/>
            <Tab.Screen options={{
                tabBarIcon: ({focused}) => (
                    <View style={styles.barIconContainer}>
                        {focused && <View style={styles.dot}/>}

                        <Image style={{width: 24, height: 24}} source={focused ? profileActive : profileNoActive}/>
                        <Text style={{
                            color: focused ? colors.purpleDark : colors.gray,
                            fontWeight: 'bold'
                        }}>Профайл</Text>
                    </View>
                )
            }} name="Profile" component={Profile}/>
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    dotSearch:{
        top: 70
    },
    searchContainer: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        bottom: 25,
        right: -3
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 20,
        position: "absolute",
        backgroundColor: colors.purpleDark,
        zIndex: 9999,
        top: -10
    },
    barIconContainer: {alignItems: 'center'},
    tabBarStyle: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        shadowColor: 'transparent',
        borderTopWidth: 0,
        bottom: 0,
        right: 0,
        left: 0,
        height: 74,
    },
});
