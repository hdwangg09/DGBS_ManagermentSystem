using Common.Constants;
using Common.DTOs;
using Common.Models;
using Common.Request;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DAO
{
    public class DauGiaDAO
    {
        private static DauGiaDAO instance;
        private static readonly object instanceLock = new();

        private DauGiaDAO()
        {
        }
        public static DauGiaDAO Instance
        {
            get
            {
                lock (instanceLock)
                {
                    if (instance == null) instance = new DauGiaDAO();
                    return instance;
                }
            }
        }

        public List<DauGiaDTO> GetListDauGiaInfor()
        {
            List<DauGiaDTO> listDauGiaDTO = null;
            try
            {
                using (var context = new DgbsMsVer01Context())
                {
                    listDauGiaDTO = context.DauGia
                   .Include(d => d.BienSo)
                   .Include(d => d.NguoiThangCuocNavigation)
                   .Select(d => new DauGiaDTO
                   {
                       PhienDauGiaId = d.PhienDauGiaId,
                       BienSo = d.BienSo.SoBien,
                       LoaiXe = d.BienSo.LoaiXe.LoaiXeName,
                       ThanhPho = d.BienSo.ThanhPho.TenThanhPho,
                       NguoiThangCuoc = d.NguoiThangCuocNavigation.HoTen,
                       SoDienThoai = d.NguoiThangCuocNavigation.SoDienThoai,
                       NgayTao = d.NgayTao,
                       GiaKhoiDiem = d.GiaKhoiDiem,
                       ThoiGianBatDau = d.ThoiGianBatDau,
                       ThoiGianKetThuc = d.ThoiGianKetThuc,
                       TrangThai = d.TrangThai,
                       GhiChu = d.GhiChu
                   })
                   .ToList();
                    return listDauGiaDTO;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                return null;
            }
        }

        public DauGiaDTO GetDauGiaDetails(int dauGiaID)
        {
            DauGiaDTO daugiaDetails = null;
            try
            {
                using (var context = new DgbsMsVer01Context())
                {
                    daugiaDetails = context.DauGia
                            //.Include(d => d.NguoiThangCuocNavigation)
                            .Include(d => d.BienSo)
                            .Include(d => d.LichSuDauGia)
                            .Where(d => d.PhienDauGiaId == dauGiaID)
                            .Select(d => new DauGiaDTO
                            {
                                PhienDauGiaId = d.PhienDauGiaId,
                                BienSoId = d.BienSo.BienSoId,
                                BienSo = d.BienSo.SoBien,
                                LoaiXe = d.BienSo.LoaiXe.LoaiXeName,
                                ThanhPho = d.BienSo.ThanhPho.TenThanhPho,
                                ThoiGianBatDau = d.ThoiGianBatDau,
                                ThoiGianKetThuc = d.ThoiGianKetThuc,
                                NguoiThangCuoc = d.NguoiThangCuocNavigation.HoTen,
                                GiaKhoiDiem = d.GiaKhoiDiem,
                                GiaCaoNhat = d.LichSuDauGia.Max(ls => ls.SoTien),
                                TrangThai = d.TrangThai
                            })
                            .FirstOrDefault();
                    return daugiaDetails;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                return null;
            }
        }
        public List<LichSuDauGiaResDTO> GetLichSuDauGia(int dauGiaID)
        {
            List<LichSuDauGiaResDTO> daugiaDetails = null;
            try
            {
                using (var context = new DgbsMsVer01Context())
                {
                    daugiaDetails = context.LichSuDauGia
                        .Include(ls => ls.NguoiDung)
                        .Where(ls => ls.PhienDauGiaId == dauGiaID)
                        .Select(d => new LichSuDauGiaResDTO
                        {
                            SoTien = d.SoTien,
                            nguoiDungName = d.NguoiDung.HoTen,
                            ThoiGian = d.ThoiGian
                        })
                         .ToList();
                    return daugiaDetails;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                return null;
            }
        }

        public bool AddNewDauGia(DauGium newDauGia)
        {
            try
            {
                using (var context = new DgbsMsVer01Context())
                {
                    context.DauGia.Add(newDauGia);
                    int rowAffeced = context.SaveChanges();
                    return rowAffeced > 0 ? true : false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                return false;
            }
        }

        public bool UpdateDauGia(DauGium dauGia)
        {
            try
            {
                using (var context = new DgbsMsVer01Context())
                {
                    var existedDauGia = context.DauGia
                        .SingleOrDefault(d => d.PhienDauGiaId == dauGia.PhienDauGiaId);

                    if (existedDauGia != null)
                    {
                        existedDauGia.BienSoId = dauGia.BienSoId != null ? dauGia.BienSoId : existedDauGia.BienSoId;
                        existedDauGia.NguoiThangCuoc = dauGia.NguoiThangCuoc ?? existedDauGia.NguoiThangCuoc;
                        existedDauGia.GiaKhoiDiem = dauGia.GiaKhoiDiem ?? existedDauGia.GiaKhoiDiem;
                        existedDauGia.ThoiGianBatDau = dauGia.ThoiGianBatDau ?? existedDauGia.ThoiGianBatDau;
                        existedDauGia.TrangThai = dauGia.TrangThai ?? existedDauGia.TrangThai;
                        existedDauGia.GhiChu = dauGia.GhiChu != null ? dauGia.GhiChu : existedDauGia.GhiChu;
                        int rowAffected = context.SaveChanges();
                        return rowAffected > 0 ? true : false;
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

        public bool ChangeStatusDauGia(int id, int newStatus)
        {
            try
            {
                using (var context = new DgbsMsVer01Context())
                {
                    var existedDauGia = context.DauGia.SingleOrDefault(b => b.PhienDauGiaId == id);
                    if (existedDauGia != null && newStatus >= 0)
                    {
                        existedDauGia.TrangThai = newStatus;
                        int rowEffect = context.SaveChanges();
                        return rowEffect > 0 ? true : false;
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
        public List<KetQuaDauGiaDTO> GetListKetQuaDauGia()
        {
            List<KetQuaDauGiaDTO> listKetQua = null;
            try
            {
                using (var context = new DgbsMsVer01Context())
                {
                    listKetQua = context.DauGia
                        .Include(d => d.NguoiThangCuocNavigation)
                        .Include(d => d.BienSo)
                        .Include(d => d.LichSuDauGia)
                        .Where(d => d.NguoiThangCuocNavigation != null && d.TrangThai == Constants.DauGiaStatus.DaKetThuc)
                        .Select(d => new KetQuaDauGiaDTO
                        {
                            BienSo = d.BienSo.SoBien,
                            LoaiXe = d.BienSo.LoaiXe.LoaiXeName,
                            ThanhPho = d.BienSo.ThanhPho.TenThanhPho,
                            ThoiGianKetThuc = d.ThoiGianKetThuc,
                            NguoiThangCuoc = d.NguoiThangCuocNavigation.HoTen,
                            GiaCuoiCung = d.LichSuDauGia
                                            .Where(ls => ls.NguoiDungId == d.NguoiThangCuocNavigation.NguoiDungId)
                                            .GroupBy(ls => ls.NguoiDungId)
                                            .Select(group => group.Max(ls => ls.SoTien))
                                            .FirstOrDefault(),
                        })
                        .ToList();
                }
                return listKetQua;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                return null;
            }
        }
        public List<DauGiaDTO> GetListDangDauGia()
        {
            List<DauGiaDTO> listDangDauGia = null;
            try
            {
                using (var context = new DgbsMsVer01Context())
                {
                    listDangDauGia = context.DauGia
                        .Include(d => d.NguoiThangCuocNavigation)
                        .Include(d => d.BienSo)
                        .Include(d => d.LichSuDauGia)
                        .Where(d => d.NguoiThangCuocNavigation == null && d.TrangThai == Constants.DauGiaStatus.DangDauGia)
                        .Select(d => new DauGiaDTO
                        {
                            PhienDauGiaId = d.PhienDauGiaId,
                            BienSo = d.BienSo.SoBien,
                            LoaiXe = d.BienSo.LoaiXe.LoaiXeName,
                            ThanhPho = d.BienSo.ThanhPho.TenThanhPho,
                            ThoiGianBatDau = d.ThoiGianBatDau,
                            ThoiGianKetThuc = d.ThoiGianKetThuc,
                            NguoiThangCuoc = d.NguoiThangCuocNavigation.HoTen,
                            GiaKhoiDiem = d.GiaKhoiDiem,
                            GiaCaoNhat = d.LichSuDauGia.Max(ls => ls.SoTien)
                        })
                        .ToList();
                }
                return listDangDauGia;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                return null;
            }
        }
        public bool User_AddUserDauGia(DauGiaUserReq dauGiaUserReq)
        {
            try
            {
                using (var context = new DgbsMsVer01Context())
                {
                    var dauGiaInfor = context.DauGia.SingleOrDefault(d => d.PhienDauGiaId == dauGiaUserReq.PhienDauGiaId);
                    if (dauGiaUserReq.ThoiGian > dauGiaInfor.ThoiGianKetThuc)
                    {
                        return false;
                    }
                    else
                    {
                        LichSuDauGium ls = new LichSuDauGium
                        {
                            PhienDauGiaId = dauGiaUserReq.PhienDauGiaId,
                            NguoiDungId = dauGiaUserReq.NguoiDungId,
                            SoTien = dauGiaUserReq.SoTien,
                            ThoiGian = dauGiaUserReq.ThoiGian
                        };
                        context.LichSuDauGia.Add(ls);
                        int count = context.SaveChanges();
                        return count > 0 ? true : false;

                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                return false;
            }
        }
        public bool User_UpdateWinnerDauGia(DauGiaWinnerRequest winerReq)
        {
            try
            {
                using (var context = new DgbsMsVer01Context())
                {
                    var dauGiaExisted = context.DauGia
                        .Include(dg => dg.BienSo)
                        .Include(dg => dg.LichSuDauGia)
                        .Where(d => d.PhienDauGiaId == winerReq.PhienDauGiaId && d.BienSoId == winerReq.BienSoId && d.TrangThai == Constants.DauGiaStatus.DangDauGia)
                        .SingleOrDefault();

                    if (dauGiaExisted != null)
                    {
                        var maxSoTien = context.LichSuDauGia
                            .Where(ls => ls.PhienDauGiaId == winerReq.PhienDauGiaId)
                            .Max(ls => ls.SoTien);
                        //Nếu có người đấu giá
                        if(maxSoTien != null)
                        {
                            var listUser = context.LichSuDauGia
                                .Where(ls => ls.PhienDauGiaId == winerReq.PhienDauGiaId && ls.SoTien == maxSoTien)
                                .ToList();
                            if(listUser.Count > 1)
                            {
                                int? firstUserIdToWin = (int)listUser[0].NguoiDungId;
                                if (firstUserIdToWin.HasValue)
                                {
                                    dauGiaExisted.NguoiThangCuoc = firstUserIdToWin.Value;
                                    dauGiaExisted.TrangThai = Constants.DauGiaStatus.DaKetThuc;
                                    //dauGiaExisted.BienSo.TrangThai = Constants.BienSoStatus.Dong;
                                    int count = context.SaveChanges();
                                    return count > 0;
                                }
                            }
                            else if(listUser.Count == 1)
                            {
                                int? nguoiDungIdToWin = context.LichSuDauGia
                                                       .Where(ls => ls.PhienDauGiaId == winerReq.PhienDauGiaId && ls.SoTien == maxSoTien)
                                                       .Select(ls => (int?)ls.NguoiDungId)
                                                       .SingleOrDefault();
                                if (nguoiDungIdToWin.HasValue)
                                {
                                    dauGiaExisted.NguoiThangCuoc = nguoiDungIdToWin.Value;
                                    dauGiaExisted.TrangThai = Constants.DauGiaStatus.DaKetThuc;
                                    //dauGiaExisted.BienSo.TrangThai = Constants.BienSoStatus.Dong;
                                    int count = context.SaveChanges();
                                    return count > 0;
                                }
                            }
                        }

                        //Nếu không có người đấu giá
                        if(maxSoTien == null)
                        {
                            dauGiaExisted.TrangThai = Constants.DauGiaStatus.DaKetThuc;
                            dauGiaExisted.BienSo.TrangThai = Constants.BienSoStatus.Dong;
                            int count = context.SaveChanges();
                            return count > 0;
                        }
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

    }
}
