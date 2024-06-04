export const handleSuccess = (res, data) => {
    res.status(200).json(data);
};

export const handleError = (res, statusCode, message) => {
    res.status(statusCode).json({ error: message });
};
