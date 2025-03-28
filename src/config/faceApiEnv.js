import faceapi, { env } from 'face-api.js';

const createFileSystem = () => {
  throw new Error('fs is not available in the browser');
};

env.createFileSystem = createFileSystem;

export default faceapi;
