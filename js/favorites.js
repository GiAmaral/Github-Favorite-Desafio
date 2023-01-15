import getProfile from "./githubUsers.js"

function createTableRow(profile){
    const tr = document.createElement('tr')

    tr.innerHTML = `

        <td class="user">
            <img src="${profile.avatarUrl}" alt="Imagem de ${profile.name}">
            <a href="https://github.com/${profile.login}" target="_blank">
                <p>${profile.name}</p>
                <span class="login">/${profile.login}</span>
            </a>
        </td>
        <td class="repositories">
            ${profile.publicRepos}
        </td>
        <td class="followers">
            ${profile.followers}
        </td>
        <td>
            <button class="remove">Remover</button>
        </td>
    `

    return tr
}

async function load() {
    const profileSearchInput = document.querySelector('#input-search')

    let profile = await getProfile(profileSearchInput.value)

    if (!profile) {
        return alert('Usuário não encontrado!')
    }

    const logins = document.querySelectorAll('.login')

    if(Array.from(logins).some(login => {
        return login.innerHTML.toLowerCase() === `/${profileSearchInput.value.toLowerCase()}`
    })) {
        return alert('Usuário já cadastrado!')
    }

    const tableContent = document.querySelector('tbody')
    
    const tableRow = createTableRow(profile)

    tableRow.querySelector('.remove').addEventListener('click', () => {
        tableRow.remove()
        updateTableState()
    })

    tableContent.appendChild(tableRow)
}

function cleanSearchInput() {
    document.querySelector('#input-search').value = ''
}

function getLoginsFromTable() {
    return Array.from(document.querySelectorAll('.login'))
}

function updateTableState() {
    const logins = getLoginsFromTable()
    const empty = document.querySelector('.empty-results')

    empty.classList.remove('hidden')

    if(logins.length > 0) {
        empty.classList.add('hidden')
    }
}

function buttonFavoriteAction() {
    document.querySelector('.favorite-button').addEventListener('click', async () => {
        await load()
        updateTableState()
        cleanSearchInput()
    })
}

export default buttonFavoriteAction