using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Common.Models;

public partial class DgbsMsVer01Context : DbContext
{
    public DgbsMsVer01Context()
    {
    }

    public DgbsMsVer01Context(DbContextOptions<DgbsMsVer01Context> options)
        : base(options)
    {
    }

    public virtual DbSet<BienSo> BienSos { get; set; }

    public virtual DbSet<DauGium> DauGia { get; set; }

    public virtual DbSet<LichSuDauGium> LichSuDauGia { get; set; }

    public virtual DbSet<LoaiXe> LoaiXes { get; set; }

    public virtual DbSet<NguoiDung> NguoiDungs { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<ThanhPho> ThanhPhos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=HDWANGG;Database=DGBS_MS_VER_01;Uid=sa;Pwd=123456;TrustServerCertificate=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BienSo>(entity =>
        {
            entity.ToTable("Bien_so");

            entity.Property(e => e.BienSoId).HasColumnName("bien_so_id");
            entity.Property(e => e.LoaiXeId).HasColumnName("loai_xe_id");
            entity.Property(e => e.SoBien)
                .HasMaxLength(12)
                .IsFixedLength()
                .HasColumnName("so_bien");
            entity.Property(e => e.ThanhPhoId).HasColumnName("thanh_pho_id");
            entity.Property(e => e.TrangThai).HasColumnName("trang_thai");

            entity.HasOne(d => d.LoaiXe).WithMany(p => p.BienSos)
                .HasForeignKey(d => d.LoaiXeId)
                .HasConstraintName("FK_Bien_so_Loai_Xe");

            entity.HasOne(d => d.ThanhPho).WithMany(p => p.BienSos)
                .HasForeignKey(d => d.ThanhPhoId)
                .HasConstraintName("FK_Bien_so_Thanh_pho");
        });

        modelBuilder.Entity<DauGium>(entity =>
        {
            entity.HasKey(e => e.PhienDauGiaId);

            entity.ToTable("Dau_gia");

            entity.HasIndex(e => e.BienSoId, "UC_Dau_Gia_Bien_So").IsUnique();

            entity.Property(e => e.PhienDauGiaId).HasColumnName("phien_dau_gia_id");
            entity.Property(e => e.BienSoId).HasColumnName("bien_so_id");
            entity.Property(e => e.GhiChu)
                .HasMaxLength(150)
                .HasColumnName("ghi_chu");
            entity.Property(e => e.GiaKhoiDiem)
                .HasColumnType("money")
                .HasColumnName("gia_khoi_diem");
            entity.Property(e => e.NgayTao)
                .HasColumnType("datetime")
                .HasColumnName("ngay_tao");
            entity.Property(e => e.NguoiThangCuoc).HasColumnName("nguoi_thang_cuoc");
            entity.Property(e => e.ThoiGianBatDau)
                .HasColumnType("datetime")
                .HasColumnName("thoi_gian_bat_dau");
            entity.Property(e => e.ThoiGianKetThuc)
                .HasColumnType("datetime")
                .HasColumnName("thoi_gian_ket_thuc");
            entity.Property(e => e.TrangThai).HasColumnName("trang_thai");

            entity.HasOne(d => d.BienSo).WithOne(p => p.DauGium)
                .HasForeignKey<DauGium>(d => d.BienSoId)
                .HasConstraintName("FK_Dau_gia_Bien_so1");

            entity.HasOne(d => d.NguoiThangCuocNavigation).WithMany(p => p.DauGia)
                .HasForeignKey(d => d.NguoiThangCuoc)
                .HasConstraintName("FK_Dau_gia_Nguoi_Dung");
        });

        modelBuilder.Entity<LichSuDauGium>(entity =>
        {
            entity.HasKey(e => e.LichSuId);

            entity.ToTable("Lich_su_dau_gia");

            entity.Property(e => e.LichSuId).HasColumnName("lich_su_id");
            entity.Property(e => e.GhiChu)
                .HasMaxLength(150)
                .HasColumnName("ghi_chu");
            entity.Property(e => e.NguoiDungId).HasColumnName("nguoi_dung_id");
            entity.Property(e => e.PhienDauGiaId).HasColumnName("phien_dau_gia_id");
            entity.Property(e => e.SoTien)
                .HasMaxLength(20)
                .IsFixedLength()
                .HasColumnName("so_tien");
            entity.Property(e => e.ThoiGian)
                .HasColumnType("datetime")
                .HasColumnName("thoi_gian");
            entity.Property(e => e.TrangThai).HasColumnName("trang_thai");

            entity.HasOne(d => d.PhienDauGia).WithMany(p => p.LichSuDauGia)
                .HasForeignKey(d => d.PhienDauGiaId)
                .HasConstraintName("FK_Lich_su_dau_gia_Dau_gia");
        });

        modelBuilder.Entity<LoaiXe>(entity =>
        {
            entity.ToTable("Loai_Xe");

            entity.Property(e => e.LoaiXeId).HasColumnName("loai_xe_id");
            entity.Property(e => e.LoaiXeName)
                .HasMaxLength(80)
                .HasColumnName("loai_xe_name");
        });

        modelBuilder.Entity<NguoiDung>(entity =>
        {
            entity.ToTable("Nguoi_Dung");

            entity.Property(e => e.NguoiDungId)
                .ValueGeneratedNever()
                .HasColumnName("nguoi_dung_id");
            entity.Property(e => e.DiaChi)
                .HasMaxLength(150)
                .HasColumnName("dia_chi");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsFixedLength()
                .HasColumnName("email");
            entity.Property(e => e.GioiTinh).HasColumnName("gioi_tinh");
            entity.Property(e => e.HoTen)
                .HasMaxLength(80)
                .HasColumnName("ho_ten");
            entity.Property(e => e.Password)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("password");
            entity.Property(e => e.RoleId).HasColumnName("role_id");
            entity.Property(e => e.SoDienThoai)
                .HasMaxLength(12)
                .IsFixedLength()
                .HasColumnName("so_dien_thoai");
            entity.Property(e => e.TrangThai).HasColumnName("trang_thai");

            entity.HasOne(d => d.Role).WithMany(p => p.NguoiDungs)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK_Nguoi_Dung_Role");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.ToTable("Role");

            entity.Property(e => e.RoleId).HasColumnName("role_id");
            entity.Property(e => e.RoleName)
                .HasMaxLength(50)
                .HasColumnName("role_name");
        });

        modelBuilder.Entity<ThanhPho>(entity =>
        {
            entity.ToTable("Thanh_pho");

            entity.Property(e => e.ThanhPhoId).HasColumnName("thanh_pho_id");
            entity.Property(e => e.TenThanhPho)
                .HasMaxLength(60)
                .HasColumnName("ten_thanh_pho");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
