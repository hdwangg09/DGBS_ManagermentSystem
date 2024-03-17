import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5019/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  function (request) {
    // Trước khi yêu cầu được gửi đi
    // Bạn có thể thêm xác thực hoặc thực hiện các thao tác trước khi gửi yêu cầu
    return request;
  },
  function (error) {
    // Xử lý lỗi
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    // Xử lý dữ liệu trả về từ phản hồi
    return response.data ? response.data : { statusCode: response.status };
  },
  function (error) {
    // Xử lý lỗi phản hồi
    return Promise.reject(error);
  }
);

export default instance;
