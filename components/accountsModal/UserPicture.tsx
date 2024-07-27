import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import React, { useState, useEffect } from 'react'
import { View, Pressable, Image, ActivityIndicator } from 'react-native'
import { useTheme } from '@/theme';
import { updateProfileImage } from '@/api/user'
import { useSelector, useDispatch } from 'react-redux';
import { setNewProfileImage } from '@/reduxSlice/authSlice'
import ImageResizer from '@bam.tech/react-native-image-resizer';
import RNFetchBlob from 'rn-fetch-blob';
import AntDesign from '@expo/vector-icons/AntDesign';
import NotificationsHandler from '@/components/notifications/NotificationsHandler';

const UserPicture = ({ photoUrl }: { photoUrl: string }) => {
    const dispatch = useDispatch()
    const { showNotification } = NotificationsHandler()
    const accessToken = useSelector((state: any) => state.auth.accessToken)
    const { colors, toastColors } = useTheme()
    const [defaultImage, setDefaultImage] = useState('')

    useEffect(() => {
        if (photoUrl !== '') {
            setDefaultImage(photoUrl)
        }
    }, [photoUrl])

    const [selectedImage, setSelectedImage] = useState('')
    const [selectedImageLoading, setSelectedImageLoading] = useState(false)

    const onCaptureImage = async () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        setSelectedImageLoading(true)
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            // aspect: [4, 3],
            quality: 0.75,
            base64: true,
        });
        if (!result.canceled) {
            // @ts-ignore
            const image_uri = result.assets[0].uri;
            // console.log('Actual Img uri', image_uri)

            const resized_image = await ImageResizer.createResizedImage(image_uri, 800, 600, 'JPEG', 100, 0, null);

            const resized_base64 = await RNFetchBlob.fs.readFile(resized_image.uri, 'base64')
            const final_base64 = `data:image/jpeg;base64,${resized_base64}`
            // console.log('Final base64', final_base64)
            setSelectedImage(final_base64)
            setSelectedImageLoading(false)
        } else {
            setSelectedImageLoading(false)
        }
    };

    useEffect(() => {
        if (selectedImage !== '') {
            setDefaultImage(selectedImage)
        } else {
            setDefaultImage(photoUrl)
        }
    }, [selectedImage])

    const saveImage = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        // console.log('Save image to server')
        // Save image to server
        let data = {
            token: accessToken,
            payload: {
                profileImage: selectedImage
            }
        }

        updateProfileImage(data)
            .then((response) => {
                if (response.status === 200) {
                    dispatch(setNewProfileImage({ photoUrl: selectedImage }))
                    setSelectedImage('')
                    showNotification({
                        type: 'success',
                        text1: 'Success',
                        text2: response.data.message,
                        props: { ...toastColors.success }
                    })
                }
            }).catch((error) => {
                // console.log('Error updating profile image', error)
                showNotification({
                    type: 'error',
                    text1: 'Error',
                    text2: error.response.data.message,
                    props: { ...toastColors.error }
                })
            })
    }

    const discardImage = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        // console.log('Discard image')
        setSelectedImage('')
    }

    return (
        <View style={{ gap: 8, alignItems: 'center', height: 100, justifyContent: 'center' }}>
            <Pressable onPress={onCaptureImage}>
                {defaultImage !== '' ?
                    <Image source={{ uri: defaultImage }} style={{ width: 80, height: 80, borderRadius: 50 }} />
                    :
                    <Image source={require('../../assets/images/user.png')} style={{ width: 100, height: 100, borderRadius: 50 }} />
                }
                {selectedImageLoading &&
                    <ActivityIndicator
                        style={{
                            position: 'absolute',
                            transform: [{ translateX: 24 }, { translateY: 24 }]
                        }}
                        size="large" color={colors.primary.main} />}
            </Pressable>

            {selectedImage !== '' &&
                <View style={{ flexDirection: 'row', gap: 32 }}>
                    <Pressable onPress={saveImage}>
                        <AntDesign name="check" size={34} color={colors.primary.dark} />
                    </Pressable>
                    <Pressable onPress={discardImage}>
                        <AntDesign name="close" size={34} color={colors.primary.dark} />
                    </Pressable>
                </View>
            }
        </View>
    )
}

export default UserPicture