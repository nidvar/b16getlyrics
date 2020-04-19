console.log('lyrics from lyrics.ovh');
const user_input = document.getElementById('user_input');

const results=[]
const next_results=[]

function find_song(term){
    fetch(`https://api.lyrics.ovh/suggest/${term}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        data.data.forEach(a=>results.push(a))
        display_results(results)

        button = document.createElement('button');
        button.textContent = 'NEXT';
        document.getElementById('display').appendChild(button);

        button.addEventListener('click',()=>{
            more_songs(data.next);
        })
    })
}


function more_songs(next_url){
    fetch(`https://cors-anywhere.herokuapp.com/${next_url}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        data.data.forEach(a=>results.push(a))
        display_results(results)

        
        if(data.prev){
            button = document.createElement('button');
            button.textContent = 'PREV';
            document.getElementById('display').appendChild(button);

            button.addEventListener('click',()=>{
                more_songs(data.prev);
            })
        }

        if(data.next){
            button = document.createElement('button');
            button.textContent = 'NEXT';
            document.getElementById('display').appendChild(button);

            button.addEventListener('click',()=>{
                more_songs(data.next);
            })
        }

    })
}


function display_results(stuff_to_display){
    document.getElementById('display').innerHTML = '';
    user_input.value = '';
    

    stuff_to_display.forEach(a=>{
        const p = document.createElement('p');
        p.innerHTML = `
            <b>${a.artist.name}</b> - ${a.title}
        `
        document.getElementById('display').appendChild(p)
        
    })


    
    next_url='';
    prev_url='';
    results.splice(0,results.length)
}








document.getElementById('my_form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const user_search = user_input.value.trim();
    if(!user_search){
        alert("can't leave it blank")
    }else{
        find_song(user_search)
    }
})