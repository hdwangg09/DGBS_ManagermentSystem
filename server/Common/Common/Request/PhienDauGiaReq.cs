using Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Request
{
    public class PhienDauGiaReq
    {
        public int? PhienDauGiaId { get; set; }
        public int? BienSoId { get; set; }

        public int? NguoiThangCuoc { get; set; }

        public DateTime? NgayTao { get; set; }

        public decimal? GiaKhoiDiem { get; set; }

        public DateTime? ThoiGianBatDau { get; set; }

        public DateTime? ThoiGianKetThuc { get; set; }

        public int? TrangThai { get; set; }

        public string? GhiChu { get; set; }

    }
}
