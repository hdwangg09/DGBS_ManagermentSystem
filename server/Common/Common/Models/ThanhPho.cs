using System;
using System.Collections.Generic;

namespace Common.Models;

public partial class ThanhPho
{
    public int ThanhPhoId { get; set; }

    public string? TenThanhPho { get; set; }

    public virtual ICollection<BienSo> BienSos { get; set; } = new List<BienSo>();
}
