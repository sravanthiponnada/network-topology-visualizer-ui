# Topology visualization
This application is an implementation part of the bachelor thesis `Network Topology Visualization in Angular Framework`. 
Author of the thesis is Martin Hamerník (contact him at 445720@mail.muni.cz).


The application is a frontend visualization of a network topology in form of a graph and map written in Angular.

## Prerequisites
To run the application you need to have following tools installed.
 
- [Node.js](https://nodejs.org/en/) version 8.x or higher
- [NPM](https://www.npmjs.com/) version 5.x or higher
- [Angular CLI](https://github.com/angular/angular-cli) - run `npm install -g @angular/cli`

For detailed guide, follow [Angular quickstart](https://angular.io/guide/quickstart)

Other libraries and dependencies will be installed by running `npm install` in the root folder of the application.

## Structure of the application
The project follows standard structure of an Angular application. 
To learn more about the structure of Angular applications,
consult the theoretical part of this thesis or [project file review](https://angular.io/guide/quickstart#project-file-review).

##### Source code
The source code of the application itself (inside the `app` folder) follows the structure below.

- **directives** - all directves are placed here.
- **graph** - all core components of the graph page (sidebar, menus) are located here.
- **map-overlay** - all core components of the map page are located here.
- **model** -data model and enum classes of the application are located here.
- **others** - util classes.
- **services** - all services are placed here.
- **testing** - util classes for testing.
- **visuals** - visual components of graph and map components are located here.

#### Modules
Application's feature modules are lazily-loaded when they are needed.

**Core modules**
- app-routing.module.ts
- app.module.ts

**Feature modules**
- graph-routing.module.ts
- graph-material.module.ts
- graph.module.ts
  - graph-visual-components.module.ts
    - directives.module.ts

- map-routing.module.ts
- map.module.ts
  - map-visual-components.module.ts

#### Tests
All test files are recognized by having `.spec` extension.

###### Unit tests
Unit tests are placed in the same folder as each component (as it is recommended by the Angular guidelines) 
with the exception of tests for services, which are placed in the `src/app/services/tests/` folder.

###### E2E tests
E2E tests are placed in the `e2e` folder.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Running the application on a development server
Run `ng serve` in the root folder of the application for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

The development server uses test JSON files to load data for topology, map, and decorators. JSON files are located in the assets folder. 
Feel free to modify and add your own test files. 

Test data of decorators are meant to demonstrate all possible options of decorators. 
If the visualization feels congested with all the active decorators, use decorator filters or disable them completely in the sidebar menu.

Even though the decorators are powered by test data which does not change in time, POST request bodies to REST API are still created and logged into the console.
You may test using absolute and relative time by observing logs in the browser's console.

To test a multi-leveled topology, change the value of attribute  `topologyRestUrl` to `/assets/recursive_graph_test_data.json'`.
To return to the original topology, change the value back to  `/assets/graph_test_data.json`

If you wish to change any of the attached test data or link your own, please place them in the assets folder and change the attributes in environment.ts accordingly.

## Running the application on a production server
The production version uses REST API to load data for topology and decorators (map is not supported) from a server. 
If you wish to test the application in cooperation with other KYPO projects, please follow the steps below.

#### Prerequisites
- [JDK 1.8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) or higher
- [Tomcat7](https://tomcat.apache.org/download-70.cgi)
- [Maven](https://maven.apache.org/)
- [Git](https://git-scm.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Kibana 5.5.0](https://www.elastic.co/downloads/past-releases)
- [Elasticsearch 5.5.0](https://www.elastic.co/downloads/past-releases/elasticsearch-5-5-0)

#### KYPO Projects
Clone following projects
- **kypo2-service-sandbox** - `git clone https://gitlab.ics.muni.cz/kypo2/services-and-portlets/kypo2-service-sandbox.git`
- **kypo2-service-kypo-management** - `git clone https://gitlab.ics.muni.cz/kypo2/services-and-portlets/kypo2-service-kypo-management.git`
- **kypo2-db-model** - `git clone https://gitlab.ics.muni.cz/kypo2/services-and-portlets/kypo2-db-model`
- **kypo2-rest-commons** - `git clone https://gitlab.ics.muni.cz/kypo2/services-and-portlets/kypo2-rest-commons`
- **kypo2-audit-service** - `git clone https://gitlab.ics.muni.cz/kypo2/services-and-portlets/kypo2-audit-service`
- **kypo2-rest-sandbox** - `git clone https://gitlab.ics.muni.cz/kypo2/services-and-portlets/kypo2-rest-sandbox`

The projects are changing over time, to ensure compatibility with the frontend. Checkout following commits.
- in **kypo2-rest-sandbox** `git checkout b0e35b199c3f2390695e6bce8b9813885b6d5234 .`
- in **kypo2-service-sandbox** `git checkout 9f0d5a434435d05a71b8bade3a21751790d723de .`

Install projects with `mvn clean install` in following order.

1. **kypo2-db-model**
2. **kypo2-service-kypo-management**
3. **kypo2-rest-commons**
4. **kypo2-service-sandbox**
5. **kypo2-audit-service**
6. **kypo2-rest-sandbox**

#### Test data
Create local database `dbmodel` and `kypodb` in PostgreSQL. Scripts to create schemas and fill them with data are located in
`resources/testData` in **kypo2-service-sandbox** project.

Create config file. Example is located in  `resources/database.properties` in **kypo2-service-sandbox** project.

Run Elasticsearch (`/elasticsearch-5.5.0/bin/elasticsearch`) and Kibana (`kibana-5.5.0/bin/kibana`).

Navigate to `http://localhost:5601/app/kibana`  and open the Dev Tools window in left toolbar. 
You can insert queries to database storing measurements in the network (decorators). Note that only speed decorators are currently available.

###### Example queries
  **GET** whole database
 `GET kypo2-cz.muni.csirt.kypo.measurements*/_search`
  
  **DELETE** whole database 
 `DELETE kypo2-cz.muni.csirt.kypo.measurements*`
 
  **DELETE** entry by match query (change the name of the interface accordingly to your data)
  
    POST kypo2-cz.muni.csirt.kypo.measurements*/_delete_by_query
     {
       "query": { 
         "match": {
           "interface": "Pc1"
         }
       }
     }
   
   **INSERT** one entry of received data on network node. Change the data to match the address and interfaces inside you local PostgreSQL DB.
   Timestamp is UNIX epoch time in millis. Use absolute or relative time picker in the topology visualization to display the data.
   
     POST kypo2-cz.muni.csirt.kypo.measurements.numberofbytesreceived/cz.muni.csirt.kypo.measurements.NumberOfBytesReceived
     {
       "type" : "cz.muni.csirt.kypo.measurements.NumberOfBytesReceived",
       "timestamp": 1523366703000,
       "ip_address":"150.150.2.1",
       "interface": "Pc1",
       "value" : 500
     }
   
  **INSERT** one entry of transmitted data on network node. Change the data to match the address and interfaces inside you local PostgreSQL DB.
  Timestamp is UNIX epoch time in millis. Use absolute or relative time picker in the topology visualization to display the data.
      
    POST kypo2-cz.muni.csirt.kypo.measurements.numberofbytestransmitted/cz.muni.csirt.kypo.measurements.NumberOfBytesTransmitted
     {
       "type" : "cz.muni.csirt.kypo.measurements.NumberOfBytesTransmitted",
       "timestamp": 1523367345000,
       "ip_address":"150.150.2.1",
       "interface": "Pc1",
       "value" : 1000
     }
     
#### Running the REST API
Run the REST API for topology and decorators by `mvn tomcat7:run -Dpath.to.db.config.file=/etc/kypo2_config.properties`
Change the path to the config file to match your file structure. 
You can test if the REST API is running by GET request to following address `http://localhost:8080/kypo2-rest-sandbox/api/v1/sandbox1/topology`

#### Running the topology visualization
Run `ng serve --env=prod` in the root folder of the application for a prod server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

**Note:** Most of the browsers block [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) due to security reasons.
To run the application without problems use browser plugin ([CORS Toggle](https://chrome.google.com/webstore/detail/cors-toggle/jioikioepegflmdnbocfhgmpmopmjkim) for example)
or run the browser with disabled security features (You may need to kill all Chrome processes to run properly).

- Windows: `chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security`
- Linux: `google-chrome --disable-web-security --user-data-dir`

Similar alternatives are available for Mozilla Firefox.

## Documentation
Documentation generated by [TypeDoc](http://typedoc.org/guides/installation/) is located in folder `documentation` in 
the root folder of the application.
     
## Further help
If any of the previous steps are unclear to you or you are experiencing any trouble with the application or its setup don't hesitate to 
contact the author at 445720@mail.muni.cz.
