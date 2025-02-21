let body=document.querySelector('body');
body.addEventListener('mousemove',function(e){
   const x=e.clientX;
   const y=e.clientY;
   const span=document.createElement('span');
   span.style.left=x+'px';
   span.style.top=y+'px';
   let size=Math.random()*100;
    span.style.width=size+'px';
    span.style.height=size+'px';
    body.appendChild(span);
    setTimeout(()=>{
        span.remove();
    },3000);
});
