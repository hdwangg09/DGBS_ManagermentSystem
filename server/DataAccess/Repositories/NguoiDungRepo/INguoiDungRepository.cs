using Common.DTOs;
using Common.Models;
using Common.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories.NguoiDungRepo
{
    public interface INguoiDungRepository
    {
        //Login
        bool isLogin(UserReq user);
        bool isExistingEmail(string email);
        bool isExistingPhone(string phoneNumber);
        //Register
        bool isRegister(UserReq user);

        //Manager User
        List<UserDTO> GetUserList();
        UserDTO GetUserDetails(int userId);
        void CreateNguoiDung(NguoiDung user);

        void UpdateNguoiDung(NguoiDung user);

        void DeleteUser(NguoiDung user);

        bool isExistedUser(NguoiDung user);
    }
}
