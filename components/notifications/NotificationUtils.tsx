import { Feather } from '@expo/vector-icons';


export const toastColors = (colors: any) => {
    return {
        success: {
            bg: colors.background.nav,
            border: colors.success.main,
            t1_color: colors.success.dark,
            t2_color: colors.text.primary
        },
        error: {
            bg: colors.background.nav,
            border: colors.error.main,
            t1_color: colors.error.dark,
            t2_color: colors.text.primary
        },
        info: {
            bg: colors.background.nav,
            border: colors.info.main,
            t1_color: colors.info.dark,
            t2_color: colors.text.primary
        },
        warn: {
            bg: colors.background.nav,
            border: colors.warning.main,
            t1_color: colors.warning.dark,
            t2_color: colors.text.primary
        }
    }
}

enum ToastType {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info',
    WARN = 'warn',
    CUSTOMWARN = 'customWarn',
    CUSTOMERROR= 'customError'
}

export const getIconName = (type: ToastType): keyof typeof Feather.glyphMap => {
    switch (type) {
        case ToastType.SUCCESS:
            return 'thumbs-up';
        case ToastType.ERROR:
            return 'x-circle';
        case ToastType.INFO:
            return 'info';
        case ToastType.WARN:
            return 'alert-circle';
        case ToastType.CUSTOMWARN:
            return 'alert-triangle';
        case ToastType.CUSTOMERROR:
            return 'x-octagon';
        default:
            return 'bell';
    }
};