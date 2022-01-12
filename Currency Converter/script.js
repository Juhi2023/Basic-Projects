const CurrencyApi={
    url:"https://v6.exchangerate-api.com/v6/",
    key: API_KEY
}
let select1 = document.getElementById('select1');
let select2 = document.getElementById('select2');
let input1 = document.getElementById('input1');
let input2 = document.getElementById('input2');
let swap = document.getElementById('swap');
let flag1 =document.getElementById('flag1');
let flag2 =document.getElementById('flag2');
let con = document.getElementById('conclusion');
select1.addEventListener('change', calculate);
select2.addEventListener('change', calculate);
input1.addEventListener('input', calculate);
input2.addEventListener('input', calculate2);
swap.addEventListener('click', swapping);

document.addEventListener('DOMContentLoaded', async ()=>{

    let data = await requestApi('code');
    let allcodes=data.supported_codes;
    let codeOptions ="";

    if(allcodes)
    {
        allcodes.forEach(code => {
            codeOptions += `<option value="${code[0]}"> ${code[0]} </option>`
        });
    }
    select1.innerHTML=codeOptions;
    select2.innerHTML=codeOptions;
    calculate();
});

async function requestApi(word)
{
    let api;
    if(word=='code')
        api=`${CurrencyApi.url}${CurrencyApi.key}/codes`;
    else
        api=`${CurrencyApi.url}${CurrencyApi.key}/latest/${word}`;
    let response= await fetch(api);
    let data = await response.json();
    return data;
}

async function calculate()
{
    currency1= select1.value;
    currency2= select2.value;
    let data = await requestApi(`${currency1}`);
    console.log(data)
    let value1 = input1.value;
    let rate = data.conversion_rates[currency2];
    input2.value= (rate*value1).toFixed(3);
    con.innerText= `1 ${currency1} = ${rate.toFixed(3)} ${currency2}`;
    
    let f1 = select1.value.substr(0,2).toLowerCase();
    flag1.src=`https://flagcdn.com/w40/${f1}.png`
    let f2 = select2.value.substr(0,2).toLowerCase();
    flag2.src=`https://flagcdn.com/w40/${f2}.png`
}

async function calculate2()
{
    currency1= select1.value;
    currency2= select2.value;
    let data = await requestApi(`${currency2}`);
    console.log(data)
    let value2 = input2.value;
    let rate = data.conversion_rates[currency1];
    input1.value= (rate*value2).toFixed(3);
    con.innerText= `1 ${currency1} = ${rate} ${currency2}`;
}

function swapping()
{
    const temp = select2.value;
    select2.value = select1.value;
    select1.value = temp;
    calculate();
}