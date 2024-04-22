const openModal = () => {
    document.getElementById('modal').classList.add('active');
}

const closeModal = () => {
    document.getElementById('modal').classList.remove('active');
}

const CapturarValores = () => {

    let listaUsuario = [];

    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const cel = document.getElementById('cel').value;
    const cidade = document.getElementById('city').value;

    const dadosUsuario = {
        id: Date.now(),
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

    // document.getElementById('salvar').addEventListener('click', closeModal);

    window.location.reload();
}

document.getElementById('salvar').addEventListener('click', CapturarValores);

document.getElementById('cancelar').addEventListener('click', closeModal);

function obterUsuarios() {
    return JSON.parse(localStorage.getItem('usuarioCadastrados'));
}

function CarregarUsuarios() {
    
    let listaUsuario = obterUsuarios();
    let tabela = document.getElementById('corpo-tabela');

    if(listaUsuario.length === 0) {    
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
                    <button type="button" class="button green" id="editar">Editar</button>
                    <button type="button" class="button red excluir" data-id="${pessoa.id}">Excluir</button>
                </td>
            </tr>
        `
    });

    tabela.innerHTML = template;
}

document.getElementById('corpo-tabela').addEventListener('click', function (event) {

    const target = event.target;
    if(target.classList.contains( 'excluir')) {
        const userId = target.getAttribute('data-id');
        deletarUsuario(userId);
    }
    else if(target.classList.contains('editar')) {
        const userId = target.getAttribute('data-id');
        editarUsuario(userId);
    }
})

function deletarUsuario(userId) {

    let listaUsuario = JSON.parse(localStorage.getItem('usuarioCadastrados')) || [];
    const indiceDelete = listaUsuario.findIndex(usuario => usuario.id.toString() === userId);

    if(indiceDelete === -1) {
        alert('Usuário não encontrado.');
        return;
    }
    
    const nomeUsuario = listaUsuario[indiceDelete].nome;

    const confirmacao = window.confirm(`Você realmente deseja excluir o usuário ${nomeUsuario}?`);
    
    if(confirmacao) {
        listaUsuario.splice(indiceDelete, 1);
        localStorage.setItem('usuarioCadastrados', JSON.stringify(listaUsuario));

        CarregarUsuarios();
    } 
}

function editarUsuario() {

}

document.getElementById('cadastrarUsuario').addEventListener('click', openModal);
document.getElementById('modalClose').addEventListener('click', closeModal);

