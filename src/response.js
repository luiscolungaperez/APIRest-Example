exports.success = (req, res, message, status) => {
  res.status(status || 200).send({
    error: '',
    success: message
  })
}

exports.error = (req, res, message, status, error) => {
  console.error('[error]: ' + error)
  res.status(status || 500).send({
    error: message,
    success: ''
  })
}
