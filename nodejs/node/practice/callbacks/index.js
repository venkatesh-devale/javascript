console.log('Before');

getUser(0, (user)=>{
    console.log("User returned:", user);
    getRepositories(user.name, (repo_array) => {
        console.log(`Repo Array for username: ${user.name} is `, repo_array);
    });
});

console.log('After');

function getUser(id, callback) {
    setTimeout(()=>{
        console.log('Returning the callback for id: ', id);
        callback({'id': 1, 'name': 'Venkatesh'});
    }, 2000);
    
}

function getRepositories(username, callback) {
    setTimeout(()=>{
        callback(['repo1', 'repo2', 'repo3']);
    }, 1000);
}