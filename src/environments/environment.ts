// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  knownLocations: [
    {
      'name': 'Bantumilli, AP',
      'latitude': 16.3703,
      'longitude': 81.2714
    },
    {
      'name': 'Palakollu, AP',
      'latitude': 16.5179,
      'longitude': 81.7253
    },
    {
      'name': 'Sringeri, KA',
      'latitude': 13.4198,
      'longitude': 75.2567
    }
  ],

  // auth config
  applicationId: 'd3e49752-d9c9-4963-a4b6-c52d033ec6ae',
  authority: "https://login.microsoftonline.com/887dd816-e3f5-4941-87df-78ecf94fa261",
  redirectUri: window.location.protocol + '//' + window.location.host,
  postLogoutRedirectUri: window.location.protocol + '//' + window.location.host
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
