import {
  initShaders,
  createProgram,
  loadShader,
  getWebGLContext,
} from '../../lib/cuon-utils.js';

const VSHEADER_SOURCE = `
  void main() {
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
    gl_PointSize = 20.0;
  }
`;
const FSHEADER_SOURCE = `
  void main() {
    gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
  }
`;

const canvas = document.querySelector('#HelloPoint1');
const gl = getWebGLContext(canvas);

initShaders(gl, VSHEADER_SOURCE, FSHEADER_SOURCE);

gl.clearColor(0.0, 0.0, 0.0, 0.8);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.POINTS, 0, 1);

