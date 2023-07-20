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
  IconButton,
  TextField,
  TextareaAutosize,
} from "@mui/material";

import WrongLocationIcon from '@mui/icons-material/WrongLocation';
import { BACKEND_URL, Imagefitch_URL } from "../../EndPoint";
import { fetchData } from "../../axios_URL";
import "./Tour.css";
import { TimePicker } from "@mui/lab";
import { Padding } from "@mui/icons-material";
import AddMarkerToClick from "./AddMarkerToClick";

function Tour() {
  const [locations, setLocations] = useState([]);
  const [tour, setTour] = useState(null);
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
   
    fetchData("GET",`/user/tours/${id}`)
      .then((response) => setTour(response.data))
      .catch((error) => console.log(error));
      fetchData("GET",`/user/imagessoftour/${id}`)
      .then((response) => setImages(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
    fetchData("GET",`/user/locationsoftour/${id}`)
      .then((response) => setLocations(response.data))
      .catch((error) => console.log(error));
  }, [id]);
  // Delete the tour

  const addLocation = (locationData) => {
    fetchData("post",`/user/addlocationsoftour/${id}`, locationData)
      .then((response) => setLocations([...locations, response.data]))
      .catch((error) => console.log(error));
  };
  const deleteLocation = (locationId) => {
    fetchData("delete",`/user/deleltlocationsoftour/${deleteDialogData.id}`,
        {
          data: { id: locationId },
        }
      )
      .then(() =>
        setLocations(locations.filter((location) => location.id !== locationId))
      )
      .catch((error) => console.log(error));
  };
  const deleteTour = () => {
    if (tour) {
      fetchData("delete",`/user/delelttour/${tour.id}`)
        .then(() => navigate("/tours"))
        .catch((error) => console.log(error));
    }
  };

  // Update the tour
  const updateTour = (tourData) => {
    {
      console.log(tourData);
    }
    if (tour) {
      fetchData("put",`/user/edittour/${tour.id}`, tourData)
        .then((response) => setTour(response.data))
        .catch((error) => console.log(error));
    }
  };

  // Render the tour data
  if (!tour) {
    return <Box>Loading...</Box>;
  }

  return (
    <>
      <h1>{tour.name}</h1>
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
                      value={tour.name}
                      onChange={(e) =>
                        setTour({ ...tour, name: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      label="Place"
                      value={tour.place}
                      onChange={(e) =>
                        setTour({ ...tour, place: e.target.value })
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
                      value={tour.starttime}
                      onChange={(e) =>
                        setTour({ ...tour, starttime: e.target.value })
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
                      value={tour.endtime}
                      onChange={(e) =>
                        setTour({ ...tour, endtime: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      type="number"
                      label="Price"
                      value={tour.price}
                      onChange={(e) =>
                        setTour({ ...tour, price: e.target.value })
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
                      value={tour.maximumbooking}
                      onChange={(e) =>
                        setTour({ ...tour, maximumbooking: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      type="number"
                      label="Phone Number"
                      value={tour.phonenumber}
                      onChange={(e) =>
                        setTour({ ...tour, phonenumber: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      type="number"
                      label="Phone Number 2"
                      value={tour.phonenumber2}
                      onChange={(e) =>
                        setTour({ ...tour, phonenumber2: e.target.value })
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
                      value={tour.description}
                      onChange={(e) =>
                        setTour({ ...tour, description: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      label="Owner Name"
                      value={tour.ownername}
                      onChange={(e) =>
                        setTour({ ...tour, ownername: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      label="Trip Distance"
                      value={tour.tripdistance}
                      onChange={(e) =>
                        setTour({ ...tour, tripdistance: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      label="Last Date to Book"
                      value={tour.lastdatetobook}
                      onChange={(e) =>
                        setTour({ ...tour, lastdatetobook: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>
                <div className="savebutton">
               
               
                    <Button
                      variant="contained"
                      onClick={() => updateTour(tour)}
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
                        center={[
                          locations.find((loc) => loc.latitude && loc.longitude)
                            ?.latitude || 0,
                          locations.find((loc) => loc.latitude && loc.longitude)
                            ?.longitude || 0,
                        ]}
                        zoom={13}
                        style={{ height: "400px" }}
                      >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                        <AddMarkerToClick onMarkerAdd={handleMarkerAddition} />
                        {locations.map((location) => (
                          <Marker
                            key={location.id}
                            position={[location.latitude, location.longitude]}
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
                            <Popup>{location.name}</Popup>
                          </Marker>
                        ))}
                      </MapContainer>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          addLocation({
                            longitude: e.target.longitude.value,
                            latitude: e.target.latitude.value,
                            name: e.target.name.value,
                          });
                          e.target.reset();
                        }}
                      >
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
                                onChange={(e) => setLongitude(e.target.value)}
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
                                onChange={(e) => setLatitude(e.target.value)}
                              />
                            </FormControl>
                          </Grid>
                          <div className="p-3">
                            <Grid item xs={12}>
                              <FormControl sx={{ width: "100%" }}>
                                <TextField
                                  style={{ marginLeft: 20 }}
                                  required
                                  label="Name"
                                  name="name"
                                />
                              </FormControl>
                            </Grid>
                            <Grid className="p-5" item xs={12}>
                              <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                              >
                                Add Location
                              </Button>
                            </Grid>
                          </div>
                        </Grid>
                      </form>
                    </Grid>
                    {locations.map((location) => (
                      <Box key={location.id} mt={2}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Box display="flex" alignItems="center">
                              <Box mr={2}>
                                <IconButton
                                  variant="contained"
                                  color="error"
                                  onClick={() =>
                                    setDeleteDialogData({
                                      id: location.id,
                                      name: location.name,
                                    })
                                  }
                                >
                                  
                                <  WrongLocationIcon/>
                                </IconButton>
                              </Box>
                              <Box>
                                <Typography variant="h6">
                                  {location.name}
                                </Typography>
                                <Typography>{`Longitude: ${location.longitude} Latitude: ${location.latitude}`}</Typography>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    ))}
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
                <Button
                  onClick={() => {
                    deleteLocation(deleteDialogData.id);
                    setDeleteDialogData(null);
                  }}
                  color="error"
                >
                  Delete
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

export { Tour };
