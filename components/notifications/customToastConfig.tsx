import { SuccessToast, ErrorToast, InfoToast } from 'react-native-toast-message';
import React from 'react'
import { View, Text } from 'react-native'

const toastConfig = {
    success: (params: any) => (
        <SuccessToast
            {...params}
            style={{ borderLeftColor: params.props.border }}
            contentContainerStyle={{
                paddingHorizontal: 5,
                backgroundColor: params.props.bg
            }}
            text1Style={{
                fontSize: 15,
                fontWeight: '400',
                color: params.props.t1_color
            }}
            text2Style={{
                fontSize: 12,
            }}
        />
    ),
    error: (params: any) => (
        <ErrorToast
            {...params}
            style={{ borderLeftColor: params.props.border }}
            contentContainerStyle={{
                paddingHorizontal: 5,
                backgroundColor: params.props.bg
            }}
            text1Style={{
                fontSize: 15,
                fontWeight: '400',
                color: params.props.t1_color
            }}
            text2Style={{
                fontSize: 12,
            }}
        />
    ),
    info: (params: any) => (
        <InfoToast
            {...params}
            style={{ borderLeftColor: params.props.border }}
            contentContainerStyle={{
                paddingHorizontal: 5,
                backgroundColor: params.props.bg
            }}
            text1Style={{
                fontSize: 15,
                fontWeight: '400',
                color: params.props.t1_color
            }}
            text2Style={{
                fontSize: 12,
            }}
        />
    ),
    tomatoToast: ({ text1, props }: any) => (
        <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
            <Text>{text1}</Text>
            <Text>{props.uuid}</Text>
        </View>
    )
}

export default toastConfig