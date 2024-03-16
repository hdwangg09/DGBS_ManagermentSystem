using Azure.Core;
using Common.DTOs;
using Common.Models;
using Common.Request;
using Common.Response;
using DataAccess.Repositories.NguoiDungRepo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Utilities;
using System.Net;

namespace Server.Controllers
{
    [Route("api")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly INguoiDungRepository nguoiDungRepo;

        public UserController(INguoiDungRepository nguoiDungRepo)
        {
            this.nguoiDungRepo = nguoiDungRepo;
        }
        [HttpPost("login")]
        public async Task<ActionResult<BaseResponse<object>>> Login([FromBody] UserReq loginReq)
        {
            BaseResponse<object> response = null;
            try
            {
                response = new BaseResponse<object>();
                if (loginReq == null || string.IsNullOrEmpty(loginReq.SoDienThoai.Trim())
                    || string.IsNullOrEmpty(loginReq.Password.Trim()))
                {
                    response.Error = true;
                    response.Code = HttpStatusCode.BadRequest;
                    response.Message = "Request không hợp lệ.";
                    return StatusCode((int)response.Code.GetValueOrDefault(), response);
                }
                bool isLogin = nguoiDungRepo.isLogin(loginReq);
                if (isLogin)
                {
                    response.Error = false;
                    response.Code = HttpStatusCode.OK;
                    response.Message = "Đăng nhập thành công.";
                    return StatusCode((int)response.Code.GetValueOrDefault(), response);
                }
                else
                {
                    response.Error = true;
                    response.Code = HttpStatusCode.BadRequest;
                    response.Message = "Sai tài khoản hoặc mật khẩu.";
                    return StatusCode((int)response.Code.GetValueOrDefault(), response);
                }
            }
            catch (Exception ex)
            {
                response.Error = true;
                response.Code = HttpStatusCode.BadRequest;
                response.Message = "Vui lòng thử lại.";
                return StatusCode((int)response.Code.GetValueOrDefault(), response);
            }

        }

        [HttpPost("register")]
        public async Task<ActionResult<BaseResponse<object>>> Register([FromBody] UserReq registerReq)
        {
            BaseResponse<object> response = null;
            try
            {
                // check dữ liệu vào
                response = new BaseResponse<object>();
                if (registerReq == null || string.IsNullOrEmpty(registerReq.HoTen.Trim())
                    || string.IsNullOrEmpty(registerReq.SoDienThoai.Trim())
                      || string.IsNullOrEmpty(registerReq.Password.Trim())
                      || string.IsNullOrEmpty(registerReq.Email.Trim())
                      || string.IsNullOrEmpty(registerReq.HoTen.Trim()))
                {
                    response.Error = true;
                    response.Code = HttpStatusCode.BadRequest;
                    response.Message = "Request không hợp lệ.";
                    return StatusCode((int)response.Code.GetValueOrDefault(), response);
                }
                //kiểm tra email và sđt tồn tại chưa
                bool isExistingEmail = nguoiDungRepo.isExistingEmail(registerReq.Email);
                if (isExistingEmail)
                {
                    response.Error = true;
                    response.Code = HttpStatusCode.BadRequest;
                    response.Message = "Email đã tồn tại.";
                    return StatusCode((int)response.Code.GetValueOrDefault(), response);
                }
                bool isExistingPhone = nguoiDungRepo.isExistingPhone(registerReq.SoDienThoai);
                if (isExistingPhone)
                {
                    response.Error = true;
                    response.Code = HttpStatusCode.BadRequest;
                    response.Message = "Số điện thoại đã tồn tại.";
                    return StatusCode((int)response.Code.GetValueOrDefault(), response);
                }

                //Kiểm tra email, số điện thoại, họ tên, password hợp lệ không.
                bool isValidEmail = CommonUtils.isValidEmail(registerReq.Email);
                if (!isValidEmail)
                {
                    response.Error = true;
                    response.Code = HttpStatusCode.BadRequest;
                    response.Message = "Email không hợp lệ.";
                    return StatusCode((int)response.Code.GetValueOrDefault(), response);
                }
                bool isValidPhone = CommonUtils.IsValidVietnamesePhoneNumber(registerReq.SoDienThoai);
                if (!isValidPhone)
                {
                    response.Error = true;
                    response.Code = HttpStatusCode.BadRequest;
                    response.Message = "Số điện thoại không hợp lệ.";
                    return StatusCode((int)response.Code.GetValueOrDefault(), response);
                }
                bool isValidName = CommonUtils.IsValidFullName(registerReq.HoTen);
                if (!isValidName)
                {
                    response.Error = true;
                    response.Code = HttpStatusCode.BadRequest;
                    response.Message = "Họ tên chứa ký tự không hợp lệ.";
                    return StatusCode((int)response.Code.GetValueOrDefault(), response);
                }
                bool isValidPass = registerReq.Password.Length >= 6 ? true : false;
                if (!isValidPass)
                {
                    response.Error = true;
                    response.Code = HttpStatusCode.BadRequest;
                    response.Message = "Password phải chứa 6 ký tự.";
                    return StatusCode((int)response.Code.GetValueOrDefault(), response);
                }

                //thực hiện đăng ký thông tin người dùng
                bool isRegister = nguoiDungRepo.isRegister(registerReq);
                if (isRegister)
                {
                    response.Error = false;
                    response.Code = HttpStatusCode.OK;
                    response.Message = "Đăng ký thành công.";
                    return StatusCode((int)response.Code.GetValueOrDefault(), response);
                }
                else
                {
                    response.Error = true;
                    response.Code = HttpStatusCode.BadRequest;
                    response.Message = "Đăng ký không thành công, vui lòng thử lại.";
                    return StatusCode((int)response.Code.GetValueOrDefault(), response);
                }
            }
            catch (Exception ex)
            {
                response.Error = true;
                response.Code = HttpStatusCode.BadRequest;
                response.Message = "Đăng ký không thành công, vui lòng thử lại.";
                return StatusCode((int)response.Code.GetValueOrDefault(), response);
            }

        }

        [HttpGet("admin/user")]
        public async Task<ActionResult<BaseResponse<object>>> Admin_UserList()
        {
            BaseResponse<object> response = null;
            try
            {
                response = new BaseResponse<object>();

                List<UserDTO> nguoiDung = nguoiDungRepo.GetUserList();
                response.Error = false;
                response.Code = HttpStatusCode.OK;
                response.Message = "Lấy danh sách người dùng thành công.";
                response.Data = nguoiDung;
                return StatusCode((int)response.Code.GetValueOrDefault(), response);

            }
            catch (Exception ex)
            {
                response.Error = true;
                response.Code = HttpStatusCode.BadRequest;
                response.Message = "Có lỗi,vui lòng thử lại.";
                return StatusCode((int)response.Code.GetValueOrDefault(), response);
            }

        }

        [HttpGet("admin/user/{userId}")]
        public async Task<ActionResult<BaseResponse<object>>> Admin_GetUserDetails(int userId)
        {
            BaseResponse<object> response = null;
            try
            {
                // check dữ liệu vào
                response = new BaseResponse<object>();
                UserDTO userDetails = nguoiDungRepo.GetUserDetails(userId);
                response.Error = false;
                response.Code = HttpStatusCode.OK;
                response.Message = "Lấy danh sách người dùng thành công.";
                response.Data = userDetails;
                //response.Data = nguoiDung;
                return StatusCode((int)response.Code.GetValueOrDefault(), response);

            }
            catch (Exception ex)
            {
                response.Error = true;
                response.Code = HttpStatusCode.BadRequest;
                response.Message = "Đăng ký không thành công, vui lòng thử lại.";
                return StatusCode((int)response.Code.GetValueOrDefault(), response);
            }

        }

        [HttpPost("admin/user/update")]
        public async Task<ActionResult<BaseResponse<object>>> Admin_UpdateUser([FromBody] NguoiDung userReq)
        {
            BaseResponse<object> response = null;
            try
            {
                response = new BaseResponse<object>();
                if (!(userReq.NguoiDungId >= 0))
                {
                    response.Error = true;
                    response.Code = HttpStatusCode.BadRequest;
                    response.Message = "Request không hợp lệ.";
                    return StatusCode((int)response.Code.GetValueOrDefault(), response);
                }
                nguoiDungRepo.UpdateNguoiDung(userReq);
                response.Error = false;
                response.Code = HttpStatusCode.OK;
                response.Message = "Cập nhật người dùng thành công.";
                return StatusCode((int)response.Code.GetValueOrDefault(), response);

            }
            catch (Exception ex)
            {
                response.Error = true;
                response.Code = HttpStatusCode.BadRequest;
                response.Message = "Vui lòng thử lại.";
                return StatusCode((int)response.Code.GetValueOrDefault(), response);
            }

        }
    }
}
