let cardRegion = document.querySelector('.card-region');
let card = document.querySelector('.card');


const everyBtn =document.querySelector ('.all-city');
const northBtn =document.querySelector ('.north-city');
const midBtn =document.querySelector ('.mid-city');
const southBtn =document.querySelector ('.south-city');
const eastBtn =document.querySelector ('.east-city');
const outBtn =document.querySelector ('.out-city');
const every2Btn =document.querySelector ('.menu .all-city');
const north2Btn =document.querySelector ('.menu .north-city');
const mid2Btn =document.querySelector ('.menu .mid-city');
const south2Btn =document.querySelector ('.menu .south-city');
const east2Btn =document.querySelector ('.menu .east-city');
const out2Btn =document.querySelector ('.menu .out-city');

const nowTime = document.querySelector('.time');

setInterval(getTime, 1000);

function getTime() {
    const date = new Date();
    nowTime.textContent = date.toLocaleString();
};


cardRegion.innerHTML = '';
let cities = [
    ['臺北市', '新北市', '基隆市', '桃園市', '新竹市', '新竹縣', '宜蘭縣', '苗栗縣', '臺中市', '彰化縣', '南投縣', '雲林縣', '嘉義縣', '嘉義市', '臺南市', '高雄市', '屏東縣', '花蓮縣', '臺東縣', '連江縣', '澎湖縣', '金門縣'],
    ['臺北市', '新北市', '基隆市', '桃園市', '新竹市', '新竹縣', '宜蘭縣'],
    ['苗栗縣', '臺中市', '彰化縣', '南投縣', '雲林縣'],
    ['嘉義縣', '嘉義市', '臺南市', '高雄市', '屏東縣'],
    ['花蓮縣', '臺東縣'],
    ['連江縣', '澎湖縣', '金門縣']
];

let nowCity;

const url = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-024A4441-2B61-40A4-924B-A2A7A3E4A5A9&format=JSON';

let orgData = {};
fetchData();

function fetchData() {
    //fetch取 :url的資料
    fetch(url)
        //.then 等對方回應
        .then(function (response) {
            //回傳json格式的資料
            return response.json();
        })
        //.then 接收資料
        .then(function (dataAll) {
            console.log(dataAll);

            //整理資料
            organizationData(dataAll);

            //顯示卡片
            arrangeCities();
        });
};

function organizationData(dataAll) {
    const locAll = dataAll.records.location;
    locAll.forEach((location, index) => {
        let locationName = location.locationName;
        let wTime0 = location.weatherElement[0].time[0];
        let wx = wTime0.parameter;
        let pop = location.weatherElement[1].time[0].parameter;
        let minT = location.weatherElement[2].time[0].parameter;
        let ci = location.weatherElement[3].time[0].parameter;
        let maxT = location.weatherElement[4].time[0].parameter;
                                         //從0開始取字串.將所有-換成/
        let startTime = wTime0.startTime.substr(5,11).replaceAll('-','/');
        let endTime = wTime0.endTime.substr(5,11).replaceAll('-','/');
        orgData[locationName] = {
            'wx': wx,
            'startTime': startTime,
            'endTime': endTime,
            'pop': pop,
            'minT': minT,
            'ci': ci,
            'maxT': maxT
        };
    });
    console.log(orgData);
};


function arrangeCities() {
    nowCity = cities[0];
    nowCity.forEach((city, index) => {
        cityData = orgData[city];
        // console.log(cityData);
        showOneCard(city, cityData);
    });
};

function showOneCard(city, cityData) {
    let weatherIcon;
    // console.log(cityData.wx.parameterValue);

    if(cityData.wx.parameterValue === '1'){
        weatherIcon = './weather-img/1.gif';
    }else if(cityData.wx.parameterValue === '2'){
        weatherIcon = './weather-img/2.gif';
    }else if(cityData.wx.parameterValue === '3'){
        weatherIcon = './weather-img/3.gif';
    }else if(cityData.wx.parameterValue === '4'){
        weatherIcon = './weather-img/4.gif';
    }else if(cityData.wx.parameterValue === '5'){
        weatherIcon = './weather-img/5.gif';
    }else if(cityData.wx.parameterValue === '6'){
        weatherIcon = './weather-img/6.gif';
    }else if(cityData.wx.parameterValue === '7'){
        weatherIcon = './weather-img/7.gif';
    }else if(cityData.wx.parameterValue === '8'){
        weatherIcon = './weather-img/8.gif';
    }else if(cityData.wx.parameterValue === '9' || cityData.wx.parameterValue === '12'){
        weatherIcon = './weather-img/9-12.gif';
    }else if(cityData.wx.parameterValue === '10' || cityData.wx.parameterValue === '13'){
        weatherIcon = './weather-img/10-13.gif';
    }else if(cityData.wx.parameterValue === '11' || cityData.wx.parameterValue === '14'){
        weatherIcon = './weather-img/11-14.gif';
    }else if(cityData.wx.parameterValue === '15'){
        weatherIcon = './weather-img/15.gif';
    }else if(cityData.wx.parameterValue === '16'){
        weatherIcon = './weather-img/16.gif';
    }else if(cityData.wx.parameterValue === '17'){
        weatherIcon = './weather-img/17.gif';
    }else if(cityData.wx.parameterValue === '18'){
        weatherIcon = './weather-img/18.gif';
    }else if(cityData.wx.parameterValue === '19'){
        weatherIcon = './weather-img/19.gif';
    }else if(cityData.wx.parameterValue === '20'){
        weatherIcon = './weather-img/20.gif';
    }else if(cityData.wx.parameterValue === '21'){
        weatherIcon = './weather-img/21.gif';
    }else if(cityData.wx.parameterValue === '22'){
        weatherIcon = './weather-img/22.gif';
    }else{
        weatherIcon = './weather-img/7.gif';
    }


    cardRegion.innerHTML +=
        `<div class="card" data-aos="flip-left" ata-aos-duration="2000">
    <h1>${city}</h1>
    <img src="${weatherIcon}" class="weather-icon">
    <p>${cityData.startTime}~${cityData.endTime}</p>
    <p>${cityData.wx.parameterName}</p>
    <p><i class="fa-solid fa-cloud-rain"></i>降雨機率&nbsp${cityData.pop.parameterName}%</p>
    <p>${cityData.minT.parameterName}°C~${cityData.maxT.parameterName}°C</p>
    <p>${cityData.ci.parameterName} </p>
    </div>`;
};

everyBtn.addEventListener('click',()=>{
    cardRegion.innerHTML ='';
    arrangeCities();
});
every2Btn.addEventListener('click',()=>{
    cardRegion.innerHTML ='';
    arrangeCities();
});

//======

function northCities() {
    nowCity = cities[1];
    nowCity.forEach((city, index) => {
        cityData = orgData[city];
        showOneCard(city, cityData);
    });
};

northBtn.addEventListener('click',()=>{
    nowCity = cities[1];
    cardRegion.innerHTML ='';
    northCities();
});
north2Btn.addEventListener('click',()=>{
    nowCity = cities[1];
    cardRegion.innerHTML ='';
    northCities();
});

//======

function midCities() {
    nowCity = cities[2];
    nowCity.forEach((city, index) => {
        cityData = orgData[city];
        showOneCard(city, cityData);
    });
};

midBtn.addEventListener('click',()=>{
    cardRegion.innerHTML ='';
    midCities();
});
mid2Btn.addEventListener('click',()=>{
    cardRegion.innerHTML ='';
    midCities();
});

//======

function southCities() {
    nowCity = cities[3];
    nowCity.forEach((city, index) => {
        cityData = orgData[city];
        showOneCard(city, cityData);
    });
};

southBtn.addEventListener('click',()=>{
    cardRegion.innerHTML ='';
    southCities();
});
south2Btn.addEventListener('click',()=>{
    cardRegion.innerHTML ='';
    southCities();
});

//======

function eastCities() {
    nowCity = cities[4];
    nowCity.forEach((city, index) => {
        cityData = orgData[city];
        showOneCard(city, cityData);
    });
};

eastBtn.addEventListener('click',()=>{
    cardRegion.innerHTML ='';
    eastCities();
});
east2Btn.addEventListener('click',()=>{
    cardRegion.innerHTML ='';
    eastCities();
});

//======

function outCities() {
    nowCity = cities[5];
    nowCity.forEach((city, index) => {
        cityData = orgData[city];
        showOneCard(city, cityData);
    });
};

outBtn.addEventListener('click',()=>{
    cardRegion.innerHTML ='';
    outCities();
});
out2Btn.addEventListener('click',()=>{
    cardRegion.innerHTML ='';
    outCities();
});
