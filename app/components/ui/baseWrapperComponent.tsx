import React, {useEffect} from 'react'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {GestureResponderEvent, Platform, SafeAreaView} from 'react-native'
import colors from "../../styles/colors";

type BaseWrapperComponentType = {
    children: JSX.Element | JSX.Element[]
    onTouchStart?: (event: GestureResponderEvent) => void
    onTouchEnd?: (event: GestureResponderEvent) => void
    isKeyboardAwareScrollView?: boolean
    styleSafeArea?: any
    isBackdrop?: boolean
}
export const BaseWrapperComponent = ({
                                         children,
                                         onTouchEnd,
                                         onTouchStart,
                                         isKeyboardAwareScrollView = false,
                                         styleSafeArea,
                                         isBackdrop = false,

                                     }: BaseWrapperComponentType) => {
    const ref = React.useRef(null)

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.backColor, ...styleSafeArea
            }}>
            {isKeyboardAwareScrollView ? (
                <KeyboardAwareScrollView
                    ref={ref}
                    enableOnAndroid={true}
                    keyboardShouldPersistTaps={'handled'}
                    contentContainerStyle={{
                        backgroundColor: colors.backColor,
                        marginBottom: 10,
                        width: '100%',
                    }}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    {children}
                </KeyboardAwareScrollView>
            ) : (
                children
            )}
        </SafeAreaView>
    )
}
