using Exo.WebApi.Models;
using Exo.WebApi.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Exo.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly UsuarioRepository _usuarioRepository;

        public UsuariosController(UsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        // GET -> /api/usuarios
        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(_usuarioRepository.Listar());
        }

        // POST -> /api/usuarios/login
        [HttpPost("login")] // Adiciona a anotação HttpPost
        public IActionResult Login(Usuario usuario)
        {
            Usuario usuarioBuscado = _usuarioRepository.Login(usuario.Email, usuario.Senha);
            if (usuarioBuscado == null)
            {
                return NotFound("E-mail ou senha inválidos!");
            }

            // Define os dados que serão fornecidos no token - Payload.
            var claims = new[]
            {
                // Armazena na claim o e-mail usuário autenticado.
                new Claim(JwtRegisteredClaimNames.Email, usuarioBuscado.Email),
                // Armazena na claim o id do usuário autenticado.
                new Claim(JwtRegisteredClaimNames.Jti, usuarioBuscado.Id.ToString()),
            };

            // Define a chave de acesso ao token.
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("exoapi-chaveautenticacao"));

            // Define as credenciais do token.
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Gera o token.
            var token = new JwtSecurityToken(
                issuer: "exoapi.webapi", // Emissor do token.
                audience: "exoapi.webapi", // Destinatário do token.
                claims: claims, // Dados definidos acima.
                expires: DateTime.Now.AddMinutes(30), // Tempo de expiração.
                signingCredentials: creds // Credenciais do token.
            );

            // Retorna ok com o token.
            return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
        }

        // POST -> /api/usuarios
        [HttpPost]
        public IActionResult Cadastrar(Usuario usuario)
        {
            _usuarioRepository.Cadastrar(usuario);
            return StatusCode(201);
        }

        // GET -> /api/usuarios/{id}
        [HttpGet("{id}")] // Faz a busca pelo ID.
        public IActionResult BuscarPorId(int id)
        {
            Usuario usuario = _usuarioRepository.BuscaPorId(id);
            if (usuario == null)
            {
                return NotFound();
            }
            return Ok(usuario);
        }

        // PUT -> /api/usuarios/{id}
        // Atualiza.
        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, Usuario usuario)
        {
            try
            {
                _usuarioRepository.Atualizar(id, usuario);
                return StatusCode(204);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = ex.Message });
            }
        }

        // DELETE -> /api/usuarios/{id}
        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            try
            {
                _usuarioRepository.Deletar(id);
                return StatusCode(204);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
