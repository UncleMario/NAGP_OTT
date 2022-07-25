import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, reduce, tap } from 'rxjs/operators';

import { MovieUser } from './movieUser';

@Injectable({
  providedIn: 'root'
})
export class MovieUserService {
  private moviesUrl = 'api/movieUser';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  /** GET movies from the server */
  getMovies(): Observable<MovieUser[]> {
    return this.http.get<MovieUser[]>(this.moviesUrl)
      .pipe(
        catchError(this.handleError<MovieUser[]>('getMovies', []))
      );
  }

  /** GET movie by id. Return `undefined` when id not found */
  getMovieNo404<Data>(id: number): Observable<MovieUser> {
    const url = `${this.moviesUrl}/?id=${id}`;
    return this.http.get<MovieUser[]>(url)
      .pipe(
        map(movies => movies[0]), // returns a {0|1} element array
        catchError(this.handleError<MovieUser>(`getMovie id=${id}`))
      );
  }

  /** GET movie by id. Will 404 if id not found */
  getMovieUser(movieId: number, userName: string): Observable<MovieUser> {
    var mv = { id: 1 };
    var data = JSON.stringify(mv);
    const params = new HttpParams().set('filters', data);
    return this.http.get<MovieUser>(this.moviesUrl, { params: params }).pipe(
      catchError(this.handleError<MovieUser>(`getMovieUser id=${movieId}`))
    );
  }

  //////// Save methods //////////

  addMovieUser(movieUser: MovieUser): Observable<MovieUser> {
    return this.http.post<MovieUser>(this.moviesUrl, movieUser, this.httpOptions).pipe(
      catchError(this.handleError<MovieUser>('addMovieUser'))
    );
  }

  /** PUT: update the movie on the server */
  updateMovieUser(movieUser: MovieUser): Observable<any> {
    return this.http.put(this.moviesUrl, movieUser, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateMovieUser'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
