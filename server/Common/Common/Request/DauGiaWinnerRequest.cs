using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Request
{
    public class DauGiaWinnerRequest
    {
        public int? PhienDauGiaId { get; set; }
        public int? BienSoId { get; set; }  
        public int? NguoiDungId { get; set; }
    }
}
