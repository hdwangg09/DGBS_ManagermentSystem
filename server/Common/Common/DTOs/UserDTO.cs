using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTOs
{
    public class UserDTO
    {
        public int? NguoiDungId { get; set; }

        public string? HoTen { get; set; }

        public bool? GioiTinh { get; set; }

        public string? DiaChi { get; set; }

        public string? SoDienThoai { get; set; }

        public string? Email { get; set; }

        public string? Password { get; set; }

        public string? RoleName { get; set; }

        public int? TrangThai { get; set; }
    }
}
