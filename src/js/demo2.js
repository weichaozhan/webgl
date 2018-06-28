/**
 * @description 立方体
 */

import * as Three from 'three'

let renderer = null
let scene = null
let camera = null
let cube = null
let animating = false

const container = document.querySelector('#demo2')

renderer = new Three.WebGLRenderer({
  antialias: true, // 抗锯齿
})
renderer.setSize(container.offsetWidth, container.offsetHeight)
renderer.setClearColor(0xffffff)
container.appendChild(renderer.domElement)

scene = new Three.Scene()

camera = new Three.PerspectiveCamera(45, container.offsetWidth/container.offsetHeight, 1, 20)
camera.position.set(0, 0, 5)
scene.add(camera)

// 创建平行光光源照射到物体上
const light = new Three.DirectionalLight(0xfedcba, 1.5)

light.position.set(0, 0, 5)
scene.add(light)

// 创建一个接受光，并带有纹理的立方体添加到场景
const imgurl = require('../images/tab_icon1.png')
// 纹理映射
const map = Three.ImageUtils.loadTexture(imgurl)

// 创建 phong 材质处理着色，传递给纹理映射
const material = new Three.MeshPhongMaterial({
  map: map
})
// 创建一个几何立方体
const geoMetry = new Three.CubeGeometry(1, 1, 1)

// 将几何体和材质放到一个网格中
cube = new Three.Mesh(geoMetry, material)
// 设置网格在场景中的朝向
cube.rotation.x = Math.PI / 5
cube.rotation.y = Math.PI / 12
// console.log(camera.position.copy())

scene.add(cube)

addMouseHandler()

// 运行渲染循环
run()

/**
 * @description 渲染循环
 */
function run() {
  renderer.render(scene, camera)

  if (animating) {
    cube.rotation.y -= 0.01
    cube.rotation.x += 0.01
  }

  // 在另一帧中回调
  requestAnimationFrame(run)
}

/**
 * @description 处理鼠标事件
 */
function addMouseHandler() {
  const dom = renderer.domElement

  dom.addEventListener('mouseup', onMouseUp)
}
/**
 * @description 点击开始关闭动画
 */
function onMouseUp(e) {
  e.preventDefault();
  
  animating = !animating
}