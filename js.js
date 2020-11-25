"use strict"

const vieta = document.getElementById("vieta");
const mygtukasVisuSaliu = document.getElementById("visosSalys");
const mygtukasPaieskos = document.getElementById("button");
const mygtukasRegiono = document.getElementById("regionoMyg");


//VISU SALIU FETCH
const duomenuFunkcija = async () => {
    try {
        const gautiDuomenis = await fetch(`https://restcountries.eu/rest/v2/all`);
        const saliuDuomenys = await gautiDuomenis.json();
        // console.log(saliusDuomenys);

        saliuDuomenys.forEach(saliesVardas => {

            console.log(saliesVardas);
            // console.log(saliesVardas.name);
            // console.log(saliesVardas.flag);
            const saliesVieta = document.createElement("div");
            const foto = document.createElement("img");
            foto.src = saliesVardas.flag;
            foto.innerHTML = foto;
            const pavadinimas = document.createElement("h4");
            pavadinimas.innerHTML = saliesVardas.name;
            pavadinimas.style.textTransform = "uppercase";
            pavadinimas.style.textAlign = "center";
            const sostine=document.createElement("h5");
            sostine.innerHTML = `Capital: ${saliesVardas.capital}`;
            sostine.style.textAlign = "center";

            vieta.appendChild(saliesVieta);
            saliesVieta.appendChild(foto);
            saliesVieta.appendChild(pavadinimas);
            saliesVieta.appendChild(sostine);
        });

    } catch (klaida) {
        alert("Klaida! Neužkrauna duomenų!")
        console.log("Neužkrauna duomenų!");
    }
}

duomenuFunkcija();

mygtukasVisuSaliu.addEventListener("click", function (e) {
    duomenuFunkcija();
    isvalytiSalis();//isvalom HTML su funkcija - aprasyta pabaigoje
});

//PO MYGTUKO PASPAUDIMO VIENOS SALIES PAIESKA

const pradeti = async () => {

    const vestiPav = document.getElementById("ieskoti");
    // console.log('labas')
    // console.log(vestiPav.value)
    try {
        const duomenys = await fetch(`https://restcountries.eu/rest/v2/name/${vestiPav.value}`);
        const salys = await duomenys.json();
        console.log(salys);
        vieta.innerHTML = " "; // galima ir taip isvalyti po mygtuko paspaudimo, nebutinai per funkcija
        vestiPav.value ="";

        salys.forEach(salis => {

            console.log(salis.languages);
            console.log(salis.currencies);
            console.log("SALYS");
            // console.log(salis.name);;
            // const foto1 = document.getElementById("photo").src = salis.flag;
            // const pavadinimas1 = document.getElementById("pavadinimas").innerHTML = salis.name;
            const info = document.createElement("div");
            const foto1 = document.createElement("img");
            const vestiPav = document.createElement("h4");
            const sostine=document.createElement("h5");
            sostine.innerHTML = `Capital: ${salis.capital}`;
            sostine.style.textAlign = "center";

            vestiPav.innerHTML = salis.name;
            vestiPav.style.textTransform = "uppercase";
            vestiPav.style.textAlign = "center";
            foto1.src = salis.flag;
            foto1.innerHTML = foto1;
            foto1.style.marginLeft="auto";
            foto1.style.marginRight="auto";
            foto1.style.display="block";
            vieta.appendChild(info);
            info.appendChild(foto1);
            info.appendChild(vestiPav);
            info.appendChild(sostine);

            const kalbosDiv = document.createElement("div");
            kalbosDiv.style.display="flex";
            kalbosDiv.style.border="1px solid black";
            const kalbosVieta = document.createElement("ul");
            kalbosVieta.innerHTML = `Language:`;
            kalbosVieta.style.listStyleType = "none";
            kalbosVieta.style.fontWeight = "bold";
            info.appendChild(kalbosDiv);
            kalbosDiv.appendChild(kalbosVieta);

            const valiutosVieta = document.createElement("ul");
            valiutosVieta.innerHTML = `Currency:`;
            valiutosVieta.style.listStyleType = "none";
            valiutosVieta.style.fontWeight = "bold";
            info.appendChild(kalbosDiv);
            kalbosDiv.appendChild(valiutosVieta);


            for (let kalba in salis.languages) {
                console.log(salis.languages[kalba].name);
                const listKalbos = document.createElement("li");
                listKalbos.innerHTML = salis.languages[kalba].name;
                listKalbos.style.fontWeight = "normal";
                kalbosVieta.appendChild(listKalbos);
            }

            for (let valiuta in salis.currencies) {
                // console.log(`${salis.currencies[valiuta].code}, ${salis.currencies[valiuta].name}, ${salis.currencies[valiuta].symbol}`);
                const listValiutos = document.createElement("li");
                listValiutos.innerHTML = `${salis.currencies[valiuta].code}, ${salis.currencies[valiuta].name}, ${salis.currencies[valiuta].symbol}`;
                listValiutos.style.fontWeight = "normal";
                listValiutos.style.paddingRight="5px";
                valiutosVieta.appendChild(listValiutos);
            }
        });

    }catch (error) {
        console.log(error);
    }
};

mygtukasPaieskos.addEventListener("click", pradeti);

//FILTRAVIMAS PAGAL REGIONA

const rinktisRegiona = async () => {

    const regionoPasirinkimas = document.getElementById("regionas").value;

    try {
        const regionoDuomenys = await fetch(`https://restcountries.eu/rest/v2/region/${regionoPasirinkimas}`);
        const regionai = await regionoDuomenys.json();
        console.log(regionai);

        regionai.forEach(regionas => {

            console.log(regionas.name);
            console.log(regionas.flag);

            const regionoVieta = document.createElement("div");
            const foto3 = document.createElement("img");
            foto3.src = regionas.flag;
            foto3.innerHTML = foto3;

            const pavadinimas3 = document.createElement("h4");
            pavadinimas3.innerHTML = regionas.name;
            pavadinimas3.style.textTransform = "uppercase";
            pavadinimas3.style.textAlign = "center";

            const sostine1=document.createElement("h5");
            sostine1.innerHTML = `Capital: ${regionas.capital}`;
            sostine1.style.textAlign = "center";

            vieta.appendChild(regionoVieta);
            regionoVieta.appendChild(foto3);
            regionoVieta.appendChild(pavadinimas3);
            regionoVieta.appendChild(sostine1);
        });
    } catch (klaida) {
        console.log("Neužkrauna regiono!");
    }
};

mygtukasRegiono.addEventListener("click", function (event) {
    rinktisRegiona();
    isvalytiRegionus();
});

//HTML isvalymo funkcijos po mygtuko paspaudimo
function isvalytiRegionus() {
    document.getElementById("vieta").innerHTML = " ";
}
function isvalytiSalis() {
    document.getElementById("vieta").innerHTML = " ";
}





