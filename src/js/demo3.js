import * as Three from 'three'

import {
  initRenderer
} from './public'

// render
const {
  renderer,
  width,
  height
} = initRenderer('#demo3', 0xaaffdd)

// scene
const scene = new Three.Scene()
// camera
const camera = new Three.PerspectiveCamera(45, width / height, 1, 10000)
camera.position.set(0, 0, 3)

// light
const light = new Three.DirectionalLight(0xffffff, 1.0, 0)

light.position.set(0, 0, 1)

// init line
const geometry1 = new Three.Geometry()
const geometry2 = new Three.Geometry()
const geometry3 = new Three.Geometry()
const matirial = new Three.LineBasicMaterial({
  vertexColors: true,
  color: 0xffffff
})
const color1 = new Three.Color(0x000000), color2 = new Three.Color(0xff0000)
const point1 = new Three.Vector3(0, 0, 0), point2 = new Three.Vector3(0, 1, 0), point3 = new Three.Vector3(1, 0, 0)

geometry1.vertices.push(point1, point2)
geometry1.colors.push(color1, color2)

geometry1.vertices.push(point1, point3)
geometry1.colors.push(color1, color2)

geometry1.vertices.push(point2, point3)
geometry1.colors.push(color1, color2)

const line1 = new Three.Line(geometry1, matirial, Three.LinePieces)
const line2 = new Three.Line(geometry2, matirial, Three.LinePieces)
const line3 = new Three.Line(geometry3, matirial, Three.LinePieces)

// build
scene.add(line1)
scene.add(line2)
scene.add(line3)
scene.add(light)
scene.add(camera)

renderer.clear()
renderer.render(scene, camera)
