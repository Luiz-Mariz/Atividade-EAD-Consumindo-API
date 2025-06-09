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
