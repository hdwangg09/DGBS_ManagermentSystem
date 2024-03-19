using Common.DTOs;
using Common.Models;
using Common.Request;
using DataAccess.DAO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories.DauGiaRepo
{
    public class DauGiaRepository : IDauGiaRepository
    {
        public List<DauGiaDTO> GetListDauGiaInfor() => DauGiaDAO.Instance.GetListDauGiaInfor();
        public bool AddNewDauGia(DauGium newDauGia) => DauGiaDAO.Instance.AddNewDauGia(newDauGia);
        public bool UpdateDauGia(DauGium dauGia) => DauGiaDAO.Instance.UpdateDauGia(dauGia);
        public bool ChangeStatusDauGia(int id, int newStatus) => DauGiaDAO.Instance.ChangeStatusDauGia(id, newStatus);
        public List<KetQuaDauGiaDTO> GetListKetQuaDauGia() => DauGiaDAO.Instance.GetListKetQuaDauGia();

        public List<DauGiaDTO> GetListDangDauGia() => DauGiaDAO.Instance.GetListDangDauGia();

        public DauGiaDTO GetDauGiaDetails(int dauGiaID) => DauGiaDAO.Instance.GetDauGiaDetails(dauGiaID);
        public List<LichSuDauGiaResDTO> GetLichSuDauGia(int dauGiaID) => DauGiaDAO.Instance.GetLichSuDauGia(dauGiaID);

        public bool User_AddUserDauGia(DauGiaUserReq dauGiaUserReq) => DauGiaDAO.Instance.User_AddUserDauGia(dauGiaUserReq);

        public bool User_UpdateWinnerDauGia(DauGiaWinnerRequest winerReq) => DauGiaDAO.Instance.User_UpdateWinnerDauGia(winerReq);
    }
}
