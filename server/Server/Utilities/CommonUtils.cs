using System.Text.RegularExpressions;

namespace Server.Utilities
{
    public static class CommonUtils
    {
        public static bool isValidEmail(string email)
        {
            string emailPattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
            return Regex.IsMatch(email, emailPattern);
        }
        public static bool IsValidVietnamesePhoneNumber(string phoneNumber)
        {
            if (phoneNumber.StartsWith("0"))
            {
                if (Regex.IsMatch(phoneNumber, "[^0-9]"))
                {
                    return false;
                }

                string numericPart = Regex.Replace(phoneNumber, "[^0-9]", "");

                if (numericPart.Length == 10)
                {
                    return true;
                }
            }
            return false;
        }
        public static bool IsValidFullName(string input)
        {
            Regex regex = new Regex("[0-9!@#$%^&*(),.?\":{}|<>]");

            if (regex.IsMatch(input))
            {
                return false;
            }

            return true;
        }
    }
}
