using Common.DTOs;
using Common.Models;
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
        DauGiaDTO GetDauGiaDetails(int dauGiaID);
        bool AddNewDauGia(DauGium newDauGia);
        bool UpdateDauGia(DauGium dauGia);
        bool ChangeStatusDauGia(int id, int newStatus);
        //User
        List<KetQuaDauGiaDTO> GetListKetQuaDauGia();
        List<DauGiaDTO> GetListDangDauGia();
    }
}
