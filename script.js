let base_code = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/'
let fromcurr = document.querySelector(".from select")
let tocurr = document.querySelector(".to select")
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button")
for(let select of dropdowns){
    for(currencycode in countryList){
        let opt = document.createElement("option");
        opt.innerText = currencycode;
        opt.value = currencycode;
        if(select.name ==="From"&& currencycode ==="USD"){
            opt.selected = "selected";
        }
        else if(select.name ==="To" && currencycode ==="INR"){
            opt.selected = "selected";
        }
        select.append(opt)

}
select.addEventListener("change",(evt)=>{
    getflag(evt.target)
})
}
const getflag = (element)=>{
    let curcode = element.value;
    let flagdata = countryList[curcode]
    let newsrc = `https://flagsapi.com/${flagdata}/flat/64.png`;
    let newimg = element.parentElement.querySelector("img")
    newimg.src = newsrc



}


btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount  = document.querySelector(".amount input")
    let amountvalue = amount.value
    if (amountvalue === "" || amountvalue <1){
        amountvalue = 1;
        amount.value = "1";
    }
   
    let url = `${base_code}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let get = await fetch(url);
    let data = await get.json()
    let rate = data[tocurr.value.toLowerCase()]
    let finaamt = rate*amountvalue
    let display = `${amountvalue} ${fromcurr.value} = ${finaamt} ${tocurr.value}`
    console.log(fromcurr.value);
    document.querySelector(".msg").innerText = display
    
    
})