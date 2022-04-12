import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _auth: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this._auth.authenticated) return true;
    const slug = route.params['slug'];
    this._auth.authenticate({ slug } as any);
    return true;
    // const token = localStorage.getItem('token');
    // if (!token) return this.router.createUrlTree(['/login'], { queryParams: { from } });
    // return this._auth.getRestaurantFromToken(token).pipe(
    //   map((res: any) => {
    //     this._auth.authenticate({ ...res.data });
    //     return true;
    //   }),
    //   catchError(() => {
    //     this._auth.logout();
    //     return of(this.router.createUrlTree(['/login'], { queryParams: { from } }));
    //   })
    // );
  }
}
