"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const signInSendResponse = (res, data) => {
    const responseData = {
        success: data.success,
        statusCode: data.statusCode,
        message: data.message || null,
        token: data.token || null || undefined,
    };
    res.status(data.statusCode).json(responseData);
};
exports.default = signInSendResponse;
