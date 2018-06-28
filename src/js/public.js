import * as Three from 'three'

/**
 * @description 初始化 render
 * @param {String} selector 容器选择器
 * @param {Number} clearColor 16 进制，清除色
 */
export function initRenderer(selector, clearColor) {
  const container = document.querySelector(selector)
  const width = container.offsetWidth
  const height = container.offsetHeight

  const renderer = new Three.WebGLRenderer({
    antialias: true
  })

  renderer.setSize(width, height)
  renderer.setClearColor(clearColor)
  container.appendChild(renderer.domElement)

  return {
    renderer,
    width,
    height
  }
}