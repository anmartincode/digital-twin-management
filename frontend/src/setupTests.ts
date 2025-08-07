/// <reference types="jest" />

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any;

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock WebGL
const mockWebGLContext = {
  canvas: document.createElement('canvas'),
  drawArrays: jest.fn(),
  drawElements: jest.fn(),
  createBuffer: jest.fn(() => ({})),
  bindBuffer: jest.fn(),
  bufferData: jest.fn(),
  createShader: jest.fn(() => ({})),
  shaderSource: jest.fn(),
  compileShader: jest.fn(),
  createProgram: jest.fn(() => ({})),
  attachShader: jest.fn(),
  linkProgram: jest.fn(),
  useProgram: jest.fn(),
  getAttribLocation: jest.fn(() => 0),
  getUniformLocation: jest.fn(() => ({})),
  enableVertexAttribArray: jest.fn(),
  vertexAttribPointer: jest.fn(),
  clearColor: jest.fn(),
  clear: jest.fn(),
  viewport: jest.fn(),
  createTexture: jest.fn(() => ({})),
  bindTexture: jest.fn(),
  texImage2D: jest.fn(),
  texParameteri: jest.fn(),
  activeTexture: jest.fn(),
  uniform1i: jest.fn(),
  uniformMatrix4fv: jest.fn(),
  uniform3fv: jest.fn(),
  uniform4fv: jest.fn(),
  uniform1f: jest.fn(),
  uniform2f: jest.fn(),
  uniform3f: jest.fn(),
  uniform4f: jest.fn(),
  enable: jest.fn(),
  disable: jest.fn(),
  blendFunc: jest.fn(),
  depthFunc: jest.fn(),
  cullFace: jest.fn(),
  frontFace: jest.fn(),
  polygonOffset: jest.fn(),
  lineWidth: jest.fn(),
  pointSize: jest.fn(),
  scissor: jest.fn(),
  stencilFunc: jest.fn(),
  stencilOp: jest.fn(),
  stencilMask: jest.fn(),
  colorMask: jest.fn(),
  depthMask: jest.fn(),
  clearStencil: jest.fn(),
  clearDepth: jest.fn(),
  pixelStorei: jest.fn(),
  readPixels: jest.fn(),
  finish: jest.fn(),
  flush: jest.fn(),
  getError: jest.fn(() => 0),
  getParameter: jest.fn(() => 0),
  getProgramParameter: jest.fn(() => 0),
  getShaderParameter: jest.fn(() => 0),
  getProgramInfoLog: jest.fn(() => ''),
  getShaderInfoLog: jest.fn(() => ''),
  deleteShader: jest.fn(),
  deleteProgram: jest.fn(),
  deleteBuffer: jest.fn(),
  deleteTexture: jest.fn(),
  isContextLost: jest.fn(() => false),
  isProgram: jest.fn(() => true),
  isShader: jest.fn(() => true),
  isBuffer: jest.fn(() => true),
  isTexture: jest.fn(() => true),
  isFramebuffer: jest.fn(() => true),
  isRenderbuffer: jest.fn(() => true),
  isEnabled: jest.fn(() => true),
  isExtensionSupported: jest.fn(() => true),
  getSupportedExtensions: jest.fn(() => []),
  getExtension: jest.fn(() => null),
  createFramebuffer: jest.fn(() => ({})),
  bindFramebuffer: jest.fn(),
  framebufferTexture2D: jest.fn(),
  framebufferRenderbuffer: jest.fn(),
  checkFramebufferStatus: jest.fn(() => 36053), // FRAMEBUFFER_COMPLETE
  deleteFramebuffer: jest.fn(),
  createRenderbuffer: jest.fn(() => ({})),
  bindRenderbuffer: jest.fn(),
  renderbufferStorage: jest.fn(),
  deleteRenderbuffer: jest.fn(),
  generateMipmap: jest.fn(),
  hint: jest.fn(),
  sampleCoverage: jest.fn(),
  compressedTexImage2D: jest.fn(),
  compressedTexSubImage2D: jest.fn(),
  copyTexImage2D: jest.fn(),
  copyTexSubImage2D: jest.fn(),
  getBufferParameter: jest.fn(() => 0),
  getFramebufferAttachmentParameter: jest.fn(() => 0),
  getRenderbufferParameter: jest.fn(() => 0),
  getTexParameter: jest.fn(() => 0),
  getVertexAttrib: jest.fn(() => 0),
  getVertexAttribOffset: jest.fn(() => 0),
  validateProgram: jest.fn(),
  vertexAttrib1f: jest.fn(),
  vertexAttrib1fv: jest.fn(),
  vertexAttrib2f: jest.fn(),
  vertexAttrib2fv: jest.fn(),
  vertexAttrib3f: jest.fn(),
  vertexAttrib3fv: jest.fn(),
  vertexAttrib4f: jest.fn(),
  vertexAttrib4fv: jest.fn(),
  vertexAttribDivisor: jest.fn(),
  drawArraysInstanced: jest.fn(),
  drawElementsInstanced: jest.fn(),
  drawRangeElements: jest.fn(),
  drawBuffers: jest.fn(),
  clearBufferiv: jest.fn(),
  clearBufferuiv: jest.fn(),
  clearBufferfv: jest.fn(),
  clearBufferfi: jest.fn(),
  getQueryParameter: jest.fn(() => 0),
  getQuery: jest.fn(() => ({})),
  createQuery: jest.fn(() => ({})),
  deleteQuery: jest.fn(),
  beginQuery: jest.fn(),
  endQuery: jest.fn(),
  getQueryObjectuiv: jest.fn(() => 0),
  getQueryObjectiv: jest.fn(() => 0),
  createVertexArray: jest.fn(() => ({})),
  deleteVertexArray: jest.fn(),
  bindVertexArray: jest.fn(),
  isVertexArray: jest.fn(() => true),
  drawArraysInstancedANGLE: jest.fn(),
  drawElementsInstancedANGLE: jest.fn(),
  vertexAttribDivisorANGLE: jest.fn(),
  getExtension: jest.fn(() => null),
  getSupportedExtensions: jest.fn(() => []),
  isExtensionSupported: jest.fn(() => true),
  getParameter: jest.fn(() => 0),
  getError: jest.fn(() => 0),
  isContextLost: jest.fn(() => false),
  canvas: document.createElement('canvas'),
  drawingBufferWidth: 1024,
  drawingBufferHeight: 768,
};

// Mock getContext
HTMLCanvasElement.prototype.getContext = jest.fn(() => mockWebGLContext);

// Mock Three.js WebGLRenderer
jest.mock('three', () => {
  const THREE = jest.requireActual('three');
  return {
    ...THREE,
    WebGLRenderer: jest.fn().mockImplementation(() => ({
      setSize: jest.fn(),
      render: jest.fn(),
      dispose: jest.fn(),
      domElement: document.createElement('canvas'),
    })),
  };
});

// Mock Socket.io
jest.mock('socket.io-client', () => ({
  io: jest.fn(() => ({
    on: jest.fn(),
    emit: jest.fn(),
    disconnect: jest.fn(),
    connect: jest.fn(),
  })),
}));

// Mock Mapbox GL
jest.mock('mapbox-gl', () => ({
  Map: jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    off: jest.fn(),
    addSource: jest.fn(),
    addLayer: jest.fn(),
    removeLayer: jest.fn(),
    removeSource: jest.fn(),
    setPaintProperty: jest.fn(),
    setLayoutProperty: jest.fn(),
    setFilter: jest.fn(),
    setCenter: jest.fn(),
    setZoom: jest.fn(),
    fitBounds: jest.fn(),
    resize: jest.fn(),
    remove: jest.fn(),
  })),
  NavigationControl: jest.fn(),
  GeolocateControl: jest.fn(),
  FullscreenControl: jest.fn(),
  ScaleControl: jest.fn(),
}));

// Mock D3
jest.mock('d3', () => ({
  select: jest.fn(() => ({
    append: jest.fn(() => ({
      attr: jest.fn(() => ({
        style: jest.fn(() => ({
          text: jest.fn(() => ({
            on: jest.fn(() => ({
              call: jest.fn(),
            })),
          })),
        })),
      })),
    })),
    selectAll: jest.fn(() => ({
      data: jest.fn(() => ({
        enter: jest.fn(() => ({
          append: jest.fn(() => ({
            attr: jest.fn(() => ({
              style: jest.fn(() => ({
                text: jest.fn(() => ({
                  on: jest.fn(() => ({
                    call: jest.fn(),
                  })),
                })),
              })),
            })),
          })),
        })),
        exit: jest.fn(() => ({
          remove: jest.fn(),
        })),
        merge: jest.fn(() => ({
          attr: jest.fn(() => ({
            style: jest.fn(() => ({
              text: jest.fn(() => ({
                on: jest.fn(() => ({
                  call: jest.fn(),
                })),
              })),
            })),
          })),
        })),
      })),
    })),
  })),
  scaleLinear: jest.fn(() => ({
    domain: jest.fn(() => ({
      range: jest.fn(() => ({
        interpolate: jest.fn(),
      })),
    })),
  })),
  scaleOrdinal: jest.fn(() => ({
    domain: jest.fn(() => ({
      range: jest.fn(),
    })),
  })),
  axisBottom: jest.fn(() => ({
    scale: jest.fn(() => ({
      tickFormat: jest.fn(),
    })),
  })),
  axisLeft: jest.fn(() => ({
    scale: jest.fn(() => ({
      tickFormat: jest.fn(),
    })),
  })),
  line: jest.fn(() => ({
    x: jest.fn(() => ({
      y: jest.fn(() => ({
        curve: jest.fn(),
      })),
    })),
  })),
  area: jest.fn(() => ({
    x: jest.fn(() => ({
      y0: jest.fn(() => ({
        y1: jest.fn(() => ({
          curve: jest.fn(),
        })),
      })),
    })),
  })),
  arc: jest.fn(() => ({
    innerRadius: jest.fn(() => ({
      outerRadius: jest.fn(() => ({
        startAngle: jest.fn(() => ({
          endAngle: jest.fn(),
        })),
      })),
    })),
  })),
  pie: jest.fn(() => ({
    value: jest.fn(),
  })),
  format: jest.fn(() => jest.fn()),
}));

// Suppress console warnings in tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
}); 