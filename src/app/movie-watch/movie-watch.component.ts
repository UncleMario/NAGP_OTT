import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { MovieUserService } from '../movie-user.service';
import { AuthService } from '../auth/auth.service';
import { MovieUser } from '../movieUser';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-watch.component.html',
  styleUrls: [ './movie-watch.component.scss' ]
})

export class MovieWatchComponent implements OnInit {
  movie: Movie;
  movieUser: MovieUser;
  userName: string;
  review: string;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private movieUserService: MovieUserService,
    private authService: AuthService,
    private location: Location
  ) {
    this.userName = this.getUserName();
    this.review = "";
    this.movie = { id: 1, name: 'Tarzan', title: '', description: '', rating: 0, language: '', genre: '', prime: false }
    this.movieUser = { id: 1, movieId: 1, userName: "user", watched: false, watchLater: false, favorite: false, review: ""};
  }

  async ngOnInit() {
    await this.getMovie();
    await this.getMovieUser();
    this.review = this.movieUser.review;
  }

  async getMovie() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.movie = await firstValueFrom(this.movieService.getMovie(id));
  }

  getUserName(): string {
    if(this.authService.userIsLoggedIn){
      return "user";
    }
    else if(this.authService.adminIsLoggedIn){
      return "admin";
    }

    return "";
  }

  async getMovieUser() {
    const movieId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    var mu = await firstValueFrom(this.movieUserService.getMovies());
    this.movieUser = mu.filter(f => f.movieId == movieId && f.userName == this.userName)[0];
  }

  async watchMovie() {
    const movieId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.movieUser.watched = true;
    await firstValueFrom(this.movieUserService.updateMovieUser(this.movieUser));
    var mu = await firstValueFrom(this.movieUserService.getMovies());
    this.movieUser = mu.filter(f => f.movieId == movieId && f.userName == this.userName)[0];
  }

  async watchLater() {
    const movieId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.movieUser.watchLater = true;
    await firstValueFrom(this.movieUserService.updateMovieUser(this.movieUser));
    var mu = await firstValueFrom(this.movieUserService.getMovies());
    this.movieUser = mu.filter(f => f.movieId == movieId && f.userName == this.userName)[0];
  }

  async favoriteMovie() {
    const movieId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.movieUser.favorite = true;
    await firstValueFrom(this.movieUserService.updateMovieUser(this.movieUser));
    var mu = await firstValueFrom(this.movieUserService.getMovies());
    this.movieUser = mu.filter(f => f.movieId == movieId && f.userName == this.userName)[0];
  }

  goBack(): void {
    this.location.back();
  }

  async save() {
    const movieId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.movieUser.review = this.review;
    await firstValueFrom(this.movieUserService.updateMovieUser(this.movieUser));
    var mu = await firstValueFrom(this.movieUserService.getMovies());
    this.movieUser = mu.filter(f => f.movieId == movieId && f.userName == this.userName)[0];
  }

  hasPrime(): boolean{
    if(this.movie.prime){
      return this.authService.hasPrime();
    }
    
    return true;
  }
}
