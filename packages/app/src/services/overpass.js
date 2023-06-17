import { Observable, throwError } from 'rxjs';
import OverpassFrontend from 'overpass-frontend';

let instance = null;
// https://rawgit.com/plepe/overpass-frontend/master/doc/OverpassFrontend.html
const overpassFrontend = new OverpassFrontend(
  '//overpass-api.de/api/interpreter',
  {
    effortBBoxFeature: 20
  }
);

export const collectAirports = bbox => {
  if (!bbox?.minlat || !bbox?.maxlat || !bbox?.minlon || !bbox?.maxlon) {
    return throwError(() => {
      return new Error('no bbox');
    });
  }

  if (instance) {
    instance.abort();
    instance = null;
  }

  return new Observable(subscriber => {
    instance = overpassFrontend.BBoxQuery(
      'nwr["aeroway"="aerodrome"]',
      bbox,
      {
        // limit: 10,
        split: 20,
        properties: OverpassFrontend.ALL
      },
      (err, result) => {
        if (err) {
          console.log('ERROR');
          subscriber.error(err);
        }
        subscriber.next(result);
      },
      err => {
        if (err) {
          console.log('ERROR 2');
          subscriber.error(err);
        }
        subscriber.complete();
        instance = null;
      }
    );
  });
};
