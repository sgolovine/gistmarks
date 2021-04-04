import React, { useState } from "react"
import Header from "~/layout/Header"
import { Box, TextField, Button } from "@material-ui/core"
import axios from "axios"

export const DevRoute = () => {
  const [url, setUrl] = useState("")

  const handleUrl = async () => {
    if (!url) {
      alert("Enter a url")
      return
    }
    const resp = await axios.get(url)
    console.log(resp)
  }

  return (
    <>
      {/* App Header */}
      <Header noSidebar noEditor noSearch noSettings />
      <h1>Dev Window</h1>
      <Box>
        <TextField
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          variant="outlined"
          label="Enter URL"
        />
        <Button onClick={handleUrl} variant="contained">
          Get Meta
        </Button>
      </Box>
    </>
  )
}
