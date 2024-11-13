 '@mui/material'
import React from 'react'
import Card from './Card'
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Users = () => {
  return (

        <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <Link to="/">
          <Button variant="outlined"> Go to Registration Form </Button>
        </Link>
      </div>

      <div >
        <Card />
      </div>
    </div>

  )
}

export default Users