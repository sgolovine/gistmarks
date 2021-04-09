exports.handler = async function (_event, _context, callback) {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: "Gistmarks backend replied successfully",
    }),
  })
}
