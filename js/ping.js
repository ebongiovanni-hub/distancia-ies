(function(){
function crearPing(){
if(document.getElementById("pingFloat")) return;
const ping=document.createElement("div");
ping.id="pingFloat";
ping.className="ping-float";
ping.setAttribute("aria-hidden","true");
const img=document.createElement("img");
img.src="../imagenes/ping/ping-neutral.png";
img.alt="";
ping.appendChild(img);
document.body.appendChild(ping);
requestAnimationFrame(()=>requestAnimationFrame(()=>ping.classList.add("visible")));
}
function limpiarEstados(){
const ping=document.getElementById("pingFloat");
if(!ping) return;
ping.classList.remove("pensando","sorprendido","contento","celebrando");
}
function reaccion(){
const ping=document.getElementById("pingFloat");
if(!ping) return;
ping.classList.remove("reacciona");
void ping.offsetWidth;
ping.classList.add("reacciona");
}
function estado(nombre){
const ping=document.getElementById("pingFloat");
if(!ping) return;
limpiarEstados();
if(nombre) ping.classList.add(nombre);
reaccion();
}
window.PING={
neutral:function(){limpiarEstados();reaccion()},
pensando:function(){estado("pensando")},
sorprendido:function(){estado("sorprendido")},
contento:function(){estado("contento")},
celebrando:function(){estado("celebrando")},
reaccion:reaccion
};
if(document.readyState==="loading"){
document.addEventListener("DOMContentLoaded",crearPing);
}else{
crearPing();
}
})();
