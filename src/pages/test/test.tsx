import React, { useRef, useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';

const ImageUploadAndDetect = () => {
  const [image, setImage] = useState(null);
  const [detections, setDetections] = useState([]);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const image = URL.createObjectURL(file);
    setImage(image);

    const img = await faceapi.bufferToImage(file);
    imageRef.current = img;

    const canvas = canvasRef.current;
    faceapi.matchDimensions(canvas, { width: img.width, height: img.height });

    const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions());
    setDetections(detections);

    const resizedDetections = faceapi.resizeResults(detections, { width: img.width, height: img.height });
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
  };

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    };
    loadModels();
  }, []);

  return (
    <div>
      <h1>Upload an Image to Detect Faces</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && (
        <div>
          <img src={image} alt="Uploaded" ref={imageRef} style={{ display: 'none' }} />
          <canvas ref={canvasRef} width={imageRef.current?.width} height={imageRef.current?.height} />
          <div>
            {detections.map((detection, index) => (
              <div key={index}>
                <h3>Face {index + 1}</h3>
                <p>Detection: {JSON.stringify(detection)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadAndDetect;