const cafeList= document.querySelector('#cafe-list');
const form =document.querySelector('#add-cafe-form');


//create element and render blog
function renderBlog(doc){
    let li=document.createElement('li');
    let title = document.createElement('span');
    let body = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id',doc.id);
    title.textContent=doc.data().title;
    body.textContent=doc.data().body;
    cross.textContent='x';

    li.appendChild(title);
    li.appendChild(body);
    li.appendChild(cross);
    cafeList.appendChild(li);   
    
    
    //deleting elements

    cross.addEventListener('click',(e)=>{
        e.stopPropagation();
        let id=e.target.parentElement.getAttribute('data-id');
        db.collection('blogs').doc(id).delete();
    })
}
//getting data
// db.collection("blogs").where('title','==','kalyan').orderBy('title').get().then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//         renderBlog(doc);
//     });
// });



//saving data

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    db.collection('blogs').add({
        title: form.title.value,
        body: form.body.value
    });
    form.title.value='';
    form.body.value='';
})

//real-time listener
db.collection('blogs').orderBy('title').onSnapshot(snapshot=>{
    let changes= snapshot.docChanges();
    changes.forEach(change=>{
        if(change.type =='added'){
            renderBlog(change.doc);
        }else if (change.type =='removed'){
            let li = cafeList.querySelector('[data-id='+change.doc.id+']');
            cafeList.removeChild(li);
        }
    })
})