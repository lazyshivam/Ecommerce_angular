import { CanMatchFn } from '@angular/router';

export const userPermissionGuard: CanMatchFn = (route, state) => {

  const token = localStorage.getItem('Bearer Token');
  if (token && token.length) {
    return true;
  }

  return false;
};
