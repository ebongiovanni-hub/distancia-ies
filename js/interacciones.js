document.addEventListener("DOMContentLoaded",()=>{
  document.querySelectorAll("[data-interaction='checklist']").forEach(grupo=>{
    const selector=grupo.dataset.items||".interactive-item";
    const claseActiva=grupo.dataset.activeClass||"active";
    const items=[...grupo.querySelectorAll(selector)];
    const count=document.getElementById(grupo.dataset.count);
    const bar=document.getElementById(grupo.dataset.bar);
    const feedback=document.getElementById(grupo.dataset.feedback);
    const unidad=grupo.dataset.unit||"acciones realizadas";
    const messages=[
      grupo.dataset.msg0||"",
      grupo.dataset.msg1||"",
      grupo.dataset.msg2||"",
      grupo.dataset.msg3||"",
      grupo.dataset.msg4||""
    ];
    function update(){
      const selected=items.filter(item=>item.classList.contains(claseActiva)).length;
      if(count) count.textContent=`${selected} de ${items.length} ${unidad}`;
      if(bar) bar.style.width=`${Math.round(selected/items.length*100)}%`;
      if(feedback&&messages[selected]) feedback.textContent=messages[selected];
    }
    items.forEach(item=>{
      function toggle(){
        item.classList.toggle(claseActiva);
        update();
      }
      item.addEventListener("click",toggle);
      item.addEventListener("keydown",event=>{
        if(event.key==="Enter"||event.key===" "){
          event.preventDefault();
          toggle();
        }
      });
    });
    update();
  });
});
