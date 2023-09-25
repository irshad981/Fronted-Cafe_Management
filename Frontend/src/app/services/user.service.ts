import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  signup(data:any){
    return this.httpClient.post(this.url+
      "/user/signup" ,data ,{
        headers:new HttpHeaders().set('Content-type' ,'application/json')
      })
  }


  // forgotPassword(data:any){
  //   return this.httpClient.post(this.url+
  //     "/user/forgotPassword" ,data ,{
  //       headers:new HttpHeaders().set('Content-type' ,'application/json')
  //     })
  // }

  forgotPassword(data:any , token:string){
    console.log(data.email + "this is data in userservice");
    console.log(token);
    const headers = {'Authorization': `Bearer ${token}`}
    
    return this.httpClient.post(this.url+
      "/user/forgotPassword" ,data ,{headers})
  }


  login(data:any){
    return this.httpClient.post(this.url+
      "/user/login" ,data ,{
        headers:new HttpHeaders().set('Content-type' ,'application/json')
      })
  }
  checkToken(){
    return this.httpClient.get(this.url+"/user/checkToken");
  }

  changePassword(data: any){
    return this.httpClient.post(this.url+
      "/user/changePassword" ,data ,{
        headers:new HttpHeaders().set('Content-type' ,'application/json')
      })
  }
}
