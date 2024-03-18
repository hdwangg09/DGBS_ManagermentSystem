using Common.DTOs;
using Common.Models;
using Common.Request;
using DataAccess.DAO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories.NguoiDungRepo
{
    public class NguoiDungRepository : INguoiDungRepository
    {
        //login
        public UserLoginDTO isLogin(UserReq user) => UserDAO.Instance.isLogin(user);

        //register
        public bool isRegister(UserReq user) => UserDAO.Instance.isRegister(user);
        public bool isExistingEmail(string email) => UserDAO.Instance.isExistingEmail(email);
        public bool isExistingPhone(string phoneNumber) => UserDAO.Instance.isExistingPhone(phoneNumber);

        // Manager User
        public List<UserDTO> GetUserList() => UserDAO.Instance.GetUserList();
        public UserDTO GetUserDetails(int userId) => UserDAO.Instance.GetUserDetails(userId);
        public void UpdateNguoiDung(NguoiDung user) => UserDAO.Instance.UpdateNguoiDung(user);
        public void CreateNguoiDung(NguoiDung user) => UserDAO.Instance.CreateNguoiDung(user);
        public void DeleteUser(NguoiDung user) => UserDAO.Instance.DeleteUser(user);
        public bool isExistedUser(NguoiDung user) => UserDAO.Instance.isExistedUser(user);





    }
}
