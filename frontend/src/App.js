import React, { useEffect, useState } from 'react'
import './App.css'
import ImageDisplay from './components/ImageDisplay'

function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadedImages, setUploadedImages] = useState([])

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleUpload = () => {
    const formData = new FormData()
    formData.append('image', selectedFile)

    fetch('http://localhost:3001/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message)
        // Mettre à jour la liste des images téléchargées
        setUploadedImages([
          ...uploadedImages,
          { url: `http://localhost:3001/uploads/${selectedFile.name}` },
        ])
      })
      .catch((error) => {
        console.error('Error uploading image:', error)
      })
  }

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    fetch('http://localhost:3001/images', { signal })
      .then((response) => response.json())
      .then((data) => {
        setUploadedImages(data)
      })
      .catch((error) => {
        console.error('Error fetching image list:', error)
      })
    return () => abortController.abort()
  }, [])

  return (
    <div className="App">
      <h1>Image Uploader</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {/* Afficher les images téléchargées */}
      <ImageDisplay images={uploadedImages} />
    </div>
  )
}

export default App
