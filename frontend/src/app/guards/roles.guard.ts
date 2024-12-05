import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const RolesGuard: CanActivateFn = (route, state) => {
  const service = inject(AuthService);
  if (!service.isLoggedIn()) {
    inject(Router).navigateByUrl('login');
    return false;
  }
  if (service.getRol() == "Alumno") {
    inject(Router).navigateByUrl('login');
    return false;
  }
  return true;
};
