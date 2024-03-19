import React from 'react';
import {defaultPathLocalRealm} from "./models";
const {RealmProvider} = defaultPathLocalRealm;
const RealmWrapper = ({children}) => {
    return (
        <RealmProvider>
            {children}
        </RealmProvider>
    );
};

export default RealmWrapper
