class FormatService {

    formatResponse(response, statusCode) {
        if (statusCode !== 200) {
            return {data: [], status: false, message: response.error};
        }
        return {data: response, status: true, message: 'success'};
    }

}

export default FormatService;
