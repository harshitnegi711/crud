const ApiResponse = (statusCode, data, message) => ({
  statusCode,
  data,
  message,
  success: statusCode <= 400
})


export { ApiResponse }
