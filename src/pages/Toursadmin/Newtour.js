
import React, {useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Radio, Table } from "antd";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup ,useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ImageGallery from "./Editimages";
import {
  Box,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Typography,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { fetchData } from "../../axios_URL";
import "./Tours.css";
import { TimePicker } from "@mui/lab";
import { Padding } from "@mui/icons-material";
import AddMarkerToClick from "./AddMarkerToClick";





function NewTour(props) {
    const [name, setName] = useState("");
    const [place, setPlace] = useState("");
    const [starttime, setStartTime] = useState("");
    const [endtime, setEndTime] = useState("");
    const [price, setPrice] = useState("");
    const [maximumbooking, setMaximumBooking] = useState("");
    const [description, setDescription] = useState("");
    const [locations, setLocations] = useState([]);
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
  
    // Add a new location
    const addLocation = () => {
      setLocations([...locations, { longitude: "", latitude: "", name: "" }]);
    };
  
    // Remove a location
    const removeLocation = (index) => {
      setLocations(locations.filter((l, i) => i !== index));
    };
  
    // Update a location
    const updateLocation = (index, field, value) => {
      const newLocations = [...locations];
      newLocations[index][field] = value;
      setLocations(newLocations);
    };
  
    // Add a new image
    const addImage = () => {
      setImages([...images, { imageData: "", imageurl: "" }]);
    };
  
    // Remove an image
    const removeImage = (index) => {
      setImages(images.filter((i, idx) => idx !== index));
    };
  
    // Update an image
    const updateImage = (index, field, value) => {
      const newImages = [...images];
      newImages[index][field] = value;
      setImages(newImages);
    };
  
    // Save the new tour
    const saveTour = () => {
      const tourData = {
        name,
        place,
        starttime,
        endtime,
        price,
        maximumbooking,
        description,
        locations,
        images,
      };
  
      fetchData("post",`/user/addtours`, tourData)
        .then((response) => navigate(`/tours/${response.data.id}`))
        .catch((error) => console.log(error));
    };
  
    return (
      <Box>
        <h1>New Tour</h1>
  
        <FormControl>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Start Time"
            value={starttime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="End Time"
            value={endtime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Maximum Booking"
            value={maximumbooking}
            onChange={(e) => setMaximumBooking(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
  
    
        <Button onClick={() => saveTour()}>Save</Button>
      </Box>
    );
}
export { NewTour  };