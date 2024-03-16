using System;
using System.Collections.Generic;

namespace Common.Models;

public partial class BienSo
{
    public int BienSoId { get; set; }

    public string? SoBien { get; set; }

    public int? ThanhPhoId { get; set; }

    public int? LoaiXeId { get; set; }

    public int? TrangThai { get; set; }

    public virtual DauGium? DauGium { get; set; }

    public virtual LoaiXe? LoaiXe { get; set; }

    public virtual ThanhPho? ThanhPho { get; set; }
}
