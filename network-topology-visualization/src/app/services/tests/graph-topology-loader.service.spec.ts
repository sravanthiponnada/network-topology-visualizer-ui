
import {TestBed} from '@angular/core/testing';
import {GraphTopologyLoaderService} from '../graph-topology-loader.service';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import {HttpClient} from '@angular/common/http';
import {asyncData} from '../../testing/async-observable-helpers';
import {RouterNode} from '../../model/node/router-node';
import {NodePhysicalRoleEnum} from '../../model/enums/node-physical-role-enum';
import {HostNode} from '../../model/node/host-node';
import {Link} from '../../model/link/link';
import {LinkTypeEnum} from '../../model/enums/link-type-enum';
import 'rxjs/add/operator/map';
import {emptyTopology, simpleTopology} from '../../testing/topology-test-jsons';


let loaderService: GraphTopologyLoaderService;
let httpClientSpy: { get: jasmine.Spy };

describe('Graph topology loader service', () => {
  beforeEach(() => {

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule,
      platformBrowserDynamicTesting());

    TestBed.configureTestingModule({
      providers: [
        GraphTopologyLoaderService,
        {provide: HttpClient, useValue: httpClientSpy}
      ]
    });

    loaderService = TestBed.get(GraphTopologyLoaderService);
  });

  it('should have called http get one time', () => {
    httpClientSpy.get.and.returnValue(asyncData(emptyTopology));
    loaderService.getTopology('test').subscribe(
      topology => {
        expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
      }
    );
  });

  it('should have loaded nodes with correct attributes', () => {
    httpClientSpy.get.and.returnValue(asyncData(simpleTopology));
    const expectedHost = new HostNode(
      2, NodePhysicalRoleEnum.Desktop, 'pc', '150.150.2.2', 'e80::1ff:fe23:4567:890b', 2);
    const expectedRouter = new RouterNode(
      1, NodePhysicalRoleEnum.Router, 'router', '150.150.2.1', 'e80::1ff:fe23:4567:890a', [expectedHost]);


    loaderService.getTopology('test').subscribe(
      topology => {
        expect(topology.nodes).not.toBeNull('node array should not be null');
        expect(topology.nodes).not.toBeUndefined('node array should not be undefined');
        expect(topology.nodes.length).toEqual(2, 'node array should have two elements');

        const actualRouter = topology.nodes[0];
        expect(actualRouter.id).toEqual(expectedRouter.id,
          'expected router id to be: ' + expectedRouter.id + ' but it is: ' + actualRouter.id);
        expect(actualRouter.physicalRole).toEqual(expectedRouter.physicalRole,
          'expected router physical role to be: ' + expectedRouter.physicalRole + ' but it is: ' + actualRouter.physicalRole);
        expect(actualRouter.name).toEqual(expectedRouter.name,
          'expected router name to be: ' + expectedRouter.name + ' but it is: ' + actualRouter.name);
        expect(actualRouter.address4).toEqual(expectedRouter.address4,
          'expected router IPv4 address to be: ' + expectedRouter.address4 + ' but it is: ' + actualRouter.address4);
        expect(actualRouter.address6).toEqual(expectedRouter.address6,
          'expected router IPv6 address to be: ' + expectedRouter.address6 + ' but it is: ' + actualRouter.address6);


        const actualHost = topology.nodes[1];
        expect(actualHost.id).toEqual(expectedHost.id,
          'expected host id to be: ' + expectedHost.id + ' but it is: ' + actualHost.id);
        expect(actualHost.physicalRole).toEqual(expectedHost.physicalRole,
          'expected host physical role to be: ' + expectedHost.physicalRole + ' but it is: ' + actualHost.physicalRole);
        expect(actualHost.name).toEqual(expectedHost.name,
          'expected host name address to be: ' + expectedHost.name + ' but it is: ' + actualHost.name);
        expect(actualHost.address4).toEqual(expectedHost.address4,
          'expected host IPv4 address to be: ' + expectedHost.address4 + ' but it is: ' + actualHost.address4);
        expect(actualHost.address6).toEqual(expectedHost.address6,
          'expected host IPv6 address to be: ' + expectedHost.address6 + ' but it is: ' + actualHost.address6);
      }
    );
  });

  it('should have created instances of correct types of nodes', () => {
    httpClientSpy.get.and.returnValue(asyncData(simpleTopology));

    loaderService.getTopology('test').subscribe(
      topology => {
        const actualRouter = topology.nodes[0];
        expect(actualRouter instanceof RouterNode).toBeTruthy('router node is not an instance of RouterNode class');
        const actualHost = topology.nodes[1];
        expect(actualHost instanceof HostNode).toBeTruthy('host node is not an instance of HostNode class');
      }
    );
  });

  it('should have loaded links with correct attributes', () => {
    httpClientSpy.get.and.returnValue(asyncData(simpleTopology));

    const expectedHost = new HostNode(
      2, NodePhysicalRoleEnum.Desktop, 'pc', '150.150.2.2', 'e80::1ff:fe23:4567:890b', 2);
    const expectedRouter = new RouterNode(
      1, NodePhysicalRoleEnum.Router, 'router', '150.150.2.1', 'e80::1ff:fe23:4567:890a', [expectedHost]);
    const expectedLink1 = new Link(3,
      expectedRouter,
      expectedHost,
      LinkTypeEnum.InterfaceOverlay);
    const expectedLink2 = new Link(4,
      expectedHost,
      expectedRouter,
      LinkTypeEnum.InterfaceOverlay);

    loaderService.getTopology('test').subscribe(
      topology => {
        expect(topology.links).not.toBeNull('link array should not be null');
        expect(topology.links).not.toBeUndefined('link array should not be undefined');
        expect(topology.links.length).toEqual(2, 'link array should have two elements');

        const actualLink1 = topology.links[0];
        expect(actualLink1).not.toBeNull('link 1 should not be null');
        expect(actualLink1.id).toEqual(expectedLink1.id,
          'expected link id to be: ' + expectedLink1.id + ' but it is: ' + actualLink1.id);
        expect(actualLink1.source.id).toEqual(expectedLink1.source.id,
          'expected link source id to be: ' + expectedLink1.source.id + ' but it is: ' + actualLink1.source.id);
        expect(actualLink1.target.id).toEqual(expectedLink1.target.id,
          'expected link target id to be: ' + expectedLink1.target.id + ' but it is: ' + actualLink1.target.id);

        const actualLink2 = topology.links[1];
        expect(actualLink2).not.toBeNull('link 2 should not be null');
        expect(actualLink2.id).toEqual(expectedLink2.id,
          'expected link id to be: ' + expectedLink2.id + ' but it is: ' + actualLink2.id);
        expect(actualLink2.source.id).toEqual(expectedLink2.source.id,
          'expected link source id to be: ' + expectedLink2.source.id + ' but it is: ' + actualLink2.source.id);
        expect(actualLink2.target.id).toEqual(expectedLink2.target.id,
          'expected link target id to be: ' + expectedLink2.target.id + ' but it is: ' + actualLink2.target.id);
      }
    );


  });

  it('should have created inner structure', () => {
    httpClientSpy.get.and.returnValue(asyncData(simpleTopology));
    const expectedHost = new HostNode(
      2, NodePhysicalRoleEnum.Desktop, 'pc', '150.150.2.2', 'e80::1ff:fe23:4567:890b', 2);
    const expectedRouter = new RouterNode(
      1, NodePhysicalRoleEnum.Router, 'router', '150.150.2.1', 'e80::1ff:fe23:4567:890a', [expectedHost]);

    loaderService.getTopology('test').subscribe(
      topology => {
        const actualRouter = topology.nodes[0] as RouterNode;
        expect(actualRouter.children.length).toEqual(1, 'expected router node to have 1 child');
        expect(actualRouter.children[0].id).toEqual(expectedHost.id,
          'expected router child to have id: ' + expectedRouter.id + ' but it is: ' + actualRouter.children[0].id);
      });
  });

  it('should have loaded nothing', () => {
    httpClientSpy.get.and.returnValue(asyncData(emptyTopology));
    loaderService.getTopology('test').subscribe(
      topology => {
        expect(topology.nodes.length).toEqual(0, 'nodes array should be empty');
        expect(topology.links.length).toEqual(0, 'links array should be empty');
      });
  });
});



