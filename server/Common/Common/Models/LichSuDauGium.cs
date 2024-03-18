using System;
using System.Collections.Generic;

namespace Common.Models;

public partial class LichSuDauGium
{
    public int LichSuId { get; set; }

    public int? PhienDauGiaId { get; set; }

    public int? NguoiDungId { get; set; }

    public decimal? SoTien { get; set; }

    public DateTime? ThoiGian { get; set; }

    public int? TrangThai { get; set; }

    public string? GhiChu { get; set; }

    public virtual DauGium? PhienDauGia { get; set; }
}
