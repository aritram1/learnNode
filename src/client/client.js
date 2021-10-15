fetch('http://localhost:3000/abc/pbf?id=123&id1=rt')
.then(res=>{
    return res.json();
})
.then(data=>{
    document.write('<ul>');
    for(key in data){
        document.write(`<li>${key} - ${data[key]}</li>`);
    }
    document.write('</ul>');
});