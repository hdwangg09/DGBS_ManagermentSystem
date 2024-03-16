using Common.DTOs;
using Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories.BienSoRepo
{
    public interface IBienSoRepository
    {
        //Admin
        List<BienSo> GetListBienSo();
        void AddNewBienSo(BienSo bienSo);
        void UpdateBienSo(BienSo bienso);
        BienSo GetBienSoDetails(int bienSoId);
        bool ChangeStatusBienSo(int bienSoId, int newStatus);

        List<BienSoDTO>GetListBienSoSapDauGia();
        List<BienSoDTO> GetListBienSoDauGia();

    }
}

