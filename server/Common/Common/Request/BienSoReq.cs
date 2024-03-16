using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Request
{
    public class BienSoReq
    {
        public int? BienSoId { get; set; }

        public string? SoBien { get; set; }

        public int? ThanhPhoId { get; set; }

        public int? LoaiXeId { get; set; }

        public int? TrangThai { get; set; }
    }
}
