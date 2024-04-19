const openModal = () => {
    document.getElementById('modal').classList.add('active');
}

const closeModal = () => {
    document.getElementById('modal').classList.remove('active');
}


//CRUD - create, read, update, delete

//Create

const CapturarValores = () => {

    let listaUsuario = [];

    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const cel = document.getElementById('cel').value;
    const cidade = document.getElementById('city').value;

    const dadosUsuario = {
        nome: nome,
        email: email,
        cel: cel,
        cidade: cidade   
    }

    if(localStorage.getItem('usuarioCadastrados')) {
        listaUsuario = JSON.parse(localStorage.getItem('usuarioCadastrados'));
    }
    
    listaUsuario.push(dadosUsuario);

    localStorage.setItem('usuarioCadastrados', JSON.stringify(listaUsuario));

    document.getElementById('salvar').addEventListener('click', closeModal);

    window.location.reload();
}

document.getElementById('salvar').addEventListener('click', CapturarValores);

function CarregarUsuarios() {
    
    let listaUsuario = [];
    
    if(localStorage.getItem('usuarioCadastrados')) {
        listaUsuario = JSON.parse(localStorage.getItem('usuarioCadastrados'));

        
    }

    console.log(listaUsuario)
    
    if(listaUsuario.length === 0) {
        let tabela = document.getElementById('corpo-tabela');
    
        tabela.innerHTML = `
            <tr class='linha-mensagem'>
                <td colspan='6'> Nenhum usuário cadastrado. </td>
            </tr>
            `
    }
    else {
        MontarTabela(listaUsuario);
    }
    } 
    
window.addEventListener('DOMContentLoaded', () => CarregarUsuarios());

function MontarTabela(listaDeCadastrados) {
    let tabela = document.getElementById('corpo-tabela');

    let template = '';

    listaDeCadastrados.forEach(pessoa => {
        template += `
            <tr> 
                <td data-cell='nome'> ${pessoa.nome}</td>
                <td data-cell='email'> ${pessoa.email}</td>
                <td data-cell='cel'> ${pessoa.cel}</td>
                <td data-cell='cidade'> ${pessoa.cidade}</td>
                <td>
                    <button type="button" class="button green">Editar</button>
                    <button type="button" class="button red">Excluir</button>
                </td>
            </tr>
        `
    });

    tabela.innerHTML = template;
}

document.getElementById('cadastrarUsuario').addEventListener('click', openModal);

document.getElementById('modalClose').addEventListener('click', closeModal);

