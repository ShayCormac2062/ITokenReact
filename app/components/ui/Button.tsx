import React, { ReactNode } from 'react'
import {ImageSourcePropType, StyleProp,Text, TouchableOpacity, View} from 'react-native'
import colors from "../../styles/colors";

type ButtonProps = {
	onPress: () => void
	title?: string
	styleContainer?: StyleProp<any>
	styleText?: StyleProp<any>
	disabled?: boolean
	backgroundColor?: string
	colorText?: string
	children?: ReactNode
}
const Button = ({
									onPress,
									title,
									styleContainer,
									disabled,
									styleText,
									backgroundColor,
									children,
									colorText,
									...rest
								}: ButtonProps) => {
	return (
		<TouchableOpacity
			style={{
				backgroundColor: backgroundColor ?? colors.white,
				padding: 10,
				borderRadius: 16,
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: 54,
				...styleContainer,
			}}
			disabled={disabled}
			onPress={!disabled ? onPress : null}
			{...rest}
		>
			{
				children ? children : <View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Text
						style={{
							fontSize: 15,
							color: colorText,
							...styleText,
						}}
					>
						{title}
					</Text>
				</View>
			}

		</TouchableOpacity>
	)
}
export default Button
