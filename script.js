console.log('lyrics from lyrics.ovh');
const user_input = document.getElementById('user_input');

const results=[]

function find_song(term){
    fetch(`https://api.lyrics.ovh/suggest/${term}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        data.data.forEach(a=>results.push(a))
        display_results()
    })
}

function display_results(){
    results.forEach(a=>{
        const p = document.createElement('p');
        p.innerHTML = `
            <b>Song title:</b> ${a.title}<br />
            <b>Artist:</b> ${a.artist.name}<br />
            <b>Album:</b> ${a.album.title}<br />
        `
        document.getElementById('display').appendChild(p)
    })
}

document.getElementById('my_form').addEventListener('submit',(e)=>{
    e.preventDefault();
    
    const user_search = user_input.value.trim();

    if(!user_search){
        alert("can't leave it blank")
    }else{
        find_song(user_search)
    }
    results.splice(0,results.length)
    document.getElementById('display').innerHTML = '';
    user_input.value = '';
})