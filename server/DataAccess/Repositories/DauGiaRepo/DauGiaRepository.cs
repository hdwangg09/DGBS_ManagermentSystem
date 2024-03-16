using Common.DTOs;
using Common.Models;
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
        public DauGiaDTO GetDauGiaDetails(int dauGiaID) => DauGiaDAO.Instance.GetDauGiaDetails(dauGiaID);
        public bool AddNewDauGia(DauGium newDauGia) => DauGiaDAO.Instance.AddNewDauGia(newDauGia);
        public bool UpdateDauGia(DauGium dauGia) => DauGiaDAO.Instance.UpdateDauGia(dauGia);
        public bool ChangeStatusDauGia(int id, int newStatus) => DauGiaDAO.Instance.ChangeStatusDauGia(id, newStatus);
        public List<DauGiaDTO> GetListKetQuaDauGia() => DauGiaDAO.Instance.GetListKetQuaDauGia();
    }
}
