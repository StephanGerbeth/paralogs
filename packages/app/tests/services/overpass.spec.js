// @vitest-environment jsdom

import { describe, test, expect /*, beforeAll, afterAll */ } from 'vitest';
import { map } from 'rxjs';
import { collectAirports } from '../../src/services/overpass';

describe('Overpass', () => {
  test(
    'resolve one airport by bbox',
    () => {
      return new Promise(resolve => {
        collectAirports({
          minlat: 47.39474696708006,
          maxlat: 47.42959694961102,
          minlon: -1.256389617919922,
          maxlon: -1.1631774902343752
        })
          .pipe(map(({ id }) => id))
          .subscribe(id => {
            expect(id).toEqual('w42019199');
            resolve();
          });
      });
    },
    { timeout: 5000 }
  );

  test('resolve error for invalid bbox', () => {
    return new Promise(resolve => {
      collectAirports({})
        .pipe(map(({ id }) => id))
        .subscribe({
          next: id => {
            expect(id).toEqual('w42019199');
            resolve();
          },
          error: msg => {
            expect(msg).toEqual('no bbox');
            resolve();
          }
        });
    });
  });
});
