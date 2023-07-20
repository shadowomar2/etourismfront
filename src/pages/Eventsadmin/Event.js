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
import ImageGallery from "./Editimagesevent";
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
import "./Event.css";
import { TimePicker } from "@mui/lab";
import { Padding } from "@mui/icons-material";
import AddMarkerToClick from "./AddMarkerToClick";

function Event() {
  //const [locations, setLocations] = useState([]);
  const [event, setEvent] = useState(null);
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
      .get(`${BACKEND_URL}/user/events/${id}`)
      .then((response) => setEvent(response.data))
      .catch((error) => console.log(error));
    axios
      .get(`${BACKEND_URL}/user/imagessofevent/${id}`)
      .then((response) => setImages(response.data))
      .catch((error) => console.log(error));
  }, [id]);

 
  const deleteTour = () => {
    if (event) {
      axios
        .delete(`${BACKEND_URL}/user/deleltevent/${event.id}`)
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
    
    if (event) {
      axios
        .put(`${BACKEND_URL}/user/editevent/${event.id}`, eventData)
        .then((response) => setEvent(response.data))
        .catch((error) => console.log(error));
    }
  };

  // Render the tour data
  if (!event) {
    return <Box>Loading...</Box>;
  }

  return (
    <>
      <h2>{event.name}</h2>
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
                      value={event.name}
                      onChange={(e) =>
                        setEvent({ ...event, name: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      label="Place"
                      value={event.place}
                      onChange={(e) =>
                        setEvent({ ...event, place: e.target.value })
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
                      value={event.starttime}
                      onChange={(e) =>
                        setEvent({ ...event, starttime: e.target.value })
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
                      value={event.endtime}
                      onChange={(e) =>
                        setEvent({ ...event, endtime: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      type="number"
                      label="Price"
                      value={event.price}
                      onChange={(e) =>
                        setEvent({ ...event, price: e.target.value })
                      }
                      maxLength={10}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      type="number"
                      label="Maximum Booking"
                      value={event.maximumbooking}
                      onChange={(e) =>
                        setEvent({ ...event, maximumbooking: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      type="number"
                      label="Phone Number"
                      value={event.phonenumber}
                      onChange={(e) =>
                        setEvent({ ...event, phonenumber: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      type="number"
                      label="Phone Number 2"
                      value={event.phonenumber2}
                      onChange={(e) =>
                        setEvent({ ...event, phonenumber2: e.target.value })
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
                      value={event.description}
                      onChange={(e) =>
                        setEvent({ ...event, description: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      label="Owner Name"
                      value={event.ownername}
                      onChange={(e) =>
                        setEvent({ ...event, ownername: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>
       
                <Grid item xs={12}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      label="Last Date to Book"
                      value={event.lastdatetobook}
                      onChange={(e) =>
                        setEvent({ ...event, lastdatetobook: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>
                <div className="savebutton">
               
               
                    <Button
                      variant="contained"
                      onClick={() => updateTour(event)}
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
                        center={event?.latitude && event?.longitude ? [event.latitude, event.longitude] : [0, 0]}
                        zoom={13}
                        style={{ height: "400px" }}
                      >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                        <AddMarkerToClick onMarkerAdd={handleMarkerAddition} />
                  
                          <Marker
                          
                            position={event?.latitude && event?.longitude ? [event.latitude, event.longitude] : [0, 0]}
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
                            <Popup>{event.name}</Popup>
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
                                  setEvent({ ...event, longitude: e.target.value })
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
                                setEvent({ ...event, latitude: e.target.value })
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

export { Event  };
