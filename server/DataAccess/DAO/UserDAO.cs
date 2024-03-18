using Common.DTOs;
using Common.Models;
using Common.Request;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DAO
{
    public class UserDAO
    {
        private static UserDAO instance;
        private static readonly object instanceLock = new();

        private UserDAO()
        {
        }

        public static UserDAO Instance
        {
            get
            {
                lock (instanceLock)
                {
                    if (instance == null) instance = new UserDAO();
                    return instance;
                }
            }
        }

        public UserLoginDTO isLogin(UserReq user)
        {
            try
            {
                using (var context = new DgbsMsVer01Context())
                {
                    NguoiDung existUser = context.NguoiDungs
                        .Include(u => u.Role)
                        .SingleOrDefault(u => u.SoDienThoai == user.SoDienThoai && u.Password == user.Password);
                    return existUser != null ? new UserLoginDTO
                    {
                        NguoiDungId = existUser.NguoiDungId,
                        HoTen = existUser.HoTen,
                        RoleID = existUser.Role.RoleId
                    } 
                    : null;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public bool isRegister(UserReq user)
        {
            try
            {
                using (var context = new DgbsMsVer01Context())
                {
                    NguoiDung nguoidung = new NguoiDung()
                    {
                        SoDienThoai = user.SoDienThoai,
                        Password = user.Password,
                        Email = user.Email,
                        HoTen = user.HoTen,
                        RoleId = 2,
                        TrangThai = 1
                    };
                    context.NguoiDungs.Add(nguoidung);
                    context.SaveChanges();
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool isExistingEmail(string email)
        {
            try
            {
                using (var context = new DgbsMsVer01Context())
                {
                    NguoiDung existEmail = context.NguoiDungs.SingleOrDefault(u => u.Email == email);
                    return existEmail != null ? true : false;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool isExistingPhone(string phoneNumber)
        {
            try
            {
                using (var context = new DgbsMsVer01Context())
                {
                    NguoiDung existPhone = context.NguoiDungs.SingleOrDefault(u => u.SoDienThoai == phoneNumber);
                    return existPhone != null ? true : false;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public List<UserDTO> GetUserList()
        {
            List<UserDTO> listUserDTO = null;
            try
            {
                using (var context = new DgbsMsVer01Context())
                {
                    var listUser = context.NguoiDungs.Include(u => u.Role).ToList();
                    if (listUser != null)
                    {
                        listUserDTO = new List<UserDTO>();
                        foreach (var item in listUser)
                        {
                            UserDTO dto = new UserDTO()
                            {
                                HoTen = item.HoTen,
                                GioiTinh = item.GioiTinh,
                                DiaChi = item.DiaChi,
                                SoDienThoai = item.SoDienThoai,
                                Email = item.Email,
                                RoleName = item.Role.RoleName,
                                TrangThai = item.TrangThai,
                            };
                            listUserDTO.Add(dto);
                        }
                        return listUserDTO;
                    }
                    return null;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                return null;
            }
        }

        public UserDTO GetUserDetails(int userId)
        {
            NguoiDung u = null;
            try
            {
                using (var context = new DgbsMsVer01Context())
                {
                    u = context.NguoiDungs
                        .Include(u => u.Role)
                        .SingleOrDefault(u => u.NguoiDungId == userId);

                    UserDTO userDTO = new UserDTO()
                    {
                        HoTen = u.HoTen,
                        GioiTinh = u.GioiTinh,
                        DiaChi = u.DiaChi,
                        SoDienThoai = u.SoDienThoai,
                        Email = u.Email,
                        RoleName = u.Role.RoleName,
                        TrangThai = u.TrangThai,
                    };

                    return userDTO;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                return null;
            }
        }

        public void UpdateNguoiDung(NguoiDung user)
        {
            try
            {
                using (var context = new DgbsMsVer01Context())
                {
                    var existedUser = context.NguoiDungs
                        .SingleOrDefault(u => u.NguoiDungId == user.NguoiDungId);
                    if (existedUser != null)
                    {
                        existedUser.HoTen = user.HoTen ?? existedUser.HoTen;
                        existedUser.GioiTinh = user.GioiTinh ?? existedUser.GioiTinh;
                        existedUser.DiaChi = user.DiaChi ?? existedUser.DiaChi;
                        existedUser.SoDienThoai = user.SoDienThoai ?? existedUser.SoDienThoai;
                        existedUser.Email = user.Email ?? existedUser.Email;
                        existedUser.TrangThai = user.TrangThai ?? existedUser.TrangThai;
                        existedUser.RoleId = user.RoleId ?? existedUser.RoleId;
                        context.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
            }
        }

        public void CreateNguoiDung(NguoiDung user)
        {
            try
            {
                using (var context = new DgbsMsVer01Context())
                {
                    context.NguoiDungs.Add(user);
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
            }
        }

        public void DeleteUser(NguoiDung user)
        {
            try
            {
                using (var context = new DgbsMsVer01Context())
                {
                    NguoiDung existedUser = context.NguoiDungs.SingleOrDefault(u => u.NguoiDungId == user.NguoiDungId);
                    if (existedUser != null)
                    {
                        context.NguoiDungs.Remove(existedUser);
                        context.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
            }
        }

        public bool isExistedUser(NguoiDung user)
        {
            try
            {
                using (var context = new DgbsMsVer01Context())
                {
                    NguoiDung existedUser = context.NguoiDungs.SingleOrDefault(u => u.NguoiDungId == user.NguoiDungId);
                    return existedUser != null ? true : false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                return false;
            }
        }


    }
}
