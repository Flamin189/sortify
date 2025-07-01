let bars=document.querySelectorAll(".bar");
const rect=bars[0].getBoundingClientRect();
const rect1=bars[1].getBoundingClientRect();
let heights=[1,2,3,4,5,6,7];
let N=7;
let dir=1;
let color=0;
let r=document.querySelector(":root");
let rs=getComputedStyle(r);
const colorBut=document.getElementById("colorMode");
colorBut.addEventListener("click",()=>{
    if(color==0){
        r.style.setProperty("--bodyColor","black");
        r.style.setProperty("--containerColor","rgb(27, 27, 27)");
        r.style.setProperty("--barColor","white");
        color=1;
        document.getElementById("sun").style.display="block";
        document.getElementById("moon").style.display="none";
    }
    else{
        r.style.setProperty("--bodyColor","white");
        r.style.setProperty("--containerColor","rgb(223, 217, 217)");
        r.style.setProperty("--barColor","black");
        color=0;
        document.getElementById("sun").style.display="none";
        document.getElementById("moon").style.display="block";
    }
})
function toggle(){
    document.getElementById("toggle").innerHTML="";
    let img=document.createElement("img");
    if(dir==1){
        decr();
        img.src="forward.svg";
        dir=0;
    }
    else{
        incr();
        img.src="backward.svg";
        dir=1;
    }
    document.getElementById("toggle").appendChild(img);
}
function updateBars(n){
    let classBar=document.querySelector(".bars");
    classBar.innerHTML="";
    N=n;
    heights=new Array(N);
    if(N>315)classBar.style.gap="0";
    else classBar.style.gap="0.3%";
    let iniHeight=100/N;
    for(let i=1;i<=N;i++){
        heights[i-1]=i;
        const newComp=document.createElement("div");
        newComp.classList.add("bar");
        const newBar=document.createElement("div");
        newBar.classList.add("lvl");
        newBar.style.backgroundColor="var(--barColor)";
        newBar.style.height=`${iniHeight*i}%`
        newBar.style.width="100%";
        newComp.appendChild(newBar);
        classBar.appendChild(newComp);
        classBar.appendChild(document.createTextNode("\n    "));
    }
    dir=1;
}
function incr(){
    updateBars(parseInt(noOfBars.value));
}
function decr(){
    decrBars(parseInt(noOfBars.value));
}
function onInp(n){
    if(dir==1)updateBars(n);
    else decrBars(n);
}
function decrBars(n){
    let classBar=document.querySelector(".bars");
    classBar.innerHTML="";
    N=n;
    heights=new Array(N);
    if(N>315)classBar.style.gap="0";
    else classBar.style.gap="0.3%";
    let iniHeight=100/N;
    for(let i=N;i>=1;i--){
        heights[N-i]=i;
        const newComp=document.createElement("div");
        newComp.classList.add("bar");
        const newBar=document.createElement("div");
        newBar.classList.add("lvl");
        newBar.style.backgroundColor="var(--barColor)";
        newBar.style.height=`${iniHeight*i}%`
        newBar.style.width="100%";
        newComp.appendChild(newBar);
        classBar.appendChild(newComp);
        classBar.appendChild(document.createTextNode("\n    "));
    }
    dir=0;
}
async function swapVis(a,b,i,j){
    const rect1=a.getBoundingClientRect();
    const rect2=b.getBoundingClientRect();
    const offsetX=rect2.left-rect1.left;
    const offsetY=rect2.top-rect1.top;
    bars.forEach((bar)=>bar.style.transition=`transform .${time}s ease-in-out`);
    a.style.transform=`translate(${offsetX}px,${offsetY}px)`;
    b.style.transform=`translate(${-offsetX}px,${-offsetY}px)`;
    await new Promise(resolve => setTimeout((resolve), time));
    
    a.style.transform="none";
    b.style.transform="none";

    swapAct(a,b,i,j);
}
async function swapAct(a,b,i,j){
    const parent=a.parentNode;
    const nextSibling=(b.nextSibling===a.nextSibling)?b:b.nextSibling;
    parent.insertBefore(b,a);
    parent.insertBefore(a,nextSibling);
    let temp=heights[i];
    heights[i]=heights[j];
    heights[j]=temp;
    bars=document.querySelectorAll(".bar");
}
function getRandom(max){
    return Math.floor(Math.random()*max);
}
async function mix(){
    bars=document.querySelectorAll(".bar");
    const fixed=getRandom(N-1);
    const swapped= new Array(N).fill(false);
    swapped[fixed]=true;
    for(let i=0;i<Math.floor(N/2)-1;i++){
        let a=getRandom(N);
        while(swapped[a])a=getRandom(N-1);
        let b=getRandom(N);
        while(a==b || swapped[b])b=getRandom(N-1);
        swapped[a]=true;
        swapped[b]=true;
        await swapVis(bars[a],bars[b],a,b);
    }
}
function changeColor(bar,color){
    bar.querySelector(".lvl").style.backgroundColor=color;
}
const shufBut=document.getElementById("shuffle");
const sortBut=document.getElementById("sort");
const noOfBars=document.getElementById("noOfBars");
const timeEle=document.getElementById("time");
const sorts=document.getElementById("options");
const togBut=document.getElementById("toggle");
// const incsBut=document.getElementById("increment");
// const decBut=document.getElementById("decrement");

function add(){
    noOfBars.value=parseInt(noOfBars.value)+1;
    if(dir===1)updateBars(noOfBars.value);
    else decrBars(noOfBars.value);
}
function dec(){
    noOfBars.value=parseInt(noOfBars.value)-1;
    if(dir===1)updateBars(noOfBars.value);
    else decrBars(noOfBars.value);
}

function disableAll(){
    shufBut.disabled=true;
    sortBut.disabled=true;
    noOfBars.disabled=true;
    timeEle.disabled=true;
    sorts.disabled=true;
    togBut.disabled=true;
}
function enableAll(){
    shufBut.disabled=false;
    sortBut.disabled=false;
    noOfBars.disabled=false;
    timeEle.disabled=false;
    sorts.disabled=false;
    togBut.disabled=false;
}
let time;
shufBut.addEventListener("click",async()=>{
    disableAll();
    time=timeEle.value;
    await mix();
    enableAll();
    
});
sortBut.addEventListener("click",async()=>{
    disableAll();
    bars=document.querySelectorAll(".bar");
    const opt=document.getElementById("options").value;
    time=document.getElementById("time").value;
    if(opt==="1")await bubbleSort();
    else if(opt==="2")await insertionSort();
    else if(opt==="3") await selectionSort();
    else if(opt==="4"){
        await mergeSort(0,N-1);
        bars.forEach((bar)=>changeColor(bar,"green"));
        await new Promise(resolve=>setTimeout((resolve),500));
        bars.forEach((bar)=>changeColor(bar,"var(--barColor)"));
    }
    else if(opt=="5"){
        await quickSort(0,N-1);
        bars.forEach((bar)=>changeColor(bar,"green"));
        await new Promise(resolve=>setTimeout((resolve),500));
        bars.forEach((bar)=>changeColor(bar,"var(--barColor)"));
    }
    else if(opt=="6"){
        await heapSort();
        bars.forEach((bar)=>changeColor(bar,"green"));
        await new Promise(resolve=>setTimeout((resolve),500));
        bars.forEach((bar)=>changeColor(bar,"var(--barColor)"));
    }
    if(dir==0)toggle();
    enableAll();
});
async function bubbleSort(){
    let i,j;
    //let swapped;
    for(i=0;i<N;i++){
        //swapped=false;
        for(j=0;j<=(N-1)-i;j++){
            changeColor(bars[j],"blue");
            if(j!=(N-1)-i)bars[j+1].querySelector(".lvl").style.backgroundColor="blue";
            await new Promise(resolve=>setTimeout((resolve),time));
            if(heights[j]>heights[j+1]){
                await swapVis(bars[j],bars[j+1],j,j+1);
                swapped=true;
            }
            changeColor(bars[j],"var(--barColor)");
            if(j!=(N-1)-i)changeColor(bars[j+1],"var(--barColor)");
        }
        changeColor(bars[(N-1)-i],"green");
        //if(swapped==false)break;
    }
    await new Promise(resolve=>setTimeout((resolve),500));
    bars.forEach((bar)=>changeColor(bar,"var(--barColor)"));   
}
async function insertionSort(){
    bars=document.querySelectorAll(".bar");
    changeColor(bars[0],"green");
    for(let i=1;i<N;i++){
        let j=i-1;
        let bar=bars[i];
        changeColor(bar,"blue");
        await new Promise(resolve=>setTimeout((resolve),time));
        let curr=heights[i];
        while(j>=0 && heights[j]>curr){
            await swapVis(bars[j+1],bars[j],j+1,j);
            j--;
        }
        heights[j+1]=curr;
        //await swapVis(bars[j+1],bar,j+1,i);
        await new Promise(resolve=>setTimeout((resolve),time));
        changeColor(bar,"green");
    }
    await new Promise(resolve=>setTimeout((resolve),500));
    bars.forEach((bar)=>changeColor(bar,"var(--barColor)"));
}
async function selectionSort(){
    for(let i=0;i<(N-1);i++){
        let min=i;
        changeColor(bars[i],"grey");
        for(let j=i+1;j<N;j++){
            changeColor(bars[j],"blue");
            await new Promise(resolve=>setTimeout((resolve),time));
            if(heights[j]<heights[min]){
                if(min!=i)changeColor(bars[min],"var(--barColor)");
                changeColor(bars[j],"green");
                min=j;
            }
            else changeColor(bars[j],rs.getPropertyValue('--barColor'));
        }
        changeColor(bars[i],"var(--barColor)");
        //bars[k].forEach((bar)=>bar.querySelector(".lvl").style.backgroundColor="black");
        await swapVis(bars[min],bars[i],min,i);
        changeColor(bars[i],"green");
    }
    changeColor(bars[N-1],"green");
    await new Promise(resolve=>setTimeout((resolve),500));
    bars.forEach((bar)=>changeColor(bar,"var(--barColor)"));
}

async function mergeSort(l,r){
    if(l>=r)return;
    let m=Math.floor((l+r)/2);
    await mergeSort(l,m);
    await mergeSort(m+1,r);
    await merge(l,m,r);
}
async function merge(l,m,r){
    const n1=m-l+1;
    const n2=r-m;
    let left=new Array(n1);
    let right=new Array(n2);
    let leftBars=new Array(n1);
    let rightBars=new Array(n2);

    for(let i=0;i<n1;i++){
        left[i]=heights[l+i];
        leftBars[i]=bars[l+i];
    }
    for(let i=0;i<n2;i++){
        right[i]=heights[m+i+1];
        rightBars[i]=bars[m+i+1];
    }

    let i=0,j=0,k=l;
    while(i<n1 && j<n2){
        if(left[i]<right[j]){
            heights[k]=left[i];
            i++;
        }
        else{
            heights[k]=right[j];
            j++;
        }
        k++;
    }
    while(i<n1){
        heights[k]=left[i];
        i++;
        k++;
    }
    while(j<n2){
        heights[k]=right[j];
        j++;
        k++;
    }
    await changeBarsVis();
}
async function changeBarsVis(){
    for(let i=0;i<N;i++){
        bars[i].querySelector(".lvl").style.height=`${(100/N)*heights[i]}%`;
    }
    await new Promise(resolve=>setTimeout(resolve,`${time}`));
}
async function quickSort(l,r){
    if(l>=r)return;
    let pivot= await partition(l,r);
    await quickSort(l,pivot);
    await quickSort(pivot+1,r);
}
async function partition(l,r){
    let pivot=heights[l];
    let pivBar=bars[l];
    changeColor(bars[l],"blue");
    let i=l-1;
    let j=r+1;
    while(true){
        do{
            i++;
        }while(heights[i]<pivot);
        do{
            j--;
        }while(heights[j]>pivot);
        if(i>=j){
            changeColor(pivBar,"var(--barColor)");
            return(j);
        }
        await swapVis(bars[i],bars[j],i,j);
    }
}

async function heapify(n,i) {
    let largest=i;
    let l=2*i+1; 
    let r=2*i+2; 
    if (l<n && heights[l]>heights[largest]) {
        largest=l;
    }
    if (r<n && heights[r]>heights[largest]) {
        largest=r;
    }
    if (largest!==i) {
        await swapVis(bars[i],bars[largest],i,largest);
        await heapify(n,largest);
    }
}
async function heapSort() {
    for (let i=Math.floor(N/2)-1;i>=0;i--) {
        await heapify(N,i);
    }
    for (let i=N-1;i>0;i--) {
        let bar=bars[0];
        let barBlue=bars[i];
        changeColor(barBlue,"blue");
        await swapVis(bars[i],bars[0],i,0);
        changeColor(bar,"green");
        await heapify(i, 0);
        changeColor(barBlue,"var(--barColor)");
    }
}
