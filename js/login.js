document.getElementById('formLogin').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const login = {
        email: email,
        senha: senha
    };

    enviarLogin(login);
});

function enviarLogin(login) {
    fetch('http://localhost:8080/api/funcionarios/login', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
    })
    .then(response => {
        if (!response.ok) {
            // Caso a resposta não seja 2xx (erro no servidor ou erro de login)
            return Promise.reject('Email ou senha inválidos');
        }
        return response.json();  // Continuar se a resposta for bem-sucedida
    })
    .then(data => {
        // Checagem da resposta com base no status
        if (data === "Login bem-sucedido!") {
            console.log("Login bem-sucedido:", data);
            window.location.href = "dashboard.html";  // Redireciona para o painel principal
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo deu errado! Tente novamente.',
            });
        }
    })
    .catch(error => {
        console.error("Erro ao enviar dados:", error);
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: error || 'Erro ao tentar fazer login. Tente novamente.',
        });
    });
}
