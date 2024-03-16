using System;
using System.Collections.Generic;

namespace Common.Models;

public partial class LoaiXe
{
    public int LoaiXeId { get; set; }

    public string? LoaiXeName { get; set; }

    public virtual ICollection<BienSo> BienSos { get; set; } = new List<BienSo>();
}
