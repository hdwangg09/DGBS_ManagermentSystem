﻿using Common.Constants;
using Common.DTOs;
using Common.Models;
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
                       .Include(d => d.BienSo)
                       .Include(d => d.NguoiThangCuocNavigation)
                       .Where(d => d.PhienDauGiaId == dauGiaID)
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
        public List<DauGiaDTO> GetListKetQuaDauGia()
        {
            List<DauGiaDTO> listKetQua = null;
            try
            {
                using(var context =  new DgbsMsVer01Context())
                {
                         listKetQua = context.DauGia
                        .Include(d => d.NguoiThangCuocNavigation)
                        .Include(d => d.BienSo)
                        .Where(d => d.NguoiThangCuocNavigation != null && d.TrangThai == Constants.DauGiaStatus.DaKetThuc)
                        .Select(d => new DauGiaDTO
                        {
                            BienSo = d.BienSo.SoBien,
                            LoaiXe = d.BienSo.LoaiXe.LoaiXeName,
                            ThoiGianKetThuc = d.ThoiGianKetThuc,
                            NguoiThangCuoc = d.NguoiThangCuocNavigation.HoTen
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
    }
}
