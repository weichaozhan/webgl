import * as Three from 'three'

const container = document.querySelector('#demo3')

const scene = new Three.Scene()
const renderer = new Three.WebGLRenderer()
const camera = new Three.PerspectiveCamera(45, container.offsetWidth/container.offsetHeight, 1, 50)

renderer.setSize(container.offsetWidth, container.offsetHeight)
container.appendChild(renderer.domElement)