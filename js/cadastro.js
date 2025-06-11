document.addEventListener("DOMContentLoaded", () => {
  const cepInput = document.getElementById("cep");
  const erro = document.getElementById("erro");

  cepInput.addEventListener("blur", () => {
    console.log("Evento blur disparado");
    const cep = cepInput.value.replace(/\D/g, '');
    console.log("CEP digitado:", cep);

    if (cep.length !== 8) {
      mostrarErro("CEP inválido. Digite 8 números.");
      limparCampos();
      return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        console.log("Resposta da API:", data);
        if (data.erro) {
          mostrarErro("CEP não encontrado.");
          limparCampos();
        } else {
          erro.textContent = "";
          document.getElementById("endereco").value = data.logradouro || "";
          document.getElementById("bairro").value = data.bairro || "";
          document.getElementById("cidade").value = data.localidade || "";
          document.getElementById("estado").value = data.uf || "";
        }
      })
      .catch(() => {
        mostrarErro("Erro ao consultar o CEP.");
        limparCampos();
      });
  });

  function mostrarErro(mensagem) {
    erro.textContent = mensagem;
  }

  function limparCampos() {
    document.getElementById("endereco").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("estado").value = "";
  }
});

document.getElementById('formCadastro').addEventListener('submit', function(event){
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const cep = document.getElementById("cep").value;
  const endereco = document.getElementById("endereco").value;
  const numero = document.getElementById("numero").value;
  const bairro = document.getElementById("bairro").value;
  const cidade = document.getElementById("cidade").value;
  const estado = document.getElementById("estado").value;

  const funcionario = {
    nome: nome,
    email: email,
    senha: senha,
    cep: cep,
    endereco: endereco,
    numero: numero,
    bairro: bairro,
    cidade: cidade,
    estado: estado
  };

 
  enviarFuncionario(funcionario);
});

function enviarFuncionario(funcionario) {
  fetch('http://localhost:8080/api/funcionarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(funcionario)
  })
  .then(response => {
    if (!response.ok) {
      console.error("Erro na requisição:", error);
      return;
    }
    return response.json();
  })
  .then(data => {
    console.log("Resposta da API:", data);
  })
  .catch(error => {
    console.error("Erro ao enviar dados:", error);
  });
}
