import { concatMap } from 'rxjs';
import { importCSVasJSON } from './csvImport.js';
import { updateAlgoliaIndex } from './upload.js';
const list = [];
importCSVasJSON('./opensky-database/aircraftDatabase-2023-06.csv')
  .pipe(
    concatMap(json => {
      return updateAlgoliaIndex(json);
    })
  )
  .subscribe({
    next: result => {
      // list.push(...json);
      list.push(result);
    },
    error: e => {
      console.error(e);
      // throw new Error(e);
    },
    complete: e => {
      console.log('Complete', list.length, list[0]);
    }
  });
