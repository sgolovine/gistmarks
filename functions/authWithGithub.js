require("dotenv").config()
const axios = require("axios")

exports.handler = async function (event, _context, callback) {
  const {
    NEXT_PUBLIC_GITHUB_CLIENT_ID,
    NEXT_PUBLIC_GITHUB_REDIRECT_URI,
    GITHUB_CLIENT_SECRET,
  } = process.env

  try {
    const bodyCotn
  }
}
