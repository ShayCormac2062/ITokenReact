import React from 'react';

import {NavigationContainer} from "@react-navigation/native";
import {BottomTabs} from "./navigation/bottomNav";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SplashScreen from "./screens/SplashScreen";
import {routerConstants} from "./constants/routerConstants";
import RealmWrapper from "./RealmWrapper";
import AddCrystalS from "./screens/AddCrystalS";
import MyBuyesS from "./screens/MyBuyesS";
import CreateTokenS from "./screens/CreateTokenS";
import CreatesTokensS from "./screens/CreatesTokensS";
import ViewTokenS from "./screens/ViewTokenS";
import colors from "./styles/colors";
import {StatusBar} from "expo-status-bar";

const RootStack = createNativeStackNavigator()
export const Root = () => {

    return (
        <>
            {/* <StatusBar style="dark" hidden={false} translucent={true} backgroundColor={colors.backColor} />*/}
            <RealmWrapper>
                <NavigationContainer>
                    <RootStack.Navigator initialRouteName={routerConstants.SPLASH_SCREEN}>
                        <RootStack.Screen
                            key={routerConstants.SPLASH_SCREEN}
                            options={{headerShown: false, gestureEnabled: false}}
                            name={routerConstants.SPLASH_SCREEN}
                            component={SplashScreen}
                        />
                        <RootStack.Screen
                            key={routerConstants.MAIN}
                            options={{headerShown: false, gestureEnabled: false}}
                            name={routerConstants.MAIN}
                            component={BottomTabs}
                        />

                        <RootStack.Screen
                            key={routerConstants.ADD_CRYSTAL}
                            options={{headerShown: false, gestureEnabled: false}}
                            name={routerConstants.ADD_CRYSTAL}
                            component={AddCrystalS}
                        />
                        <RootStack.Screen
                            key={routerConstants.MY_BUYS}
                            options={{headerShown: false, gestureEnabled: false}}
                            name={routerConstants.MY_BUYS}
                            component={MyBuyesS}
                        />
                        <RootStack.Screen
                            key={routerConstants.CREATE_TOKEN}
                            options={{headerShown: false, gestureEnabled: false}}
                            name={routerConstants.CREATE_TOKEN}
                            component={CreateTokenS}
                        />
                        <RootStack.Screen
                            key={routerConstants.VIEW_CREATES_TOKEN}
                            options={{headerShown: false, gestureEnabled: false}}
                            name={routerConstants.VIEW_CREATES_TOKEN}
                            component={CreatesTokensS}
                        />

                        <RootStack.Screen
                            key={routerConstants.VIEW_TOKEN}
                            options={{headerShown: false, gestureEnabled: false}}
                            name={routerConstants.VIEW_TOKEN}
                            component={ViewTokenS}
                        />
                    </RootStack.Navigator>
                </NavigationContainer>
            </RealmWrapper>
        </>
    );
};
