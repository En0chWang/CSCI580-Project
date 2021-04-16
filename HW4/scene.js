const scene = {
  scene: {
    shapes: [
      {
        id: 'teapot1',
        notes: '',
        geometry: 'teapot',
        material: {
          Cs: [1, 0, 0],
          Ka: 0.5,
          Kd: 0.75,
          Ks: 0.9,
          n: 2.0,
        },
        transforms: [
          {
            Ry: 0,
          },
          {
            S: [1, 0.5, 1],
          },
          {
            T: [3, 0, 0],
          },
        ],
      },
      {
        id: 'teapot2',
        notes: 'no scaling',
        geometry: 'teapot',
        material: {
          Cs: [0, 1, 0],
          Ka: 0.35,
          Kd: 0.5,
          Ks: 0.9,
          n: 5.0,
        },
        transforms: [
          {
            Ry: 90,
          },
          {
            S: [1, 1, 1],
          },
          {
            T: [0, 0, -3],
          },
        ],
      },
      {
        id: 'teapot3',
        notes: '',
        geometry: 'teapot',
        material: {
          Cs: [0, 0, 1],
          Ka: 0.15,
          Kd: 0.35,
          Ks: 0.9,
          n: 10.0,
        },
        transforms: [
          {
            Ry: 180,
          },
          {
            S: [1, 1.5, 1],
          },
          {
            T: [-3, 0, 0],
          },
        ],
      },
      {
        id: 'teapot4',
        notes: '',
        geometry: 'teapot',
        material: {
          Cs: [1, 1, 0],
          Ka: 0.05,
          Kd: 0.15,
          Ks: 0.9,
          n: 20.0,
        },
        transforms: [
          {
            Ry: 270,
          },
          {
            S: [1, 2, 1],
          },
          {
            T: [0, 0, 3],
          },
        ],
      },
    ],
    lights: [
      {
        id: 'L1',
        type: 'ambient',
        color: [1, 1, 1],
        intensity: 0.2,
      },
      {
        id: 'L2',
        type: 'directional',
        color: [1, 0.5, 1],
        intensity: 0.6,
        from: [10, 5, 0],
        to: [0, 0, 0],
      },
    ],
    camera: {
      from: [3, 4, 10],
      to: [0, 0, 0],
      bounds: [3, 10, 1, -1, 1, -1],
      resolution: [512, 512],
    },
  },
}
