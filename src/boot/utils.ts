import { Notify } from 'quasar';

export function showSuccess(message: string, classes: any = '') {
  Notify.create({
    classes,
    message,
    color: 'positive',
    position: 'top',
    icon: 'done'
  });
}

export function showError(message: string, classes: any = '') {
  Notify.create({
    classes,
    message,
    color: 'negative',
    position: 'top',
    icon: 'report_problem'
  });
}
