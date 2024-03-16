using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTOs
{
    public class BienSoDTO
    {
        public int? BienSoId { get; set; }

        public string? SoBien { get; set; }

        public int? ThanhPhoId { get; set; }
        public string? ThanhPhoName { get; set; }
        public int? LoaiXeId { get; set; }
        public string? LoaiXeName { get; set; }
        public int? TrangThai { get; set; }
        public DateTime? ThoiGianBatDau { get; set; }
    }
}
