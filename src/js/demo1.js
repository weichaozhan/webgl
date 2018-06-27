/**
 * @description 显示矩形
 */

import * as Three from 'three'

const canvas = document.querySelector('#gl')
// 创建 threejs render 添加到 gl 下
const render = new Three.WebGLRenderer()

render.setSize(canvas.offsetWidth, canvas.offsetHeight)
canvas.appendChild(render.domElement)

// 创建场景
const scene = new Three.Scene()
// 创建相机 景相机（PerspectiveCamera），也就是类似于人眼观察的方式。第一个属性75设置的是视角（field of view）。第二个属性设置的是相机拍摄面的长宽比（aspect ratio）。我们几乎总是会使用元素的宽除以高，否则会出现挤压变形。接下来的2个属性是近裁剪面（near clipping plane） 和 远裁剪面（far clipping plane）。
const camera = new Three.PerspectiveCamera(45, canvas.offsetWidth / canvas.offsetHeight, 1, 10)

camera.position.set(0, 0, 1.5)
// 将相机添加到场景
scene.add(camera)

// 创建矩形几何体，添加到场景
const geoMetry = new Three.PlaneGeometry(1, 1)
const mesh = new Three.Mesh(geoMetry, new Three.MeshBasicMaterial())

scene.add(mesh)

render.render(scene, camera)