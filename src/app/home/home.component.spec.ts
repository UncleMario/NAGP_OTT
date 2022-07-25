import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { MovieSearchComponent } from '../movie-search/movie-search.component';
import { MovieService } from '../movie.service';
import { MOVIES } from '../mock-movies';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let movieService;
  let getMoviesSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    movieService = jasmine.createSpyObj('MovieService', ['getMovies']);
    getMoviesSpy = movieService.getMovies.and.returnValue(of(MOVIES));
    TestBed
        .configureTestingModule({
          declarations: [HomeComponent, MovieSearchComponent],
          imports: [RouterTestingModule.withRoutes([])],
          providers: [{provide: MovieService, useValue: movieService}]
        })
        .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Movies" as headline', () => {
    expect(fixture.nativeElement.querySelector('h2').textContent).toEqual('Movies');
  });

  it('should call movieService', waitForAsync(() => {
       expect(getMoviesSpy.calls.any()).toBe(true);
     }));
});
