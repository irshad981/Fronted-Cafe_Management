import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { GlobalConstnts } from '../shared/global-constants';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(public auth:  AuthService ,
    public router : Router,
    private snackbarService: SnackbarService) { }

    canActivate(route : ActivatedRouteSnapshot) : boolean {
      let expectedRoleArraay = route.data ;
      expectedRoleArraay = expectedRoleArraay.expectedRole;

      const token : any = localStorage.getItem('token');

      var tokenPayload : any;

      try {
        tokenPayload = jwt_decode(token);
      }
      catch(err){
        localStorage.clear();
        this.router.navigate(['/']);
      }

      let expectedRole = '';

      for(let i =0; i<expectedRoleArraay.length; i++){
        if(expectedRoleArraay[i] == tokenPayload.role){
          expectedRole = tokenPayload.role;
        }
      }
      
      if(tokenPayload.role == 'user' || tokenPayload.role == 'admin'){
        if(this.auth.isAuthenticated()  && tokenPayload.role == expectedRole){
          return true;
        }
        this.snackbarService.openSnackBar(GlobalConstnts.unauthorized , GlobalConstnts.error);
        this.router.navigate(['/cafe/dashboard']);
        return false;
      }else{
        this.router.navigate(['/']);
        localStorage.clear();
        return false;
      }

    }
}
