console.log('lyrics from lyrics.ovh');
const user_input = document.getElementById('user_input');

const results=[]
const second_results =[]

let next_url='';

function find_song(term){
    fetch(`https://api.lyrics.ovh/suggest/${term}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        console.log(data.next)
        next_url = data.next
        data.data.forEach(a=>results.push(a))
        display_results(results)
        more_songs();
    })
}

function more_songs(){
    fetch(`https://cors-anywhere.herokuapp.com/${next_url}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        data.data.forEach(a=>second_results.push(a))
    })
}

function display_results(stuff_to_display){
    console.log('should be cleared');
    document.getElementById('display').innerHTML = '';
    user_input.value = '';
    const x = stuff_to_display;

    const button = document.createElement('button');
    x==results?button.innerHTML='Next':button.innerHTML='Previous'

    stuff_to_display.forEach(a=>{
        const p = document.createElement('p');
        p.innerHTML = `
            <b>${a.artist.name}</b> - ${a.title}
        `
        document.getElementById('display').appendChild(p)
        
    })

    document.getElementById('display').appendChild(button)

    button.addEventListener('click',()=>{
        x==results?display_results(second_results):display_results(results)
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
    second_results.splice(0,second_results.length)
})