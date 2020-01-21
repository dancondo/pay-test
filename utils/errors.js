exports.errors = {
    NOT_FOUND: {
        statusCode: 404,
        message: 'Not Found'
    }
}

exports.throwError = (err) => {
    const error = new Error()
    error.statusCode = err.statusCode
    error.message = err.message
    throw error
}

exports.errorResponse = (error, req, res, next) => {
    console.log(error)
    const status = error.statusCode || 500;
    res.status(status).json({
      message: error.message,
      statusCode: error.statusCode
    })
  }