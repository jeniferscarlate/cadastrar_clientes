const openModal = () => {
    document.getElementById('modal').classList.add('active');
}

const closeModal = () => {
    document.getElementById('modal').classList.remove('active');
}


//CRUD - create, read, update, delete

//Create

const tempUser = {
    nome: 'ana',
    email: 'ana-jenifer@gmail.com',
    tel: '11940247364',
    cidade: 'Botucatu'   
}

const setLocalStorege = (dbUser) => localStorage.setItem('db_User', JSON.stringify(dbUser)); 

const getLocalStorege = () => JSON.parse(localStorage.getItem('db_User')) ?? [];


const creatUser = (user) => {
    const dbUser = getLocalStorege();
    dbUser.push(user);
    setLocalStorege(dbUser);
}

document.getElementById('cadastrarUsuario').addEventListener('click', openModal);

document.getElementById('modalClose').addEventListener('click', closeModal);