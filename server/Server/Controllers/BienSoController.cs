using Common.DTOs;
using Common.Models;
using Common.Response;
using DataAccess.Repositories.BienSoRepo;
using DataAccess.Repositories.NguoiDungRepo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Server.Controllers
{
    [Route("api")]
    [ApiController]
    public class BienSoController : ControllerBase
    {
        private readonly IBienSoRepository _bienSoRepository;

        public BienSoController(IBienSoRepository bienSoRepository)
        {
            _bienSoRepository = bienSoRepository;
        }
        [HttpGet("admin/bienso")]
        public async Task<ActionResult<BaseResponse<object>>> Admin_BienSoList()
        {
            BaseResponse<object> response = new BaseResponse<object>(); ;
            try
            {

                List<BienSo> nguoiDung = _bienSoRepository.GetListBienSo();
                response.Error = false;
                response.Code = HttpStatusCode.OK;
                response.Message = "Lấy danh sách thành công.";
                response.Data = nguoiDung;
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

        [HttpGet("admin/bienso/{bienSoId}")]
        public async Task<ActionResult<BaseResponse<object>>> Admin_BienSoDetails(int bienSoId)
        {
            BaseResponse<object> response = new BaseResponse<object>(); ;

            try
            {

                BienSo nguoiDung = _bienSoRepository.GetBienSoDetails(bienSoId);
                response.Error = false;
                response.Code = HttpStatusCode.OK;
                response.Message = "Lấy thông tin thành công.";
                response.Data = nguoiDung;
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
        
        [HttpPost("admin/bienso/create")]
        public async Task<ActionResult<BaseResponse<object>>> Admin_CreateBienSo([FromBody] BienSo bienSOReq)
        {
            BaseResponse<object> response = new BaseResponse<object>(); ;

            try
            {

                _bienSoRepository.AddNewBienSo(bienSOReq);
                response.Error = false;
                response.Code = HttpStatusCode.OK;
                response.Message = "Thêm biển số thành công.";
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
        [HttpPost("admin/bienso/update")]
        public async Task<ActionResult<BaseResponse<object>>> Admin_UpdateBienSo([FromBody] BienSo bienSOReq)
        {
            BaseResponse<object> response = new BaseResponse<object>();
            try
            {

                _bienSoRepository.UpdateBienSo(bienSOReq);
                response.Error = false;
                response.Code = HttpStatusCode.OK;
                response.Message = "Cập nhật biển số thành công.";
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
        [HttpPost("admin/bienso/changeStatus/{bienSoId}/{newStatus}")]
        public async Task<ActionResult<BaseResponse<object>>> Admin_ChangeStatusBienSo(int bienSoId, int newStatus)
        {
            BaseResponse<object> response = new BaseResponse<object>();

            try
            {

               bool isSuccess =  _bienSoRepository.ChangeStatusBienSo(bienSoId, newStatus);
                if(isSuccess)
                {
                    response.Error = false;
                    response.Code = HttpStatusCode.OK;
                    response.Message = "Đổi trạng thái biển số thành công.";
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
        [HttpGet("user/bienso")]
        public async Task<ActionResult<BaseResponse<object>>> User_BienSoList()
        {
            BaseResponse<object> response = new BaseResponse<object>(); ;
            try
            {

                List<BienSoDTO> bienSoDauGia = _bienSoRepository.GetListBienSoDauGia();
                response.Error = false;
                response.Code = HttpStatusCode.OK;
                response.Message = "Lấy danh sách thành công.";
                response.Data = bienSoDauGia;
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
        [HttpGet("user/bienso/today")]
        public async Task<ActionResult<BaseResponse<object>>> User_GetListBienSoToDay()
        {
            BaseResponse<object> response = new BaseResponse<object>(); ;
            try
            {

                List<BienSoDTO> bienSoDauGia = _bienSoRepository.GetListBienSoSapDauGia();
                response.Error = false;
                response.Code = HttpStatusCode.OK;
                response.Message = "Lấy danh sách thành công.";
                response.Data = bienSoDauGia;
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
