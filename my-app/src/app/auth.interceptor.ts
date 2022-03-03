import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError, tap } from "rxjs";
import { userService } from "./service/user.service";

@Injectable()
export class AuthIntecepter implements HttpInterceptor {
constructor(private userService: userService,private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.userService.isAutheticated()){
            req = req.clone({
                headers: req.headers.set('authorization', this.userService.token)
            })
        } 
        return next.handle(req)
            .pipe(
                tap( () => {
                    console.log('Intercepter')
                }),
                catchError( (error: HttpErrorResponse) => {
                    console.log('[Interceptor Error]', error)
                    if(error.status === 401) {
                        this.userService.logOut()
                        this.router.navigate(['sign-in'])
                    }
                    if(error.status === 403) {
                        // this.userService.setNewToken(Response)
                        console.log('grragrg')
                    }
                    console.log('status error',error.status)
                    return throwError(error)
                })
            )
    }
}