const base_url= "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown= document.querySelectorAll(".drop select");
const btn= document.querySelector(".btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg=document.querySelector(".msg p")

for (let select of dropdown){
    for (currcode in ctryList){
        let newOpt= document.createElement("option");
        newOpt.innerText=currcode;
        newOpt.value= currcode;
        select.append(newOpt);
        if(select.name==="from" && currcode==="USD"){
            newOpt.selected="selected";
        }
        if(select.name==="to" && currcode==="INR"){
            newOpt.selected="selected";
        }
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateexchange= async()=>{    
    let amt=document.querySelector("input");
    let amtval=amt.value;
    if(amtval==="" || amtval<1){
        amtval=1;
        amt.value=1;
    }
    let fromcurr=fromCurr.value.toLowerCase();
    let tocurr= toCurr.value.toLowerCase();
    const url=`${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let resp= await fetch(url);
    let data= await resp.json();
    let rate= data[tocurr];
    let finalamt=Math.round(amtval*rate*100)/100;
    msg.innerText=`${amtval} ${fromCurr.value} = ${finalamt} ${toCurr.value}`;
}

const updateFlag=(element)=>{
    let currcode=element.value;
    let ctryCode=ctryList[currcode];
    newsrc=`https://flagsapi.com/${ctryCode}/flat/64.png`;
    let flag= element.parentElement.querySelector("img");
    flag.src= newsrc;
}

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateexchange();
});
window.addEventListener("load",updateexchange());