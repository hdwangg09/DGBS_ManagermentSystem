using Common.Constants;
using Common.DTOs;
using Common.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DAO
{
    public class BienSoDAO
    {
        private static BienSoDAO instance;
        private static readonly object instanceLock = new();

        private BienSoDAO()
        {
        }
        public static BienSoDAO Instance
        {
            get
            {
                lock (instanceLock)
                {
                    if (instance == null) instance = new BienSoDAO();
                    return instance;
                }
            }
        }

        public List<BienSo> GetListBienSo()
        {
            List<BienSo> listBienSo = null;
            try
            {
                using (var context = new DgbsMsVer01Context())
                {
                    listBienSo = context.BienSos
                        .Include(b => b.LoaiXe)
                        .Include(b => b.ThanhPho)
                        .ToList();
                    return listBienSo;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                return listBienSo;
            }
        }

        public void AddNewBienSo(BienSo bienSo)
        {
            try
            {
                using (var context = new DgbsMsVer01Context())
                {
                    context.BienSos.Add(bienSo);
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
            }
        }
        public BienSo GetBienSoDetails(int bienSoId)
        {
            BienSo bienSoDeatils = null;
            try
            {
                using (var context = new DgbsMsVer01Context())
                {
                    bienSoDeatils = context.BienSos.
                        Include(b => b.LoaiXe)
                        .Include(b => b.ThanhPho)
                       .SingleOrDefault(b => b.BienSoId == bienSoId);

                    return bienSoDeatils;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                return null;
            }
        }
        public void UpdateBienSo(BienSo bienso)
        {
            try
            {
                using (var context = new DgbsMsVer01Context())
                {
                    var existedBienSo = context.BienSos
                        .SingleOrDefault(b => b.BienSoId == bienso.BienSoId);
                    if (existedBienSo != null)
                    {
                        existedBienSo.SoBien = bienso.SoBien ?? existedBienSo.SoBien;
                        existedBienSo.ThanhPhoId = bienso.ThanhPhoId ?? existedBienSo.ThanhPhoId;
                        existedBienSo.LoaiXeId = bienso.LoaiXeId ?? existedBienSo.LoaiXeId;
                        existedBienSo.TrangThai = bienso.TrangThai ?? existedBienSo.TrangThai;
                        context.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
            }
        }

      

       public bool ChangeStatusBienSo(int bienSoId, int newStatus)
        {
            try
            {
                using (var context = new DgbsMsVer01Context())
                {
                    var existedBienSo = context.BienSos.SingleOrDefault(b => b.BienSoId == bienSoId);
                    if (existedBienSo != null && newStatus > 0)
                    {
                        existedBienSo.TrangThai = newStatus;
                        context.SaveChanges();
                        return true;
                    }
                    return false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                return false;
            }

        }

        public List<BienSoDTO> GetListBienSoSapDauGia()
        {
            List<BienSoDTO> listBienSo = null;
            try
            {
                using (var context = new DgbsMsVer01Context())
                {
                    DateTime dateNow = DateTime.Now;
                    DateTime targetTime = dateNow.AddHours(24);

                    listBienSo = context.BienSos
                        .Include(b => b.LoaiXe)
                        .Include(b => b.ThanhPho)
                        .Include(b => b.DauGium)
                        //.Where(b => b.DauGium.ThoiGianBatDau <= targetTime && b.DauGium.TrangThai == Constants.DauGiaStatus.ChoDauGia)
                        .Where(b => b.DauGium.TrangThai == Constants.DauGiaStatus.ChoDauGia)
                        .OrderBy(d => d.DauGium.ThoiGianBatDau)
                        .Select(d => new BienSoDTO
                        {
                            SoBien = d.SoBien,
                            ThanhPhoName = d.ThanhPho.TenThanhPho,
                            LoaiXeName = d.LoaiXe.LoaiXeName,
                            ThoiGianBatDau = d.DauGium.ThoiGianBatDau,
                            GiaKhoiDiem = d.DauGium.GiaKhoiDiem
                        })
                        .ToList();

                    return listBienSo;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                return listBienSo;
            }
        }

        public List<BienSoDTO> GetListDanhSachCongBo()
        {
            List<BienSoDTO> listBienSo = null;
            try
            {
                using (var context = new DgbsMsVer01Context())
                {
                    listBienSo = context.BienSos
                        .Include(b => b.LoaiXe)
                        .Include(b => b.ThanhPho)
                        .Where(b => b.TrangThai == Constants.BienSoStatus.Mo)
                        .Select(d => new BienSoDTO
                        {

                            SoBien = d.SoBien,
                            ThanhPhoName = d.ThanhPho.TenThanhPho,
                            LoaiXeName = d.LoaiXe.LoaiXeName,
                            ThoiGianBatDau = d.DauGium.ThoiGianBatDau,
                            GiaKhoiDiem = d.DauGium.GiaKhoiDiem

                        })
                        .ToList();

                    return listBienSo;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                return listBienSo;
            }
        }
      

    }
}
