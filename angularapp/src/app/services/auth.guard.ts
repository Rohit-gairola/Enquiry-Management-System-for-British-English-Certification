import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(private authservice: AuthService, private router: Router){}
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
 
      const allowedRole = route.data['allowedRole']
      if(this.authservice.isAuthenticated(allowedRole)){
        return true;
      }
      else{
        this.router.navigate(['/adpc']);
        return false;
      }
  }
 
}
 
 
 
 
 