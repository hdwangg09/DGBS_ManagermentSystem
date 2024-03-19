using System;
using System.Collections.Generic;

namespace Common.Models;

public partial class NguoiDung
{
    public int NguoiDungId { get; set; }

    public string? HoTen { get; set; }

    public bool? GioiTinh { get; set; }

    public string? DiaChi { get; set; }

    public string? SoDienThoai { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }

    public int? RoleId { get; set; }

    public int? TrangThai { get; set; }

    public virtual ICollection<DauGium> DauGia { get; set; } = new List<DauGium>();

    public virtual ICollection<LichSuDauGium> LichSuDauGia { get; set; } = new List<LichSuDauGium>();

    public virtual Role? Role { get; set; }
}
