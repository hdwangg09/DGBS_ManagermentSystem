using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTOs
{
    public class UserLoginDTO
    {
        public int? NguoiDungId { get; set; }
        public string? HoTen { get; set; }
        public int? RoleID { get; set; }
    }
}
