using Exo.WebApi.Contexts;
using Exo.WebApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
namespace Exo.WebApi.Repositories
{
    public class UsuarioRepository
    {
        private readonly ExoContext _context;
        public UsuarioRepository(ExoContext context)
        {
            _context = context;
        }
        public Usuario Login(string email, string senha)
        {
            return _context.Usuarios.FirstOrDefault(u => u.Email ==
            email && u.Senha == senha);
        }
        public List<Usuario> Listar()
        {
            return _context.Usuarios.ToList();
        }
        public void Cadastrar(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            _context.SaveChanges();
        }
        public Usuario BuscaPorId(int id)
        {
            return _context.Usuarios.Find(id);
        }
        public void Atualizar(int id, Usuario usuario)
        {
            var usuarioExistente = _context.Usuarios.Find(id);

            if (usuarioExistente != null)
            {
                // Verifica se o novo e-mail já está em uso por outro usuário
                var emailExistente = _context.Usuarios
                    .Any(u => u.Email == usuario.Email && u.Id != id);

                if (emailExistente)
                {
                    throw new Exception("E-mail já está em uso por outro usuário.");
                }

                usuarioExistente.Email = usuario.Email;
                usuarioExistente.Senha = usuario.Senha;
                // Atualize outras propriedades necessárias

                try
                {
                    _context.SaveChanges();
                }
                catch (DbUpdateException ex)
                {
                    // Log da exceção (opcional)
                    throw new Exception("Ocorreu um erro ao atualizar o usuário. Por favor, tente novamente.", ex);
                }
            }
            else
            {
                throw new Exception("Usuário não encontrado.");
            }
        }

        public void Deletar(int id)
        {
            Usuario usuarioBuscado = _context.Usuarios.Find(id);
            _context.Usuarios.Remove(usuarioBuscado);
            _context.SaveChanges();
        }
    }
}
