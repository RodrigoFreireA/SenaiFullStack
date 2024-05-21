using Exo.WebApi.Contexts;
using Exo.WebApi.Models;
using System.Collections.Generic;
using System.Linq;

namespace Exo.WebApi.Repositories
{
    public class ProjetoRepository
    {
        private readonly ExoContext _context;

        public ProjetoRepository(ExoContext context)
        {
            _context = context;
        }

        public List<Projeto> Listar()
        {
            return _context.Projetos.ToList();
        }

        public void Cadastrar(Projeto projeto)
        {
            _context.Projetos.Add(projeto);
            _context.SaveChanges();
        }

        public Projeto BuscarPorId(int id)
        {
            // Implementação do método para buscar por ID
            return _context.Projetos.Find(id);
        }

        public void Atualizar(int id, Projeto projeto)
        {
            var projetoExistente = _context.Projetos.Find(id);
            if (projetoExistente != null)
            {
                projetoExistente.NomeDoProjeto = projeto.NomeDoProjeto;
                // Atualize outros campos conforme necessário
                _context.SaveChanges();
            }
        }

        public void Deletar(int id)
        {
            var projeto = _context.Projetos.Find(id);
            if (projeto != null)
            {
                _context.Projetos.Remove(projeto);
                _context.SaveChanges();
            }
        }
    }
}
