import 'expo-dev-client';
import 'react-native-get-random-values';
import React from 'react';
import {registerRootComponent} from 'expo'
import {Root} from './app/Root';

const App = () => <Root />

registerRootComponent(App);
