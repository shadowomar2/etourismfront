import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
    DialogActions,
    DialogContentText,
  TextField,
} from "@material-ui/core";

import BACKEND_URL from "../../EndPoint";
import { fetchData } from "../../axios_URL";

function UserBookingPage() {
  const [users, setUsers] = useState([]);
  const [bookingstour, setBookingstour] = useState([]);
  const [bookingsevent, setBookingsevent] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [open, setOpen] = useState(false);
  const [openextra, setOpenextra] = useState(false);
  const [extraid, setExtraid] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Fetch all users
    fetchData("GET","/admin/settings/allusers" )
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleOpen = (userId) => {
    // Fetch bookings for selected user
    fetchData("GET",`/admin/settings/booking/${userId}`)
      .then((response) => {
        setBookingstour(response.data.bookings_tour);
        setBookingsevent(response.data.bookings_event);
        setSelectedBooking(null);
        setOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClose = () => {
    setOpen(false);
    };
 
    const handleOpenextra = (userId) => {
      fetchData("GET",`/admin/settings/user/${userId}`)
        .then((response) => {
          setExtraid(response.data);
            setOpenextra(true);
        })
        .catch((error) => {
          console.log(error);
        });
  

  };

  const handleCloseextra = () => {
    setOpenextra(false);
    setExtraid("");
  };

  const handleAccept = (bookingId) => {
    // Accept the selected booking
    fetchData("PUT",`/admin/settings/accepttour/${bookingId}`)
      .then((response) => {
        // Refresh the bookings list
       fetchData("GET",`/admin/settings/booking/${selectedBooking.user_id}`
          )
          .then((response) => {
            setBookingstour(response.data.bookings_tour);
            setBookingsevent(response.data.bookings_event);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (userId) => {
    // Delete the selected user
    fetchData("delete",`/admin/settings/user/${userId}`)
      .then((response) => {
        // Refresh the users list
       fetchData("GET",`/admin/settings/allusers`)
          .then((response) => {
            setUsers(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
    const handleOpenDeleteDialog = (user) => {
        setSelectedUser(user);
      setOpenDeleteDialog(true);
      
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedUser(0);
  };
    
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.id.toString().includes(searchQuery) ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Users</h1>
      <TextField
        label="Search"
        variant="outlined"
        margin="normal"
        value={searchQuery}
        onChange={handleSearch}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(user.id)}>
                    View Bookings
                  </Button>
                  <Button onClick={() => handleOpenDeleteDialog(user)}>
                    Delete User
                  </Button>
                  <Button onClick={() => handleOpenextra(user.id)}>
                    Extra Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Bookings</DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>User ID</TableCell>
                  <TableCell>Tour ID</TableCell>
                  <TableCell>Event ID</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookingstour.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.id}</TableCell>
                    <TableCell>{booking.user_id}</TableCell>
                    <TableCell>{booking.tour_id}</TableCell>
                    <TableCell>{booking.event_id}</TableCell>
                    <TableCell>{booking.state}</TableCell>
                    <TableCell>
                      {booking.state !== "accept" && (
                        <Button onClick={() => handleAccept(booking.id)}>
                          Accept
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                     {bookingsevent.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.id}</TableCell>
                    <TableCell>{booking.user_id}</TableCell>
                    <TableCell>{booking.tour_id}</TableCell>
                    <TableCell>{booking.event_id}</TableCell>
                    <TableCell>{booking.state}</TableCell>
                    <TableCell>
                      {booking.state !== "accept" && (
                        <Button onClick={() => handleAccept(booking.id)}>
                          Accept
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openextra} onClose={handleCloseextra}>
        <DialogTitle>Details</DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Date of Birth</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Profile Picture</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
              <TableRow key={extraid.id}>
                  <TableCell>{extraid.id}</TableCell>
                  <TableCell>{extraid.name}</TableCell>
                  <TableCell>{extraid.username}</TableCell>
                  <TableCell>{extraid.email}</TableCell>
                  <TableCell>{extraid.address}</TableCell>
                  <TableCell>{extraid.phonenumber}</TableCell>
                  <TableCell>{extraid.gender}</TableCell>
                  <TableCell>{extraid.dateOfBirth}</TableCell>
                  <TableCell>{extraid.city}</TableCell>
                  <TableCell>{extraid.profile_pictureURL}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseextra}>Close</Button>
        </DialogActions>
          </Dialog>
          


          <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
  <DialogTitle>Confirm Deletion</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Are you sure you want to delete {selectedUser && selectedUser.name}?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
    <Button
      onClick={() => {
        handleDelete(selectedUser.id);
        handleCloseDeleteDialog();
      }}
      color="secondary"
    >
      Delete
    </Button>
  </DialogActions>
          </Dialog>
          
          
    </div>
  );
}

export default UserBookingPage;
