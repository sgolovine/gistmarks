require("dotenv").config()
const axios = require("axios")
const qs = require("query-string")

exports.handler = async function (event, _context, callback) {
  const {
    GITHUB_CLIENT_ID,
    GITHUB_REDIRECT_URI,
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
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: GITHUB_REDIRECT_URI,
    })

    console.log("your query", query)

    const url = `https://github.com/login/oauth/access_token?${query}`

    console.log("authenticating with url", url)

    const resp = await axios({
      method: "POST",
      url,
    })
    const parsedResp = qs.parse(resp.data)

    console.log("parsed response", parsedResp)

    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        accessToken: parsedResp.access_token,
        scope: parsedResp.scope,
        tokenType: parsedResp.token_type,
      }),
    })
  } catch (e) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        message: "An error occurred authenticating with Github",
        details: e,
      }),
    })
    return
  }
}
