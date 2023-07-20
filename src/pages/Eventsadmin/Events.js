import React, {useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Radio, Table } from "antd";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup ,useMapEvents } from "react-leaflet";
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
  TextField,
  TextareaAutosize,
} from "@mui/material";
import BACKEND_URL from "../../EndPoint";
import "./Events.css";
import { TimePicker } from "@mui/lab";
import { Padding } from "@mui/icons-material";
import AddMarkerToClick from "./AddMarkerToClick";


function Events(props) {
  const [Events, setEvents] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const navigate = useNavigate();

  
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/user/allevents`)
      .then((response) => setEvents(response.data))
      .catch((error) => console.log(error));
  }, []);
 
  const deleteTour = () => {
    if (eventToDelete) {
      axios
        .delete(`${BACKEND_URL}/user/deleltevent/${eventToDelete.id}`)
        .then(() => {
          setEvents(Events.filter((t) => t.id !== eventToDelete.id));
          setShowDeleteDialog(false);
        })
        .catch((error) => console.log(error));
    }
  };

 
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => <Link to={`/events/${record.id}`}>{text}</Link>,
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
              setEventToDelete(record);
              setShowDeleteDialog(true);
            }}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];
  if (!Events) {
    return <Box>Loading...</Box>;
  }
  return (
    <Box className="tours-container">
      <div className="tours-header">
        <h1>Events</h1>
        <button
          className="tours-add-btn"
          onClick={() => navigate("/events/new")}
        >
          Add Event
        </button>
      </div>
      <Table
        className="tours-table"
        dataSource={Events}
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


 
export { Events  };
