
import {
  initShaders,
  createProgram,
  loadShader,
  getWebGLContext,
} from '../../lib/cuon-utils.js';

function main() {
  const canvas = document.querySelector('#webgl-example1');

  const gl = getWebGLContext(canvas);
  
  gl.clearColor(0.0,0.0,0.0,1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}
 
main();