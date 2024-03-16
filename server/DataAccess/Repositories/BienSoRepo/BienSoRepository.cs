using Common.DTOs;
using Common.Models;
using DataAccess.DAO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories.BienSoRepo
{
    public class BienSoRepository : IBienSoRepository
    {
        //Admin
        public List<BienSo> GetListBienSo() => BienSoDAO.Instance.GetListBienSo();
        public BienSo GetBienSoDetails(int bienSoId) => BienSoDAO.Instance.GetBienSoDetails(bienSoId);
        public void AddNewBienSo(BienSo bienSo) => BienSoDAO.Instance.AddNewBienSo(bienSo);
        public void UpdateBienSo(BienSo bienso) => BienSoDAO.Instance.UpdateBienSo(bienso);
        public bool ChangeStatusBienSo(int bienSoId, int newStatus) => BienSoDAO.Instance.ChangeStatusBienSo(bienSoId, newStatus);

        public List<BienSoDTO> GetListBienSoSapDauGia() => BienSoDAO.Instance.GetListBienSoSapDauGia();

        public List<BienSoDTO> GetListBienSoDauGia() => BienSoDAO.Instance.GetListBienSoDauGia();
    }
}
