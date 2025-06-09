document.getElementById('formLogin').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value.trim();

  // Exemplo de verificação simples (você pode adaptar para autenticação real depois)
  if (email === '' || senha === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Campos obrigatórios',
      text: 'Por favor, preencha todos os campos.'
    });
    return;
  }

  // Simulando login com email e senha específicos
  if (email === 'admin@teste.com' && senha === '123456') {
    Swal.fire({
      icon: 'success',
      title: 'Login realizado com sucesso!',
      showConfirmButton: false,
      timer: 2000
    }).then(() => {
      // Redirecionar após login (simulação)
      window.location.href = 'cadastro.html';
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Email ou senha inválidos',
      text: 'Verifique suas credenciais e tente novamente.'
    });
  }
});
