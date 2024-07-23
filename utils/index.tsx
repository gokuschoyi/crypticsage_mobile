export const process_login = (result: any) => {
    return {
        'accessToken': result.data.data.accessToken,
        'displayName': result.data.data.displayName,
        'email': result.data.data.email,
        'emailVerified': result.data.data.emailVerified,
        'passwordEmptyFlag': result.data.data.passwordEmptyFlag,
        'uid': result.data.data.uid,
        'preferences': result.data.data.preferences || {},
        'mobile_number': result.data.data.mobile_number || '',
        'admin_status': result.data.data.admin_status,
        'user_lesson_status': result.data.data.lesson_status || {},
        'photoUrl': result.data.data.profile_image || '',
    }
}