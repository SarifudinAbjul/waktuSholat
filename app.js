
function prayerTimes(latitude, longitude){
    fetch('http://api.aladhan.com/v1/calendar?latitude='+latitude+'&longitude='+longitude+'&method=2')
    .then(response => response.json())
    .then(function(response){

        let date = new Date();
        let today = date.getDate()-1;
        let data = response.data[0].timings;


        let app = document.getElementById('app');
        let table = document.createElement('table');
        let tableTbody = document.createElement('tbody');
        
        for(i in data){

            let row = tableTbody.insertRow();
            let nama = row.insertCell(0);
            let time = row.insertCell(1);

            nama.innerHTML=i;
            time.innerHTML=data[i];
            tableTbody.appendChild(row);
        
        }

        table.appendChild(tableTbody);
        app.appendChild(table);


        
    });
}


function sucsses(position){

    prayerTimes(position.coords.latitude, position.coords.longitude);
    
}

function error(){

    // default menggunakan latitude dan longitude boroko
    prayerTimes('0.903648', '123.283401');

}



function userLocation(){

    if(!navigator.geolocation){
        alert('Golocation Tidak di Dukung di Browser Ini');
    }else{
        navigator.geolocation.getCurrentPosition(sucsses, error);
    }

}

function index() {
    
    let app = document.getElementById('app');
    let h3 = document.createElement('h3');
    h3.innerHTML = 'Waktu Sholat';
    app.appendChild(h3);

    userLocation();

}

index();