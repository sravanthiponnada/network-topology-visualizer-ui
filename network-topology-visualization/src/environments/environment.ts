// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {

  production: false,
  topologyRestUrl: '/assets/graph_test_data.json',
  // topologyRestUrl: '/assets/recursive_graph_test_data.json',
  decoratorsRestUrl: '/assets/decorators_test_data/',
  mapTopologyRestUrl: '/assets/map_test_data.json',

  defaultDecoratorRefreshPeriodInSeconds: 3,
  useRealTime : true,

};
