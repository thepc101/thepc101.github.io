
gsap.to("#loader",{opacity:0,duration:1,delay:1.5,onComplete:()=>document.getElementById("loader").remove()});
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray("section").forEach(s=>{
 gsap.from(s,{y:80,opacity:0,duration:1,scrollTrigger:s});
});

document.getElementById("themeToggle").onclick=()=>document.body.classList.toggle("light");

document.querySelectorAll(".magnetic").forEach(btn=>{
 btn.addEventListener("mousemove",e=>{
  const r=btn.getBoundingClientRect();
  btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*0.2}px,${(e.clientY-r.top-r.height/2)*0.2}px)`;
 });
 btn.addEventListener("mouseleave",()=>btn.style.transform="translate(0,0)");
});

const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000);
const renderer=new THREE.WebGLRenderer({canvas:document.getElementById("bg"),alpha:true});
renderer.setSize(innerWidth,innerHeight);
const g=new THREE.BufferGeometry();
const v=[];
for(let i=0;i<2000;i++){v.push((Math.random()-0.5)*1000,(Math.random()-0.5)*1000,(Math.random()-0.5)*1000);}
g.setAttribute('position',new THREE.Float32BufferAttribute(v,3));
const p=new THREE.Points(g,new THREE.PointsMaterial({size:2}));
scene.add(p);
camera.position.z=300;
function animate(){requestAnimationFrame(animate);p.rotation.y+=0.0008;renderer.render(scene,camera)}
animate();
