using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTOs
{
    public class KetQuaDauGiaDTO
    {
        public int PhienDauGiaId { get; set; }
        public string? BienSo { get; set; }
        public string? LoaiXe { get; set; }
        public string? ThanhPho { get; set; }
        public string? NguoiThangCuoc { get; set; }
        public decimal? GiaCuoiCung { get; set; }
        public DateTime? ThoiGianKetThuc { get; set; }
        public int? TrangThai { get; set; }
        public string? GhiChu { get; set; }
    }
}
