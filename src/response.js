const response = (res, statusCode, data, message) => {
    res.status(statusCode).json({
        data: data,
        message: message
    });
}

export default response;