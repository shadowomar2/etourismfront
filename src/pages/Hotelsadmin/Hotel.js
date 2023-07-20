import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Radio, Table } from "antd";
import Select from "react-select";
import { useParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ImageGallery from "./Editimageshotel";
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
  IconButton,
  TextField,
  TextareaAutosize,
} from "@mui/material";

import WrongLocationIcon from '@mui/icons-material/WrongLocation';
import BACKEND_URL from "../../EndPoint";
import "./Hotel.css";
import { TimePicker } from "@mui/lab";
import { Padding } from "@mui/icons-material";
import AddMarkerToClick from "./AddMarkerToClick";

function Hotel() {
  //const [locations, setLocations] = useState([]);
  const [hotel, setHotel] = useState(null);
  const [images, setImages] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteDialogData, setDeleteDialogData] = useState(null);
  const navigate = useNavigate();
  const id = useParams().id;
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  function handleMarkerAddition(marker) {
    setLatitude(marker.lat);
    setLongitude(marker.lng);
    document.getElementsByName("latitude")[0].value = latitude;
    document.getElementsByName("longitude")[0].value = longitude;
  }

  // Fetch the tour data on component mount
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/test/hotels/${id}`)
      .then((response) => setHotel(response.data))
      .catch((error) => console.log(error));
    axios
      .get(`${BACKEND_URL}/test/hotels/images/${id}`)
      .then((response) => setImages(response.data))
      .catch((error) => console.log(error));
  }, [id]);

 
  const deleteTour = () => {
    if (hotel) {
      axios
        .delete(`${BACKEND_URL}/test/hotels/${hotel.id}`)
        .then(() => navigate("/allevents"))
        .catch((error) => console.log(error));
    }
  };

 
  const updateTour = (eventData) => {
    eventData.latitude = latitude;
    eventData.longitude = longitude;
    {
      console.log(eventData);
    }
    
    if (hotel) {
      axios
        .put(`${BACKEND_URL}/test/hotels/${hotel.id}`, eventData)
        .then((response) => setHotel(response.data))
        .catch((error) => console.log(error));
    }
  };

  // Render the tour data
  if (!hotel) {
    return <Box>Loading...</Box>;
  }

  return (
    <>
      <h2>{hotel.name}</h2>
      <div className="continarbox">
        <div className="continarboxinner">
          <Box>
            <Button onClick={() => setShowDeleteDialog(true)}>Delete</Button>

            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      label="Name"
                      value={hotel.name}
                      onChange={(e) =>
                        setHotel({ ...hotel, name: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      label="Place"
                      value={hotel.place}
                      onChange={(e) =>
                        setHotel({ ...hotel, place: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ width: "100%" }}>
                    <label htmlFor="dateOfBirth">Start Time:</label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={hotel.starttime}
                      onChange={(e) =>
                        setHotel({ ...hotel, starttime: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ width: "100%" }}>
                    <label htmlFor="dateOfBirth">End Time:</label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={hotel.endtime}
                      onChange={(e) =>
                        setHotel({ ...hotel, endtime: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>
            
         
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      type="number"
                      label="Phone Number"
                      value={hotel.phonenumber}
                      onChange={(e) =>
                        setHotel({ ...hotel, phonenumber: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      type="number"
                      label="Phone Number 2"
                      value={hotel.phonenumber2}
                      onChange={(e) =>
                        setHotel({ ...hotel, phonenumber2: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextareaAutosize
                      aria-label="minimum height"
                      minRows={3}
                      placeholder="Description"
                      value={hotel.description}
                      onChange={(e) =>
                        setHotel({ ...hotel, description: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      label="Owner Name"
                      value={hotel.ownername}
                      onChange={(e) =>
                        setHotel({ ...hotel, ownername: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>
       
                 
                <div className="savebutton">
               
               
                    <Button
                      variant="contained"
                      onClick={() => updateTour(hotel)}
                    >
                      Save
                    </Button>
               
                 
                  </div>
              </Grid>
            </Box>

            <div>
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <ImageGallery identity={id} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Grid item xs={12}>
                      <MapContainer
                        scrollWheelZoom={false}
                        center={hotel?.latitude && hotel?.longitude ? [hotel.latitude, hotel.longitude] : [0, 0]}
                        zoom={13}
                        style={{ height: "400px" }}
                      >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                        <AddMarkerToClick onMarkerAdd={handleMarkerAddition} />
                  
                          <Marker
                          
                            position={hotel?.latitude && hotel?.longitude ? [hotel.latitude, hotel.longitude] : [0, 0]}
                            icon={L.icon({
                              iconUrl:
                                "https://cdn.mapmarker.io/api/v1/pin?size=50&background=%23F44336&color=%23FFFFFF&voffset=0&hoffset=1&icon=fa-map-marker",
                              iconRetinaUrl:
                                "https://cdn.mapmarker.io/api/v1/pin?size=50&background=%23F44336&color=%23FFFFFF&voffset=0&hoffset=1&icon=fa-map-marker",
                              iconSize: [50, 50],
                              iconAnchor: [25, 50],
                              popupAnchor: [0, -50],
                            })}
                          >
                            <Popup>{hotel.name}</Popup>
                          </Marker>
                        
                      </MapContainer>
                   
                        <Grid className="pt-3" container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <FormControl sx={{ width: "100%" }}>
                              <TextField
                                style={{ marginLeft: 20 }}
                                required
                                type="number"
                                label="Longitude"
                                name="longitude"
                                InputProps={{
                                  inputProps: {
                                    min: -90,
                                    max: 90,
                                    step: 0.0001,
                                  },
                                }}
                                onChange={(e) =>
                                  setHotel({ ...hotel, longitude: e.target.value })
                                }
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControl sx={{ width: "100%" }}>
                              <TextField
                                style={{ marginLeft: 20 }}
                                required
                                label="Latitude"
                                name="latitude"
                                type="number"
                                InputProps={{
                                  inputProps: {
                                    min: -90,
                                    max: 90,
                                    step: 0.0001,
                                  },
                              }}
                              onChange={(e) =>
                                setHotel({ ...hotel, latitude: e.target.value })
                              }
                       
                              />
                            </FormControl>
                          </Grid>
         
                        </Grid>
                     
                    </Grid>
       
                  </Grid>
                </Grid>
              </Box>
            </div>
            {/* Delete dialog */}
            <Dialog
              open={Boolean(deleteDialogData)}
              onClose={() => setDeleteDialogData(null)}
            >
              <DialogTitle>{`Delete ${deleteDialogData?.name}`}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this location?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDeleteDialogData(null)}>
                  Cancel
                </Button>
      
              </DialogActions>
            </Dialog>
            {/* Delete dialog */}
            <Dialog
              open={showDeleteDialog}
              onClose={() => setShowDeleteDialog(false)}
            >
              <DialogTitle>Delete Tour</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this tour?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowDeleteDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => deleteTour()} color="error">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </div>
      </div>
    </>
  );
}

export { Hotel   };
