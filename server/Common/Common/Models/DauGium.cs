using System;
using System.Collections.Generic;

namespace Common.Models;

public partial class DauGium
{
    public int PhienDauGiaId { get; set; }

    public int? BienSoId { get; set; }

    public int? NguoiThangCuoc { get; set; }

    public DateTime? NgayTao { get; set; }

    public decimal? GiaKhoiDiem { get; set; }

    public DateTime? ThoiGianBatDau { get; set; }

    public DateTime? ThoiGianKetThuc { get; set; }

    public int? TrangThai { get; set; }

    public string? GhiChu { get; set; }

    public virtual BienSo? BienSo { get; set; }

    public virtual ICollection<LichSuDauGium> LichSuDauGia { get; set; } = new List<LichSuDauGium>();

    public virtual NguoiDung? NguoiThangCuocNavigation { get; set; }
}
