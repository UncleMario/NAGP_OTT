import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Movie } from './movie';
import { MovieUser } from './movieUser';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const movies = [
      { id: 1, name: 'Tarzan', prime: false },
      { id: 2, name: 'Superman', prime: true },
      { id: 3, name: 'Batman', prime: false },
      { id: 4, name: 'Flash', prime: true },
      { id: 5, name: 'Avengers', prime: false },
      { id: 6, name: 'Justice League', prime: true },
      { id: 7, name: 'Saw', prime: false },
      { id: 8, name: 'Aladdin', prime: true }
    ];

    const movieUser = [
      { id: 1, movieId: 1, userName: 'user', watched: false, watchLater: false, favorite: false},
      { id: 2, movieId: 2, userName: 'user', watched: false, watchLater: false, favorite: false },
      { id: 3, movieId: 3, userName: 'user', watched: false, watchLater: false, favorite: false },
      { id: 4, movieId: 4, userName: 'user', watched: false, watchLater: false, favorite: false },
      { id: 5, movieId: 5, userName: 'user', watched: false, watchLater: false, favorite: false },
      { id: 6, movieId: 6, userName: 'user', watched: false, watchLater: false, favorite: false },
      { id: 7, movieId: 7, userName: 'user', watched: false, watchLater: false, favorite: false },
      { id: 8, movieId: 8, userName: 'user', watched: false, watchLater: false, favorite: false },
      { id: 9, movieId: 1, userName: 'admin', watched: false, watchLater: false, favorite: false},
      { id: 10, movieId: 2, userName: 'admin', watched: false, watchLater: false, favorite: false },
      { id: 11, movieId: 3, userName: 'admin', watched: false, watchLater: false, favorite: false },
      { id: 12, movieId: 4, userName: 'admin', watched: false, watchLater: false, favorite: false },
      { id: 13, movieId: 5, userName: 'admin', watched: false, watchLater: false, favorite: false },
      { id: 14, movieId: 6, userName: 'admin', watched: false, watchLater: false, favorite: false },
      { id: 15, movieId: 7, userName: 'admin', watched: false, watchLater: false, favorite: false },
      { id: 16, movieId: 8, userName: 'admin', watched: false, watchLater: false, favorite: false }
    ];
    return {movies, movieUser};
  }

  //Override the genId method to ensure that tables always have an id.
  genId<T extends Movie | MovieUser>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 1;
  }
}
