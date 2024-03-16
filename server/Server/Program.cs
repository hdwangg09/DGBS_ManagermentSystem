using Common.Models;
using Microsoft.EntityFrameworkCore;
using DataAccess.Repositories.NguoiDungRepo;
using DataAccess.Repositories.DauGiaRepo;
using DataAccess.Repositories.BienSoRepo;
namespace Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddControllers().AddJsonOptions(opt =>
            {
                opt.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
            });

            builder.Services.AddCors(opts =>
            {
                opts.AddDefaultPolicy(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            });
            builder.Services.AddDbContext<DgbsMsVer01Context>(opts =>
            {
                opts.UseSqlServer(builder.Configuration.GetConnectionString("DbConnection") ?? "");
            });
          

            builder.Services.AddSingleton<INguoiDungRepository, NguoiDungRepository>();
            builder.Services.AddSingleton<IDauGiaRepository, DauGiaRepository>();
            builder.Services.AddSingleton<IBienSoRepository, BienSoRepository>();

            builder.Services.AddEndpointsApiExplorer();

            var app = builder.Build();

            app.UseHttpsRedirection();

            app.UseCors();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
