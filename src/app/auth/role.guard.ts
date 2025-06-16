import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { ApiAdmService } from '../services/api-adm.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const admService = inject(ApiAdmService);
  const router = inject(Router);
  const allowedRoles = route.data['roles'] as string[];

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  const usuario = authService.getUsuarioDados();
  if (allowedRoles.includes(usuario?.tipo)) {
    return true;
  }
  admService.message("Você não tem permissão pra acessar essa funcionalidade")
  router.navigate(['/dashboard']);
  return false;
};
