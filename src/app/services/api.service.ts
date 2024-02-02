import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environment/environment';


@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public token = new BehaviorSubject<string>('');
    BASE_URL: string;
    constructor(private http: HttpClient) {
        this.BASE_URL = environment.API_URL;
    }

    getPostList() {
        return this.http.get(this.BASE_URL + 'posts').pipe(map((response: any) => {
            return response;
        }),
            catchError((err: any) => {
                return err;
            })
        );
    }

    SignupUser(data: any): Observable<any> {
        const headers = new HttpHeaders().append('Content-Type', 'multipart/form-data');
        return this.http.post(this.BASE_URL + 'auth/signup', { body: data }, { headers }).pipe(map((response: any) => {
            return response;
        }),
            catchError((err: any) => {
                return err;
            })
        );
    }

    SigninUser(data: any): Observable<any> {
        return this.http.post(this.BASE_URL + 'auth/login', data).pipe(map((response: any) => {
            return response;
        }),
            catchError((err: any) => {
                return err;
            })
        );
    }

    LogoutUser(data: any): Observable<any> {
        return this.http.post(this.BASE_URL + 'auth/logout', data).pipe(map((response: any) => {
            return response;
        }),
            catchError((err: any) => {
                return err;
            })
        );
    }

    postscreate(data: any): Observable<any> {
        return this.http.post(this.BASE_URL + 'posts/create', data).pipe(map((response: any) => {
            return response;
        }),
            catchError((err: any) => {
                return err;
            })
        );
    }


    // updateAddress(resource: any) {
    //     return this.http.put(this.BASE_URL + '/formcontacts', resource).pipe(map((response: any) => {
    //         return response;
    //     }),
    //         catchError((err: any) => {
    //             return err;
    //         })
    //     );
    // }

    // deleteItem(id: any) {
    //     return this.http.delete(this.BASE_URL + '/item/' + id).pipe(map((response: any) => {
    //         return response;
    //     }),
    //         catchError((err: any) => {
    //             return err;
    //         })
    //     );
    // }

    // uploadItemImages(resource: any) {
    //     return this.http.patch(this.BASE_URL + '/item', resource).pipe(map((response: any) => {
    //         return response;
    //     }),
    //         catchError((err: any) => {
    //             return err;
    //         })
    //     );
    // }

    getDetailData(id:string) {
        return this.http.post(this.BASE_URL + 'postdetail/detaildata', { postdata_id: id }).pipe(map((response: any) => {
            return response;
        }),
            catchError((err: any) => {
                return err;
            })
        );
    }

    getJobList() {
        return this.http.get(this.BASE_URL + 'postlist').pipe(map((response: any) => {
            return response;
        }),
            catchError((err: any) => {
                return err;
            })
        );
    }


}
