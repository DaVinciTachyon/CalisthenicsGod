import { store } from 'react-notifications-component';

const success = (message, title = 'Success') =>
  notification(message, title, 'success');
const error = (message, title = 'Error') =>
  notification(message, title, 'danger');

const notification = (message, title = undefined, type = 'default') =>
  store.addNotification({
    title,
    message,
    type,
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    isMobile: true,
    dismiss: {
      duration: 5000,
      onScreen: true,
      pauseOnHover: true,
    },
  });

export { success, error };
