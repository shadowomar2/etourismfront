import React, { useState, useEffect } from "react";
import {
  Card, Input,
  IconButton,
  CardContent,
  CardMedia,
 
  Button,
  TextField,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import {BACKEND_URL,Imagefitch_URL} from "../../EndPoint";
import { v4 as uuidv4 } from "uuid";
import "./editimages.css";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';


export default function ImageGallery({ identity }) {
  const [images, setImages] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  console.log(identity);
  useEffect(() => {
    async function fetchImages() {
      const response = await axios.get(
        `${BACKEND_URL}/test/hotels/images/${identity}`
      );
      setImages(response.data);
    }
    fetchImages();
  }, []);

  async function handleDeleteImage(id) {
    await axios.delete(`${BACKEND_URL}/test/hotels/images/${id}`);
    setImages(images.filter((image) => image.id !== id));
  }

  async function handleAddImage(event) {
    event.preventDefault();
    const fileInput = document.getElementById("image-upload");
    const file = fileInput.files[0];
    if (!file) {
      return;
    }
    const uniqueId = uuidv4();

    const formData = new FormData();
    formData.append("file", file);

    await axios({
      method: "post",
      url: `${BACKEND_URL}/test/admin/upload/${uniqueId}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    const fileExtension = file.name.split(".").pop();
    const newFileName = `${uniqueId}.${fileExtension}`;
    setNewImageUrl(newFileName);
    const response = await axios.post(
      `${BACKEND_URL}/test/hotels/addimage/${identity}`,
      {
        imageURL: newFileName,
      }
    );
    const imageURL = response.data;
    const newImage = { id: Date.now(), imageURL };

    setImages([...images, newImage]);
  }
 

  return (
    <div>
      <form onSubmit={handleAddImage}>
        
        <input className="inputimage" variant="contained" color="primary" id="image-upload" type="file" accept="image/*" />
        <IconButton variant="contained" color="primary" type="submit"><AddAPhotoIcon/></IconButton>
      </form>
      {images.map((image) => (
        <div className="carddiv" key={image.id}>
        <Card >
          <CardMedia
            component="img"
            height="400"
            width="400"
            image={BACKEND_URL +Imagefitch_URL+ image?.imageURL}
            title="Tour Image"
          />
          <CardContent>
        
              <IconButton aria-label="delete"   color="error" onClick={() => handleDeleteImage(image.id)}> <DeleteIcon /></IconButton>
          </CardContent>
          </Card>
          </div>
      ))}
    </div>
  );
}
