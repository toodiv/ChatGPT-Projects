
document.getElementById('githubForm').addEventListener('submit', function (event) {
    event.preventDefault();
    fetchGitHubData();
});

document.getElementById('username').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        fetchGitHubData();
    }
});

function fetchGitHubData() {
    const username = document.getElementById('username').value.trim();
    if (username === '') {
        alert('Please enter a GitHub username.');
        return;
    }

    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (!response.ok) {
                document.getElementById('notFoundMessage').style.display = 'block';
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('notFoundMessage').style.display = 'none';


            document.getElementById('favicon').href = data.avatar_url;


            document.querySelector('.avatar').src = data.avatar_url;
            document.querySelector('.name').textContent = data.name || 'No name available';
            document.querySelector('.username').textContent = `@${data.login}`;
            document.querySelector('.bio').textContent = data.bio || 'No bio available';
            document.querySelector('.location').textContent = `Location: ${data.location || 'Not specified'}`;
            document.querySelector('.email').textContent = `Email: ${data.email || 'Not specified'}`;


            document.querySelector('.url').style.display = 'none';


            document.querySelector('.link').href = `${data.html_url}`;


            document.querySelector('.url').innerHTML = `<a href="${data.html_url}" target="_blank">${data.html_url}</a>`;

            document.querySelector('.following').textContent = `Following: ${data.following}`;

            document.querySelector('.followers').textContent = `Followers: ${data.followers}`;
            document.querySelector('.repos').textContent = `Public Repositories: ${data.public_repos}`;
            document.getElementById('userInfo').style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('userInfo').style.display = 'none';
        });
}


function changeFavicon() {
    document.getElementById('favicon').href = data.avatar_url;

}

setTimeout(
    function changeFavicon() {
        document.getElementById('favicon').href = " ";


    }, 5000); // Change the favicon after 5 seconds (5000 milliseconds)