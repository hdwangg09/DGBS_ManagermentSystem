using Common.DTOs;
using Common.Models;
using Common.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories.DauGiaRepo
{
    public interface IDauGiaRepository
    {
        //Admin
        List<DauGiaDTO> GetListDauGiaInfor();
        bool AddNewDauGia(DauGium newDauGia);
        bool UpdateDauGia(DauGium dauGia);
        bool ChangeStatusDauGia(int id, int newStatus);
        //User
        List<KetQuaDauGiaDTO> GetListKetQuaDauGia();
        List<DauGiaDTO> GetListDangDauGia();
        DauGiaDTO GetDauGiaDetails(int dauGiaID);
        List<LichSuDauGiaResDTO> GetLichSuDauGia(int dauGiaID);

        bool User_AddUserDauGia(DauGiaUserReq dauGiaUserReq);
        bool User_UpdateWinnerDauGia(DauGiaWinnerRequest winerReq);
    }
}
