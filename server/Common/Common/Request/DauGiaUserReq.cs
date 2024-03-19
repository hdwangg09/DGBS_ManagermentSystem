using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Request
{
    public class DauGiaUserReq
    {
        public int? PhienDauGiaId { get; set; }
        public int ? NguoiDungId { get; set; }
        public decimal? SoTien {  get; set; }
        public DateTime? ThoiGian { get; set; }
    }
}
