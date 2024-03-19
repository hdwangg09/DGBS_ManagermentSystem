using Common.DTOs;
using Common.Models;
using Common.Request;
using Common.Response;
using DataAccess.Repositories.BienSoRepo;
using DataAccess.Repositories.DauGiaRepo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Server.Controllers
{
    [Route("api")]
    [ApiController]
    public class DauGiaController : ControllerBase
    {
        private readonly IDauGiaRepository _dauGiaRepository;

        public DauGiaController(IDauGiaRepository dauGiaRepository)
        {
            _dauGiaRepository = dauGiaRepository;
        }

        [HttpGet("admin/daugia")]
        public async Task<ActionResult<BaseResponse<object>>> Admin_DauGiaList()
        {
            BaseResponse<object> response = new BaseResponse<object>(); ;
            try
            {
                List<DauGiaDTO> dauGiaList = _dauGiaRepository.GetListDauGiaInfor();
                response.Error = false;
                response.Code = HttpStatusCode.OK;
                response.Message = "Lấy danh sách thành công.";
                response.Data = dauGiaList;
                return response;

            }
            catch (Exception ex)
            {
                response.Error = true;
                response.Code = HttpStatusCode.BadRequest;
                response.Message = "Có lỗi,vui lòng thử lại.";
                return response;
            }

        }

        [HttpGet("admin/daugia/{dauGiaId}")]
        public async Task<ActionResult<BaseResponse<object>>> Admin_DauGiaDetails(int dauGiaId)
        {
            BaseResponse<object> response = new BaseResponse<object>(); ;

            try
            {

                DauGiaDTO dauGium = _dauGiaRepository.GetDauGiaDetails(dauGiaId);
                response.Error = false;
                response.Code = HttpStatusCode.OK;
                response.Message = "Lấy thông tin thành công.";
                response.Data = dauGium;
                return response;

            }
            catch (Exception ex)
            {
                response.Error = true;
                response.Code = HttpStatusCode.BadRequest;
                response.Message = "Có lỗi,vui lòng thử lại.";
                return response;
            }

        }

        [HttpPost("admin/daugia/create")]
        public async Task<ActionResult<BaseResponse<object>>> Admin_CreateDauGia([FromBody] PhienDauGiaReq dauGiaReq)
        {
            BaseResponse<object> response = new BaseResponse<object>(); ;

            try
            {
                DauGium dauGiaRaw = new DauGium
                {
                    BienSoId = dauGiaReq.BienSoId,
                    NguoiThangCuoc = dauGiaReq.NguoiThangCuoc,
                    NgayTao = DateTime.Now,
                    GiaKhoiDiem = dauGiaReq.GiaKhoiDiem,
                    ThoiGianBatDau = dauGiaReq.ThoiGianBatDau,
                    ThoiGianKetThuc = dauGiaReq.ThoiGianKetThuc,
                    TrangThai = dauGiaReq.TrangThai,
                    GhiChu = dauGiaReq.GhiChu
                };
                bool result = _dauGiaRepository.AddNewDauGia(dauGiaRaw);
                if (result)
                {
                    response.Error = false;
                    response.Code = HttpStatusCode.OK;
                    response.Message = "Thêm phiên đấu giá thành công.";
                    return response;
                }
                else
                {
                    response.Error = true;
                    response.Code = HttpStatusCode.OK;
                    response.Message = "Có lỗi, vui lòng thử lại.";
                    return response;
                }

            }
            catch (Exception ex)
            {
                response.Error = true;
                response.Code = HttpStatusCode.BadRequest;
                response.Message = "Có lỗi,vui lòng thử lại.";
                return response;
            }

        }

        [HttpPost("admin/daugia/update")]
        public async Task<ActionResult<BaseResponse<object>>> Admin_UpdateDauGia([FromBody] PhienDauGiaReq dauGiaReq)
        {
            BaseResponse<object> response = new BaseResponse<object>();
            try
            {
                DauGium dauGiaRaw = new DauGium
                {
                    PhienDauGiaId = (int)dauGiaReq.PhienDauGiaId,
                    BienSoId = dauGiaReq.BienSoId,
                    NguoiThangCuoc = dauGiaReq.NguoiThangCuoc,
                    GiaKhoiDiem = dauGiaReq.GiaKhoiDiem,
                    ThoiGianBatDau = dauGiaReq.ThoiGianBatDau,
                    TrangThai = dauGiaReq.TrangThai,
                    GhiChu = dauGiaReq.GhiChu
                };
                bool result = _dauGiaRepository.UpdateDauGia(dauGiaRaw);
                if (result)
                {
                    response.Error = false;
                    response.Code = HttpStatusCode.OK;
                    response.Message = "Cập nhật thành công.";
                    return response;
                }
                else
                {
                    response.Error = true;
                    response.Code = HttpStatusCode.OK;
                    response.Message = "Có lỗi, vui lòng thử lại.";
                    return response;
                }

            }
            catch (Exception ex)
            {
                response.Error = true;
                response.Code = HttpStatusCode.BadRequest;
                response.Message = "Có lỗi,vui lòng thử lại.";
                return response;
            }
        }

        [HttpPost("admin/daugia/changeStatus/{dauGiaId}/{newStatus}")]
        public async Task<ActionResult<BaseResponse<object>>> Admin_ChangeStatusDauGia(int dauGiaId, int newStatus)
        {
            BaseResponse<object> response = new BaseResponse<object>();

            try
            {
                bool isSuccess = _dauGiaRepository.ChangeStatusDauGia(dauGiaId, newStatus);
                if (isSuccess)
                {
                    response.Error = false;
                    response.Code = HttpStatusCode.OK;
                    response.Message = "Đổi trạng thái thành công.";
                    return response;
                }
                else
                {
                    response.Error = false;
                    response.Code = HttpStatusCode.BadRequest;
                    response.Message = "Có lỗi vui lòng thử lại sau.";
                    return response;
                }

            }
            catch (Exception ex)
            {
                response.Error = true;
                response.Code = HttpStatusCode.BadRequest;
                response.Message = "Có lỗi,vui lòng thử lại.";
                return response;
            }

        }

        [HttpGet("user/daugia/ketqua")]
        public async Task<ActionResult<BaseResponse<object>>> User_KetQuaDauGiaList()
        {
            BaseResponse<object> response = new BaseResponse<object>(); ;
            try
            {
                List<KetQuaDauGiaDTO> dauGiaList = _dauGiaRepository.GetListKetQuaDauGia();
                response.Error = false;
                response.Code = HttpStatusCode.OK;
                response.Message = "Lấy danh sách thành công.";
                response.Data = dauGiaList;
                return response;

            }
            catch (Exception ex)
            {
                response.Error = true;
                response.Code = HttpStatusCode.BadRequest;
                response.Message = "Có lỗi,vui lòng thử lại.";
                return response;
            }

        }
        [HttpGet("user/daugia/now")]
        public async Task<ActionResult<BaseResponse<object>>> User_DangDauGiaList()
        {
            BaseResponse<object> response = new BaseResponse<object>(); ;
            try
            {
                List<DauGiaDTO> dauGiaList = _dauGiaRepository.GetListDangDauGia();
                response.Error = false;
                response.Code = HttpStatusCode.OK;
                response.Message = "Lấy danh sách thành công.";
                response.Data = dauGiaList;
                return response;

            }
            catch (Exception ex)
            {
                response.Error = true;
                response.Code = HttpStatusCode.BadRequest;
                response.Message = "Có lỗi,vui lòng thử lại.";
                return response;
            }

        }
        [HttpGet("user/daugia/infor/{dauGiaId}")]
        public async Task<ActionResult<BaseResponse<object>>> User_DauGiaInfor(int dauGiaId)
        {
            BaseResponse<object> response = new BaseResponse<object>(); ;
            try
            {
                DauGiaDTO dauGiaInfor = _dauGiaRepository.GetDauGiaDetails(dauGiaId);
                response.Error = false;
                response.Code = HttpStatusCode.OK;
                response.Message = "Lấy danh sách thành công.";
                response.Data = dauGiaInfor;
                return response;

            }
            catch (Exception ex)
            {
                response.Error = true;
                response.Code = HttpStatusCode.BadRequest;
                response.Message = "Có lỗi,vui lòng thử lại.";
                return response;
            }

        }
        [HttpGet("user/daugia/lichsudaugia/{dauGiaId}")]
        public async Task<ActionResult<BaseResponse<object>>> User_GetListLichSuDauGia(int dauGiaId)
        {
            BaseResponse<object> response = new BaseResponse<object>(); ;
            try
            {
                List<LichSuDauGiaResDTO> lichSuDauGiaInfor = _dauGiaRepository.GetLichSuDauGia(dauGiaId);
                response.Error = false;
                response.Code = HttpStatusCode.OK;
                response.Message = "Lấy danh sách thành công.";
                response.Data = lichSuDauGiaInfor;
                return response;

            }
            catch (Exception ex)
            {
                response.Error = true;
                response.Code = HttpStatusCode.BadRequest;
                response.Message = "Có lỗi,vui lòng thử lại.";
                return response;
            }

        }
        [HttpPost("user/daugia/add")]

        public async Task<ActionResult<BaseResponse<object>>> User_AddUserDauGia(DauGiaUserReq dauGiaUserReq)
        {
            BaseResponse<object> response = new BaseResponse<object>(); ;
            try
            {
                bool result = _dauGiaRepository.User_AddUserDauGia(dauGiaUserReq);
                if (result)
                {
                    response.Error = false;
                    response.Code = HttpStatusCode.OK;
                    response.Message = "Trả giá thành công.";
                    return response;
                }

                response.Error = true;
                response.Code = HttpStatusCode.BadRequest;
                response.Message = "Yêu cầu không hợp lệ.";
                return response;
            }
            catch (Exception ex)
            {
                response.Error = true;
                response.Code = HttpStatusCode.BadRequest;
                response.Message = "Có lỗi,vui lòng thử lại.";
                return response;
            }

        }
        [HttpPost("user/daugia/room/winner")]
        public async Task<ActionResult<BaseResponse<object>>> User_UpdateWinnerDauGia(DauGiaWinnerRequest winerReq)
        {
            BaseResponse<object> response = new BaseResponse<object>(); ;
            try
            {
                bool result = _dauGiaRepository.User_UpdateWinnerDauGia(winerReq);
                if (result)
                {
                    response.Error = false;
                    response.Code = HttpStatusCode.OK;
                    response.Message = "Cập nhật người chiến thắng thành công.";
                    return response;
                }

                response.Error = true;
                response.Code = HttpStatusCode.BadRequest;
                response.Message = "Có lỗi,vui lòng thử lại.";
                return response;
            }
            catch (Exception ex)
            {
                response.Error = true;
                response.Code = HttpStatusCode.BadRequest;
                response.Message = "Có lỗi,vui lòng thử lại.";
                return response;
            }

        }

    }
}
