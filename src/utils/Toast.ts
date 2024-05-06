import { toast } from 'vuetify-sonner';

const Toast = {
  success: (message: string) => {
    toast(message, {
      cardProps: {
        color: 'success',
      },
      duration: 3000,
      id: Math.random(),
      important: undefined,
      onAutoClose: undefined,
      onDismiss: undefined,
      prependIcon: 'mdi-check-circle-outline',
    });
  },
  error: (message: string) => {
    toast(message, {
      cardProps: {
        color: 'error',
      },
      duration: 3000,
      id: Math.random(),
      important: undefined,
      onAutoClose: undefined,
      onDismiss: undefined,
      prependIcon: 'mdi-cancel',
    });
  },
};

export default Toast;
