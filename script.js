const openModal = () => {

    document.getElementById('title-modal').innerText = 'Novo usuário';
    document.getElementById('salvar').innerText = 'Salvar';

    document.getElementById('modal').classList.add('active');

    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('cel').value = '';
    document.getElementById('city').value = '';

    document.getElementById('salvar').addEventListener('click', capturarValores);
}

const closeModal = () => {
    document.getElementById('modal').classList.remove('active');
}

document.getElementById('cadastrarUsuario').addEventListener('click', openModal);
document.getElementById('modalClose').addEventListener('click', closeModal);

const capturarValores = () => {

    let listaUsuario = [];

    const id = Math.floor(Math.random() * 100);     
    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const cel = document.getElementById('cel').value;
    const cidade = document.getElementById('city').value;

    const dadosUsuario = {
        idUser: id,
        nomeUser: nome,
        emailUser: email,
        celUser: cel,
        cityUser: cidade   
    }

    if(localStorage.getItem('usuarioCadastrados')) {
        listaUsuario = JSON.parse(localStorage.getItem('usuarioCadastrados'));
    }
    
    listaUsuario.push(dadosUsuario);

    localStorage.setItem('usuarioCadastrados', JSON.stringify(listaUsuario));

    closeModal();
    window.location.reload();
}

document.getElementById('cancelar').addEventListener('click', closeModal);

function carregarUsuarios() {

    let listaUsuario = [];

    if (localStorage.getItem('usuarioCadastrados')) {
        listaUsuario = JSON.parse(localStorage.getItem('usuarioCadastrados'));
    }

    if(listaUsuario.length === 0) {
        let tabela = document.getElementById('corpo-tabela');

        tabela.innerHTML = `
            <tr class='linha-mensagem'>
                <td colspan='5'> Nenhum usuário cadastrado. </td>
            </tr>
        `
    }
    else {
        montarTabela(listaUsuario);
    }
} 
    
window.addEventListener('DOMContentLoaded', carregarUsuarios);

function montarTabela(listaDeCadastrados) {

    let tabela = document.getElementById('corpo-tabela');

    let template = '';

    listaDeCadastrados.forEach(pessoa => {
        template += `
            <tr> 
                <td> ${pessoa.nomeUser}</td>
                <td> ${pessoa.emailUser}</td>
                <td> ${pessoa.celUser}</td>
                <td> ${pessoa.cityUser}</td>
                <td>
                    <button type="button" class="button green" onclick="editarUsuario(${pessoa.idUser})">Editar</button>
                    <button type="button" class="button red" onclick="deletarUsuario(${pessoa.idUser})">Excluir</button>
                </td>
            </tr>
        `
    });

    tabela.innerHTML = template;
}

function deletarUsuario(userId) {

    const listaUsuario = JSON.parse(localStorage.getItem('usuarioCadastrados'));

    const indiceDelete = listaUsuario.findIndex((usuario) => usuario.idUser == userId);

    if(indiceDelete === -1) {
        alert('Usuário não encontrado.');
        return;
    }
    
    const nomeUsuario = listaUsuario[indiceDelete].nomeUser;

    const confirmacao = window.confirm(`Você realmente deseja excluir o usuário ${nomeUsuario}?`);
    
    if(confirmacao) {
        listaUsuario.splice(indiceDelete, 1);
        localStorage.setItem('usuarioCadastrados', JSON.stringify(listaUsuario));

        window.location.reload();
    } 
}

function editarUsuario(userId) {
    openModal();

    document.getElementById('salvar').removeEventListener('click', capturarValores);

    document.getElementById('title-modal').innerText = 'Atualizar usuário';
    document.getElementById('salvar').innerText = 'Atualizar';

    const listaUsuario = JSON.parse(localStorage.getItem('usuarioCadastrados'));

    const indiceUpdate = listaUsuario.find(usuario => usuario.idUser === userId);

    document.getElementById('name').value = indiceUpdate.nomeUser;
    document.getElementById('email').value = indiceUpdate.emailUser;
    document.getElementById('cel').value = indiceUpdate.celUser;
    document.getElementById('city').value = indiceUpdate.cityUser;

    //Removendo qualquer evento de clique anterior do botão 'Salvar'
    document.getElementById('salvar').removeEventListener('click', updateUserInfo);

    //Adicionando o evento de clique que chama 'updateUserInfo(userId)'
    document.getElementById('salvar').addEventListener('click', function () {
        updateUserInfo(userId);
    });
}

function updateUserInfo(userId) {

    const newName = document.getElementById('name').value;
    const newEmail = document.getElementById('email').value; 
    const newCel = document.getElementById('cel').value;
    const newCity = document.getElementById('city').value;

    const listaUsuario = JSON.parse(localStorage.getItem("usuarioCadastrados")) || [];

    const indiceEncontrado = listaUsuario.findIndex((usuario) => usuario.idUser == userId);

    if (indiceEncontrado !== -1) {
        listaUsuario[indiceEncontrado].nomeUser = newName;
        listaUsuario[indiceEncontrado].emailUser = newEmail;
        listaUsuario[indiceEncontrado].celUser = newCel;
        listaUsuario[indiceEncontrado].cityUser = newCity;

        localStorage.setItem('usuarioCadastrados', JSON.stringify(listaUsuario));
    }

    closeModal();
    window.location.reload();
}


