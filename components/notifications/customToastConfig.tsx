import { SuccessToast, ErrorToast, InfoToast, BaseToast } from 'react-native-toast-message';
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

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
    warn: (params: any) => (
        <BaseToast
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
    customWarn: ({ props: { error_message, test_possible, train_possible, t1_color, t2_color, bg, border } }: any) => {
        return (
            <View style={{ ...styles.toastStyle, ...styles.warnToastHeight, backgroundColor: bg, borderLeftColor: border }}>
                <Text style={{ ...styles.text1, color: t1_color }}>{`${error_message} \u2043 `}</Text>
                <Text style={{ ...styles.text2, color: t2_color }}>{`\u2022 ${test_possible}`}</Text>
                <Text style={{ ...styles.text2, color: t2_color }}>{`\u2022 ${train_possible}`}</Text>
            </View>
        )
    },
    customError: ({ props: { message, step, func_error, t1_color, t2_color, bg, border } }: any) => {
        return (
            <View style={{ ...styles.toastStyle, ...styles.errorToastHeight, backgroundColor: bg, borderLeftColor: border }}>
                <Text style={{ ...styles.text1, color: t1_color }}>{`${message}  \u2043 ${step}`}</Text>
                <Text style={{ ...styles.text2, color: t2_color }}>{`\u2022 ${func_error}`}</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    warnToastHeight: {
        height: 100
    },
    errorToastHeight: {
        height: 80
    },
    toastStyle: {
        width: '75%',
        borderRadius: 10,
        borderLeftWidth: 5,
        paddingLeft: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    text1: {
        fontWeight: "500",
        fontSize: 15
    },
    text2: {
        fontWeight: "400",
        fontSize: 12
    }
})

export default toastConfig