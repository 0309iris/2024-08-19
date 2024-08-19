let cardRegion = document.querySelector('.card-region');
let card = document.querySelector('.card');

let nowCity;

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
        let startTime = wTime0.startTime;
        let endTime = wTime0.endTime;
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
    cardRegion.innerHTML +=
        `<div class="card">
    <h1>${city}</h1>
    <p>${cityData.startTime}<br>|<br>${cityData.endTime}</p>
    <p>${cityData.wx.parameterName}</p>
    <p>降雨機率${cityData.pop.parameterName}%</p>
    <p>${cityData.minT.parameterName}°C~${cityData.maxT.parameterName}°C</p>
    <p>${cityData.ci.parameterName} </p>
    </div>`;
};

const btnAll = document.querySelectorAll('button');

btnAll.forEach((btn, index)=>{
    btn.addEventListener('click',()=>{
        nowCity = cities[index];
        arrangeCities();
    });
});
