using Exo.WebApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using Exo.WebApi.Contexts; // Adicione esta linha ao início do arquivo


namespace Exo.WebApi.Contexts
{
    public class ExoContext : DbContext
    {
        public ExoContext()
        {     
        }
        public ExoContext(DbContextOptions<ExoContext> options) : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                // Atualize a string de conexão de acordo com seu servidor e credenciais
                optionsBuilder.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=ExoApi;User Id=sa;Password=duxx3eoYY;Trusted_Connection=False;");
            }
        }
        public DbSet<Projeto> Projetos { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
    }
}
