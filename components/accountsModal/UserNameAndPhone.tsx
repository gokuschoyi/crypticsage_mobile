import * as Haptics from 'expo-haptics';
import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native'
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useTheme } from '@/theme';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserData } from '@/api/user'
import { setNewUserData } from '@/reduxSlice/authSlice'
import NotificationsHandler from '@/components/notifications/NotificationsHandler';

const UserNameAndPhone = ({ displayName, mobile_number }: { displayName: string, mobile_number: string }) => {
    const accessToken = useSelector((state: any) => state.auth.accessToken)
    const { showNotification } = NotificationsHandler()
    const dispatch = useDispatch()
    const { colors, toastColors } = useTheme()

    const [userDetails, setuserDetails] = useState({
        name: { displayName: displayName, editableName: displayName, edit: false, error: '' },
        phone_number: { number: mobile_number, editableUserMobile: mobile_number, edit: false, error: '' }
    })

    const handleEditOpen = (type: string) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        if (type === 'name') {
            setuserDetails({ ...userDetails, name: { ...userDetails.name, edit: true } })
        } else if (type === 'phone') {
            setuserDetails({ ...userDetails, phone_number: { ...userDetails.phone_number, edit: true } })
        }
    }

    const handleEditClose = (type: string) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        if (type === 'name') {
            setuserDetails({ ...userDetails, name: { ...userDetails.name, edit: false, editableName: displayName } })
        } else if (type === 'phone') {
            setuserDetails({ ...userDetails, phone_number: { ...userDetails.phone_number, edit: false, editableUserMobile: mobile_number } })
        }
    }

    const handleDataChange = (type: string, value: string) => {
        if (type === 'name') {
            if (value.length === 0) {
                setuserDetails({ ...userDetails, name: { ...userDetails.name, editableName: value, error: 'Name cannot be empty' } })
                return
            } else {
                setuserDetails({ ...userDetails, name: { ...userDetails.name, editableName: value, error: '' } })
            }
        } else if (type === 'phone') {
            if (value.length !== 10) {
                setuserDetails({ ...userDetails, phone_number: { ...userDetails.phone_number, editableUserMobile: value, error: 'Phone number should be 10 digits' } })
                return
            } else {
                setuserDetails({ ...userDetails, phone_number: { ...userDetails.phone_number, editableUserMobile: value, error: '' } })
            }
        }
    }

    const saveChanges = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        let nameChanged = false
        let phoneChanged = false

        // checking if values have changed
        if (userDetails.name.editableName !== userDetails.name.displayName) {
            // console.log('Name has changed')
            nameChanged = true
        }

        if (userDetails.phone_number.editableUserMobile !== userDetails.phone_number.number) {
            // console.log('Phone number has changed')
            phoneChanged = true
        }

        if (nameChanged || phoneChanged) {
            let data = {
                token: accessToken,
                payload: {
                    userData: {
                        displayName: userDetails.name.editableName,
                        mobile_number: userDetails.phone_number.editableUserMobile
                    }
                }
            }

            updateUserData(data)
                .then((res) => {
                    dispatch(setNewUserData(data.payload.userData))
                    setuserDetails({
                        name: { ...userDetails.name, displayName: userDetails.name.editableName },
                        phone_number: { ...userDetails.phone_number, number: userDetails.phone_number.editableUserMobile }
                    })
                    showNotification({
                        type: 'success',
                        text1: 'Success',
                        text2: res.data.message,
                        props: { ...toastColors.success }
                    })
                })
                .catch((err) => {
                    // console.log(err)
                    showNotification({
                        type: 'error',
                        text1: 'Error',
                        text2: err.response.data.message,
                        props: { ...toastColors.error }
                    })
                })
        } else {
            // console.log('No changes in name or phone')
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.background.paperOne, borderRadius: 20 }}>
            {!userDetails.name.edit && (
                <View style={{ ...styles.editRow }}>
                    <Text style={{ fontSize: 20, fontFamily: '400', color: colors.text.primary }}>
                        {displayName}
                    </Text>
                    <Pressable onPress={() => handleEditOpen('name')}>
                        <Ionicons name="ellipsis-horizontal" size={24} color={colors.text.primary} />
                    </Pressable>
                </View>
            )}

            {userDetails.name.edit && (
                <View style={{ ...styles.editRow }}>
                    <View style={{ flex: 1 }}>
                        <TextInput
                            placeholder="Username"
                            placeholderTextColor={colors.primary.main}
                            value={userDetails.name.editableName || ''}
                            onChangeText={(text) => handleDataChange('name', text)}
                            style={{
                                ...styles.inputField
                                , borderBottomColor: colors.primary.main
                                , backgroundColor: colors.background.nav,
                                color: colors.primary.main,
                            }}
                        />
                        {userDetails.name.error !== '' && <Text style={{ fontSize: 10, fontFamily: '300', color: colors.error.main }}>{userDetails.name.error}</Text>}
                    </View>

                    <View style={{ flexDirection: 'row', gap: 8 }}>
                        {userDetails.name.error === '' && (
                            <Pressable onPress={() => saveChanges()}>
                                <AntDesign name="check" size={28} color={colors.primary.dark} />
                            </Pressable>
                        )}

                        <Pressable onPress={() => handleEditClose('name')}>
                            <AntDesign name="close" size={28} color={colors.primary.dark} />
                        </Pressable>
                    </View>
                </View>
            )}

            {!userDetails.phone_number.edit && (
                <View style={{ ...styles.editRow }}>
                    <Text style={{ fontSize: 20, fontFamily: '400', color: colors.text.primary }}>
                        {mobile_number}
                    </Text>
                    <Pressable onPress={() => handleEditOpen('phone')}>
                        <Ionicons name="ellipsis-horizontal" size={24} color={colors.text.primary} />
                    </Pressable>
                </View>
            )}

            {userDetails.phone_number.edit && (
                <View style={{ ...styles.editRow }}>
                    <View style={{ flex: 1 }}>
                        <TextInput
                            placeholder="Phone Number"
                            value={userDetails.phone_number.editableUserMobile || ''}
                            onChangeText={(text) => handleDataChange('phone', text)}
                            style={{
                                ...styles.inputField
                                , borderBottomColor: colors.primary.main
                                , backgroundColor: colors.background.nav,
                                color: colors.primary.main,
                            }}
                            keyboardType="numeric"
                        />
                        {userDetails.phone_number.error !== '' && <Text style={{ fontSize: 10, fontFamily: '300', color: colors.error.main }}>{userDetails.phone_number.error}</Text>}
                    </View>

                    <View style={{ flexDirection: 'row', gap: 8 }}>
                        {userDetails.phone_number.error === '' && (
                            <Pressable onPress={() => saveChanges()}>
                                <AntDesign name="check" size={28} color={colors.primary.dark} />
                            </Pressable>
                        )}

                        <Pressable onPress={() => handleEditClose('phone')}>
                            <AntDesign name="close" size={28} color={colors.primary.dark} />
                        </Pressable>
                    </View>
                </View>
            )
            }
        </View >
    )
}

export default UserNameAndPhone

const styles = StyleSheet.create({
    actions: {
        borderRadius: 16,
        gap: 0,
        width: '90%',
    },
    editRow: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between',
        padding: 12,
        gap: 8
    },
    inputField: {
        height: 38,
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 10,
        backgroundColor: '#fff',
    },
})