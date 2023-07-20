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
import BACKEND_URL from "../../EndPoint";
import { fetchData } from "../../axios_URL";
import "./Tours.css";
import { TimePicker } from "@mui/lab";
import { Padding } from "@mui/icons-material";
import AddMarkerToClick from "./AddMarkerToClick";


function Tours(props) {
  const [tours, setTours] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [tourToDelete, setTourToDelete] = useState(null);

  const navigate = useNavigate();

  // Fetch all tours on component mount
  useEffect(() => {
  
    fetchData("GET",`/user/alltours`)
      .then((response) => setTours(response.data))
      .catch((error) => console.log(error));
  }, []);

  // Delete a tour
  const deleteTour = () => {
    if (tourToDelete) {
      fetchData("delete",`/user/delelttour/${tourToDelete.id}`)
        .then(() => {
          setTours(tours.filter((t) => t.id !== tourToDelete.id));
          setShowDeleteDialog(false);
        })
        .catch((error) => console.log(error));
    }
  };

  // Add a new tour
  const addTour = (tourData) => {
    fetchData("post",`/user/addtours`, tourData)
      .then((response) => {
        setTours([...tours, response.data]);
        navigate(`/tours/${response.data.id}`);
      })
      .catch((error) => console.log(error));
  };

  // Update an existing tour
  const updateTour = (id, tourData) => {
    fetchData("put",`/user/edittour/${id}`, tourData)
      .then((response) => {
        setTours(tours.map((t) => (t.id === id ? response.data : t)));
        navigate(`/tours/${id}`);
      })
      .catch((error) => console.log(error));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => <Link to={`/tours/${record.id}`}>{text}</Link>,
    },
    {
      title: "Place",
      dataIndex: "place",
      key: "place",
    },
    {
      title: "Start Time",
      dataIndex: "starttime",
      key: "starttime",
    },
    {
      title: "End Time",
      dataIndex: "endtime",
      key: "endtime",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Button
            className="btn btn-danger"
            onClick={() => {
              setTourToDelete(record);
              setShowDeleteDialog(true);
            }}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];
  if (!tours) {
    return <Box>Loading...</Box>;
  }
  return (
    <Box className="tours-container">
      <div className="tours-header">
        <h1>Tours</h1>
        <button
          className="tours-add-btn"
          onClick={() => navigate("/tours/new")}
        >
          Add Tour
        </button>
      </div>
      <Table
        className="tours-table"
        dataSource={tours}
        columns={columns}
        rowKey="id"
      />
      {/* Delete dialog */}
      <Dialog
        className="tours-dialog"
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      >
        <DialogTitle className="tours-dialog-title">Delete Tour</DialogTitle>
        <DialogContent>
          <DialogContentText className="tours-dialog-text">
            Are you sure you want to delete this tour?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className="tours-delete-btn"
            onClick={() => setShowDeleteDialog(false)}
          >
            Cancel
          </Button>
          <Button
            className="tours-delete-btn"
            onClick={() => deleteTour()}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}


 
export { Tours  };
