import csv from 'csvtojson';
import { Observable } from 'rxjs';
import { bufferCount } from 'rxjs/operators';

export const importCSVasJSON = filepath => {
  return new Observable(observer => {
    csv({
      ignoreEmpty: true,
      alwaysSplitAtEOL: true
    })
      .fromFile(filepath)
      .subscribe(
        data => {
          if (
            data.icao24 &&
            data.manufacturername &&
            data.model &&
            data.registration &&
            /^[a-zA-Z0-9-]+$/.test(data.registration)
          ) {
            observer.next({ objectID: data.icao24, ...data });
          }
        },
        e => {
          observer.error(e);
        },
        () => {
          observer.complete();
        }
      );
  }).pipe(bufferCount(10000));
};
