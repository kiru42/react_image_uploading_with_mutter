const express = require('express')
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 3001

app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Configuration de Multer pour le stockage des images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/') // Dossier où les images seront stockées
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname) // Nom de fichier unique
  },
})
const upload = multer({ storage })

// Gestionnaire de route pour le téléchargement d'images
app.post('/upload', upload.single('image'), (req, res) => {
  res.json({ message: 'Image uploaded successfully' })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

app.get('/images', (req, res) => {
  const uploadsDir = path.join(__dirname, 'uploads') // Path to uploads directory

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error('Error reading uploads directory:', err)
      return res.status(500).json({ error: 'Unable to read images directory' })
    }

    const imagesList = files.map((file) => ({
      url: `http://localhost:3001/uploads/${file}`,
    }))

    res.json(imagesList)
  })
})
