import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Card.css";
import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const Card = () => {
  // State to hold the list of users
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Delete user by ID
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      // Remove the deleted user from the local state
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Redirect to update page with user ID
  const handleUpdate = (userId) => {
    navigate(`/update/${userId}`);
  };

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        width: "100vw",
      }}
    >
      <table>
        <thead>
          <tr style={{ alignItems: "center" }}>
            <th style={{color:"#283747"}}>
              Name <PersonIcon />
            </th>
            <th style={{color:"#616a6b"}}>
              Email <EmailIcon />
            </th>
            <th style={{color:"#1f618d"}}>
              Dob <CalendarMonthIcon />
            </th>
            <th style={{color:"#6c3483"}}>
              Edit <EditIcon />
            </th>
            <th style={{color:"#922b21"}}>
              Delete <DeleteIcon />
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.dob}</td>
              <td>
                <Button
                  variant="outlined"
                  onClick={() => handleUpdate(user._id)}
                >
                  <small style={{color:"#6c3483"}}>
                    <EditIcon />
                  </small>
                </Button>
              </td>
              <td>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDelete(user._id)}
                >
                  <small style={{color:"#922b21"}}>
                    <DeleteIcon />
                  </small>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Card;
