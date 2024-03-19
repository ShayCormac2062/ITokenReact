import React from 'react';
import {View, Text} from "react-native";
type MyHeaderProps = {
    title: string
    style: any
}
const MyHeader = ({title, style}: MyHeaderProps) => {
    return (
        <View style={{ alignItems: 'center', height: 100, justifyContent: 'center' }}>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>{title}</Text>
        </View>
    );
};

export default MyHeader;
