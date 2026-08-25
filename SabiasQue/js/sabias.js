(function(){
"use strict";
const URL_REGISTRO="PEGAR_AQUI_URL_DEL_APPS_SCRIPT";
const inicio=Date.now();
let enviado=false;
function preparar(){
const bloque=document.querySelector(".sabias-pregunta");
if(!bloque)return;
const pagina=document.body.dataset.pagina||"";
const descripcion=document.body.dataset.descripcion||"";
const botones=bloque.querySelectorAll("[data-respuesta]");
const mensaje=bloque.querySelector(".sabias-respuesta-mensaje");
botones.forEach(function(boton){
boton.addEventListener("click",function(){
if(enviado)return;
enviado=true;
const respuesta=(boton.dataset.respuesta||"").toUpperCase();
const tiempo=Math.max(1,Math.round((Date.now()-inicio)/1000));
botones.forEach(function(btn){
btn.disabled=true;
btn.classList.remove("seleccionado");
});
boton.classList.add("seleccionado");
registrar(pagina,descripcion,respuesta,tiempo);
mostrarMensaje(respuesta,mensaje);
});
});
}
function registrar(pagina,descripcion,respuesta,tiempo){
if(!URL_REGISTRO||URL_REGISTRO.indexOf("PEGAR_AQUI")!==-1){
console.log("Registro pendiente de configurar:",{
pagina:pagina,
descripcion:descripcion,
respuesta:respuesta,
tiempo:tiempo
});
return;
}
const datos=new URLSearchParams();
datos.append("pagina",pagina);
datos.append("descripcion",descripcion);
datos.append("respuesta",respuesta);
datos.append("tiempoPagina",tiempo);
fetch(URL_REGISTRO,{
method:"POST",
mode:"no-cors",
headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
body:datos.toString()
}).catch(function(error){
console.error("No se pudo registrar la respuesta:",error);
});
}
function mostrarMensaje(respuesta,mensaje){
if(!mensaje)return;
if(respuesta==="SI"){
mensaje.innerHTML="<strong>¡Genial!</strong> Esta herramienta ya formaba parte de tus recursos. Quizás el próximo <em>¿Sabías que…</em> te sorprenda.";
}else{
mensaje.innerHTML="<strong>¡Buen descubrimiento!</strong> Esperamos que esta herramienta te ayude a hacer un poco más simple tu tarea cotidiana.";
}
mensaje.hidden=false;
mensaje.classList.add("visible");
const ping=document.querySelector(".sabias-ping");
if(ping){
ping.hidden=false;
requestAnimationFrame(function(){
ping.classList.add("visible");
});
}
}
if(document.readyState==="loading"){
document.addEventListener("DOMContentLoaded",preparar);
}else{
preparar();
}
})();
