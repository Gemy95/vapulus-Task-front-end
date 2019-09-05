// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false ,
 // API_URL:"http://localhost:3000/
 API_URL:"https://enigmatic-fjord-69343.herokuapp.com/",
  firebase : {
    apiKey: "AIzaSyCVkLveCGMczLSzdynO8GLklBE97Ez86eA",
    authDomain: "vapulus-task.firebaseapp.com",
    databaseURL: "https://vapulus-task.firebaseio.com",
    projectId: "vapulus-task",
    storageBucket: "",
    messagingSenderId: "678661932836",
    appId: "1:678661932836:web:2ae66fc91fee4329e055b1"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
