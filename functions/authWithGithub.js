require("dotenv").config()
const axios = require("axios")
const qs = require("query-string")

exports.handler = async function (event, _context, callback) {
  const {
    NEXT_PUBLIC_GITHUB_CLIENT_ID,
    NEXT_PUBLIC_GITHUB_REDIRECT_URI,
    GITHUB_CLIENT_SECRET,
  } = process.env

  try {
    const bodyContent = JSON.parse(event.body)
    const { code } = bodyContent

    if (!code) {
      callback(null, { statusCode: 400, body: "Missing code!" })
      return
    }

    const query = qs.stringify({
      client_id: NEXT_PUBLIC_GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: NEXT_PUBLIC_GITHUB_REDIRECT_URI,
    })

    const resp = await axios({
      method: "POST",
      url: `https://github.com/login/oauth/access_token?${query}`,
    })
    console.log("resp from API", resp)
  } catch {
    callback(null, {
      statusCode: 400,
      body: "An error occurred authenticating with github",
    })
    return
  }
}
