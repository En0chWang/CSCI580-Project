let scene, camera, renderer, skyboxGeo, skybox, controls, myReq, sphere
// let worldDirection = new THREE.Vector3()
let zoomOut = false
let autoRotate = true
// Initial SkyboxImage is Arid. If you wanna change the path of inital SkybokImage or add button. to add button check the code above. I left the comment.
// You can download free images for Skybox! -> opengameart.org
let skyboxImage = 'Arid/arid2'
let effectController = {
  shininess: 40.0,
  ka: 0.17,
  kd: 0.51,
  ks: 0.2,
  metallic: true,
  hue: 0.121,
  saturation: 0.73,
  lightness: 0.66,
  lhue: 0.04,
  lsaturation: 0.01, // non-zero so that fractions will be shown
  llightness: 1.0,
  // bizarrely, if you initialize these with negative numbers, the sliders
  // will not show any decimal places.
  lx: 0.32,
  ly: 0.39,
  lz: 0.7,
  newTess: 15,
  bottom: true,
  lid: true,
  body: true,
  fitLid: false,
  nonblinn: false,
  newShading: 'glossy',
}
let teapotGeometry = new THREE.TeapotBufferGeometry(
  400,
  30,
  effectController.bottom,
  effectController.lid,
  effectController.body,
  effectController.fitLid,
  !effectController.nonblinn
)
// teapotGeometry.attributes.color.needsUpate = true
function init() {
  scene = new THREE.Scene()

  // fov = 55, aspect = window.innerWidth/window, near = 45, far = 100
  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    45,
    30000
  )
  camera.position.set(-900, -100, -900)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  const materialArray = createMaterialArray(skyboxImage)
  skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000)
  skybox = new THREE.Mesh(skyboxGeo, materialArray)

  scene.add(skybox)

  let urls = createPathStrings(skyboxImage)
  let loader = new THREE.CubeTextureLoader()
  let sphereMaterial = new THREE.MeshBasicMaterial({
    envMap: loader.load(urls),
  })
  // var material = new THREE.MeshBasicMaterial({
  //   vertexColors: THREE.VertexColors,
  //   side: THREE.DoubleSide,
  // })
  sphere = new THREE.Mesh(teapotGeometry, sphereMaterial)
  // sphere = new THREE.Mesh(teapotGeometry, material)
  sphere.position.set(0, 100, 0)
  scene.add(sphere)

  // We need to limit the zoom distance because if we zoom out too much
  controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.enabled = true
  // controls.addEventListener('change', renderer);
  controls.minDistance = 500
  controls.maxDistance = 1500
  controls.autoRotate = true
  controls.autoRotateSpeed = 1.0

  window.addEventListener('resize', onWindowResize, false)

  animate()
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
  // renderer.render(scene, camera)
  // requestAnimationFrame(animate)

  controls.autoRotate = autoRotate

  if (controls.maxDistance == 1500 && zoomOut) {
    controls.maxDistance = 20000
    camera.position.z = 20000
  } else if (controls.maxDistance == 20000 && !zoomOut) {
    console.log('it reached maxDistance!')
    controls.maxDistance = 1500
    camera.position.z = 2000
  }

  controls.update()
  renderer.render(scene, camera)

  // once camera position changes, console log current vector3
  // camera.getWorldDirection(worldDirection)

  // now we get surface vector3
  // let pos_arr = teapotGeometry.getAttribute('position').array
  // let pos_count = pos_arr.length
  // var colors = []
  // let norms = teapotGeometry.getAttribute('normal').array
  // for (var i = 0; i < 30; i += 3) {
  //   const pos_vector3 = new THREE.Vector3(
  //     pos_arr[i],
  //     pos_arr[i + 1],
  //     pos_arr[i + 2]
  //   ).normalize()
  //   const norm_vector3 = new THREE.Vector3(norms[i], norms[i + 1], norms[i + 2])
  //   let eyeToSurface = new THREE.Vector3()
  //   eyeToSurface.subVectors(pos_vector3, worldDirection)
  //   let reflect_vector3 = eyeToSurface.reflect(norm_vector3)
  //   let raycaster = new THREE.Raycaster(norm_vector3, reflect_vector3)
  //   let intersection_object = raycaster.intersectObject(skybox)[0]
  //   let face_normal = intersection_object.face.normal
  //   let face_material_index = intersection_object.face.materialIndex
  //   let uv = intersection_object.uv
  //   // console.log(reflect_vector3)
  //   let img = createPathStrings(skyboxImage)[face_material_index]

  //   let loader = new THREE.ImageLoader()
  //   loader.load(
  //     img,
  //     function (image) {
  //       const canvas = document.createElement('canvas')
  //       const context = canvas.getContext('2d')
  //       canvas.width = image.width
  //       canvas.height = image.height

  //       context.drawImage(image, 0, 0)
  //       let texData = context.getImageData(0, 0, image.width, image.height)
  //       let u = uv.x,
  //         v = uv.v
  //       var tx = Math.min((emod(u, 1) * texData.width) | 0, texData.width - 1)
  //       var ty = Math.min((emod(v, 1) * texData.height) | 0, texData.height - 1)
  //       var offset = (ty * texData.width + tx) * 4
  //       var r = texData.data[offset + 0]
  //       var g = texData.data[offset + 1]
  //       var b = texData.data[offset + 2]
  //       colors[i] = r
  //       colors[i + 1] = g
  //       colors[i + 2] = b
  //     },
  //     undefined,
  //     function () {
  //       console.error('an error happened')
  //     }
  //   )
  // }

  // colors = new Uint8Array(colors)
  // teapotGeometry.setAttribute(
  //   'color',
  //   new THREE.BufferAttribute(colors, 3, true)
  // )

  // console.log(norms)

  // calculate eyeToSurface vetor3

  myReq = window.requestAnimationFrame(animate)
}

// function emod(n, m) {
//   return ((n % m) + m) % m
// }

// function getImageData(image) {
//   var canvas = document.createElement('canvas')
//   canvas.width = image.width
//   canvas.height = image.height

//   var context = canvas.getContext('2d')
//   context.drawImage(image, 0, 0)

//   return context.getImageData(0, 0, image.width, image.height)
// }

// function getPixel(imagedata, x, y) {
//   var position = (x + imagedata.width * y) * 4,
//     data = imagedata.data
//   return {
//     r: data[position],
//     g: data[position + 1],
//     b: data[position + 2],
//     a: data[position + 3],
//   }
// }

function createMaterialArray(filename) {
  const skyboxImagepaths = createPathStrings(filename)
  const materialArray = skyboxImagepaths.map((image) => {
    let texture = new THREE.TextureLoader().load(image)
    let meshMaterial = new THREE.MeshBasicMaterial({ map: texture })
    meshMaterial.side = THREE.BackSide
    return meshMaterial
  })
  return materialArray
}

function createPathStrings(filename) {
  const basePath = 'Cubemap_Images/'
  const baseFilename = basePath + filename
  const fileType = '.jpg'
  const sides = ['ft', 'bk', 'up', 'dn', 'rt', 'lf']
  const pathStings = sides.map((side) => {
    return baseFilename + '_' + side + fileType
  })
  return pathStings
}

init()

function switchSkyBox(skyboxName) {
  scene.remove(skybox)

  skyboxImage = skyboxName
  const materialArray = createMaterialArray(skyboxImage)

  skybox = new THREE.Mesh(skyboxGeo, materialArray)
  scene.add(skybox)
  scene.remove(sphere)
  let urls = createPathStrings(skyboxImage)
  let loader = new THREE.CubeTextureLoader()
  let sphereMaterial = new THREE.MeshBasicMaterial({
    envMap: loader.load(urls),
  })

  sphere = new THREE.Mesh(teapotGeometry, sphereMaterial)
  sphere.position.set(0, 100, 0)
  scene.add(sphere)
}

function toggleAutoRotate(value) {
  autoRotate = value
}

function toggleZoom(value) {
  zoomOut = value
  zoomBtn.textContent = value ? 'Inside Box' : 'Outside Box'
  loading.style.display = value ? 'none' : 'show'
}

// ***** To add Button to change the background, add here
const spaceBtn = document.getElementById('mountains')
const test1Btn = document.getElementById('test1')
const test2Btn = document.getElementById('test2')
const autoRotateBtn = document.getElementById('autoRotate')
const zoomBtn = document.getElementById('zoom')
const loading = document.getElementById('loading')

// ***** After add button, add EventListener Here, make sure your image path is correct. Create folder first and put 6 images under the folder.
spaceBtn.addEventListener('click', () => switchSkyBox('Arid/arid2'))
test1Btn.addEventListener('click', () => switchSkyBox('Trance/trance'))
test2Btn.addEventListener('click', () =>
  switchSkyBox('LancellottiChapel/chapel')
)
autoRotateBtn.addEventListener('click', () => toggleAutoRotate(!autoRotate))
zoomBtn.addEventListener('click', () => toggleZoom(!zoomOut))
