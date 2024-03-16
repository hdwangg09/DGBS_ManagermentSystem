using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTOs
{
    public class DauGiaDTO
    {
        public int PhienDauGiaId { get; set; }

        public string? BienSo{ get; set; }

        public string? LoaiXe { get; set; }
        public string? ThanhPho { get; set; }
        public string? NguoiThangCuoc { get; set; }

        public string? SoDienThoai { get; set; }

        public DateTime? NgayTao { get; set; }

        public decimal? GiaKhoiDiem { get; set; }

        public DateTime? ThoiGianBatDau { get; set; }

        public DateTime? ThoiGianKetThuc { get; set; }

        public int? TrangThai { get; set; }

        public string? GhiChu { get; set; }


    }
}
