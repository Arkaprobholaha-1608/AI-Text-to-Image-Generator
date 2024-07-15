import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/generate', { description });
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error("Error generating image", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'generated_image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="App">
      <h1>AI Image Generator</h1>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter Image Description"
      />
      <button onClick={generateImage}>Generate</button>

      {loading && <p>Generating the Image...</p>}

      {imageUrl && (
        <div>
          <img src={imageUrl} alt={description} />
          <p>{description}</p>
          <button onClick={downloadImage}>Download Image</button>
          <button onClick={generateImage}>Regenerate</button>
          <button onClick={() => { setImageUrl(''); setDescription(''); }}>Create New Image</button>
        </div>
      )}
    </div>
  );
}

export default App;
