
gsap.to('#loader',{opacity:0,duration:1.2,delay:1.5,onComplete:()=>loader.remove()});
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray('section').forEach(s=>{
gsap.from(s,{opacity:0,y:80,duration:1,scrollTrigger:s});
});
themeToggle.onclick=()=>document.body.classList.toggle('light');

const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000);
const renderer=new THREE.WebGLRenderer({canvas:bg,alpha:true});
renderer.setSize(innerWidth,innerHeight);
const geo=new THREE.BufferGeometry();
const verts=[];
for(let i=0;i<2500;i++){verts.push((Math.random()-0.5)*1200,(Math.random()-0.5)*1200,(Math.random()-0.5)*1200)}
geo.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));
const pts=new THREE.Points(geo,new THREE.PointsMaterial({size:2}));
scene.add(pts);
camera.position.z=400;
function animate(){requestAnimationFrame(animate);pts.rotation.y+=0.0005;renderer.render(scene,camera)}
animate();
