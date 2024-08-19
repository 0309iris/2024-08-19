let cardRegion = document.querySelector('.card-region');
let card = document.querySelector('.card');


const everyBtn = document.querySelector('.all-city');
const northBtn = document.querySelector('.north-city');
const midBtn = document.querySelector('.mid-city');
const southBtn = document.querySelector('.south-city');
const eastBtn = document.querySelector('.east-city');
const outBtn = document.querySelector('.out-city');
const every2Btn = document.querySelector('.menu .all-city');
const north2Btn = document.querySelector('.menu .north-city');
const mid2Btn = document.querySelector('.menu .mid-city');
const south2Btn = document.querySelector('.menu .south-city');
const east2Btn = document.querySelector('.menu .east-city');
const out2Btn = document.querySelector('.menu .out-city');

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
        let startTime = wTime0.startTime.substr(5, 11).replaceAll('-', '/');
        let endTime = wTime0.endTime.substr(5, 11).replaceAll('-', '/');
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

// 新的 weatherIcons 對象
const weatherIcons = {
    '1': 'https://i.postimg.cc/52Yz3b1d/1.png',
    '2': 'https://i.postimg.cc/sfH99nSW/2.png',
    '3': 'https://i.postimg.cc/sfH99nSW/2.png',
    '4': 'https://i.postimg.cc/sfH99nSW/2.png',
    '5': 'https://i.postimg.cc/L5bzk5rZ/5.png',
    '6': 'https://i.postimg.cc/L5bzk5rZ/5.png',
    '7': 'https://i.postimg.cc/1XsRz1Mn/7.png',
    '8': 'https://i.postimg.cc/CLv89cLH/8.png',
    '9': 'https://i.postimg.cc/CLv89cLH/8.png',
    '10': 'https://i.postimg.cc/CLv89cLH/8.png',
    '11': 'https://i.postimg.cc/CLv89cLH/8.png',
    '12': 'https://i.postimg.cc/CLv89cLH/8.png',
    '13': 'https://i.postimg.cc/CLv89cLH/8.png',
    '14': 'https://i.postimg.cc/CLv89cLH/8.png',
    '15': 'https://i.postimg.cc/hvJ1kxxM/22.png',
    '16': 'https://i.postimg.cc/9M9G1VjN/21.png',
    '17': 'https://i.postimg.cc/9M9G1VjN/21.png',
    '18': 'https://i.postimg.cc/9M9G1VjN/21.png',
    '19': 'https://i.postimg.cc/wT47tPCt/20.png',
    '20': 'https://i.postimg.cc/wT47tPCt/20.png',
    '21': 'https://i.postimg.cc/9M9G1VjN/21.png',
    '22': 'https://i.postimg.cc/9M9G1VjN/21.png',

    // 其他條件省略...
};

// 更新圖片函數
function updateWeatherIcon(element, weatherCondition) {
    const weatherIcon = weatherIcons[weatherCondition] || weatherIcons['7'];
    element.src = weatherIcon;
}

function showOneCard(city, cityData) {
    let weatherCondition = cityData.wx.parameterValue; // 天氣條件
    let startTime = cityData.startTime;
    let endTime = cityData.endTime;
    let pop = cityData.pop.parameterName;
    let minT = cityData.minT.parameterName;
    let maxT = cityData.maxT.parameterName;
    let ci = cityData.ci.parameterName;

    // 插入卡片 HTML
    cardRegion.innerHTML += `
        <div class="card" data-aos="flip-left" data-aos-duration="2000">
            <h1>${city}</h1>
            <img src="" data-weather="${weatherCondition}" class="weather-icon">
            <p>${startTime} ~ ${endTime}</p>
            <p>${cityData.wx.parameterName}</p>
            <p><i class="fa-solid fa-cloud-rain"></i> 降雨機率 ${pop}%</p>
            <p>${minT}°C ~ ${maxT}°C</p>
            <p>${ci}</p>
            <div class="box"></div>
        </div>
  
    `;

    // 動態設置圖片
    const lastInsertedImg = cardRegion.querySelector('.card:last-child .weather-icon');
    updateWeatherIcon(lastInsertedImg, weatherCondition);
}


everyBtn.addEventListener('click', (event) => {
    event.preventDefault();
    cardRegion.innerHTML = '';
    arrangeCities();
});

every2Btn.addEventListener('click', (event) => {
    event.preventDefault();
    cardRegion.innerHTML = '';
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

northBtn.addEventListener('click', (event) => {
    event.preventDefault();
    cardRegion.innerHTML = '';
    northCities();
});

north2Btn.addEventListener('click', (event) => {
    event.preventDefault();
    cardRegion.innerHTML = '';
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

midBtn.addEventListener('click', () => {
    cardRegion.innerHTML = '';
    midCities();
});
mid2Btn.addEventListener('click', () => {
    cardRegion.innerHTML = '';
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

southBtn.addEventListener('click', () => {
    cardRegion.innerHTML = '';
    southCities();
});
south2Btn.addEventListener('click', () => {
    cardRegion.innerHTML = '';
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

eastBtn.addEventListener('click', () => {
    cardRegion.innerHTML = '';
    eastCities();
});
east2Btn.addEventListener('click', () => {
    cardRegion.innerHTML = '';
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

outBtn.addEventListener('click', () => {
    cardRegion.innerHTML = '';
    outCities();
});
out2Btn.addEventListener('click', () => {
    cardRegion.innerHTML = '';
    outCities();
});
