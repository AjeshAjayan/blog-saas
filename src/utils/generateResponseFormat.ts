export const generateResponseFormat = <T>(
    message: string,
    statusCode: number,
    status: string,
    data: T,
) => {
    return {
        message,
        statusCode,
        status,
        data,
    }
}