async function getProfile(username) {
    let url = `https://api.github.com/users/${username}`
    let response = await fetch(url)
    
    if (!response.ok) {
        return undefined
    }
    
    let data = await response.json()

    return {
        avatarUrl: data.avatar_url,
        name: data.name || data.login,
        login: data.login,
        publicRepos: data.public_repos,
        followers: data.followers
    }
}

export default getProfile;