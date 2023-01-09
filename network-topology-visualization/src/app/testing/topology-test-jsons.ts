export const simpleTopology = {
  children: [
    {
      id: 1,
        address4: '150.150.2.1',
      address6: 'e80::1ff:fe23:4567:890a',
      name: 'router',
      physical_role: 'router',
      router: true,
      children: [
        {
          id: 2,
          name: 'pc',
          physical_role: 'desktop',
          address4: '150.150.2.2',
          address6: 'e80::1ff:fe23:4567:890b',
          host_node_id: 2
        }
      ]
    }
    ],
    links: [
      {
        id: 3,
        source_id: 1,
        target_id: 2,
      },
      {
        id: 4,
        source_id: 2,
        target_id: 1,
      }
    ],
  router_links: [

  ]
};

export const emptyTopology = {
  children: [],
  links: [],
  router_links: []
};
