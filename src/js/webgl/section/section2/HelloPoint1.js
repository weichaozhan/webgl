import {
  initShaders,
  createProgram,
  loadShader,
  getWebGLContext,
} from '../../lib/cuon-utils.js';

const canvas = document.querySelector('#HelloPoint1');
const gl = getWebGLContext(canvas);

gl.clearColor(0.0, 0.0, 0.0, 0.8);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.POINTS, 0, 1);

