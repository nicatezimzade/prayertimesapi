let searchBtn = document.querySelector("#get-button")
let long = document.querySelector("#long")
let lat = document.querySelector("#lat")
let selection = document.querySelector("#selection")
let year = document.querySelector("#year")
let table = document.querySelector("#schedule tbody")

let wrappersArray = [];

searchBtn.addEventListener("click", function () {
    
    if (wrappersArray.length!=0) {
        
        for (const item of wrappersArray) {
            item.innerHTML = "";
        }
        wrappersArray = [];
    }
    
    let monthVal = selection.selectedIndex;
    
    if (long.value == "" || lat.value == "" || monthVal == "" || year.value == "") {
        alert("Please fill the gaps")
        return;
    }
    
    
    if (year.value>10000) {
        alert("Year is too future")
        return;
    }
    
    getPrayerTimes(long.value, lat.value, monthVal, year.value)
    
})

function getPrayerTimes(longVal, latVal, monthVal, yearVal) {

    let prayerTimesReq = new XMLHttpRequest();
    
    prayerTimesReq.onload = function () {
        
        if (prayerTimesReq.status == 404) {
            alert("Something Wrong!");
            return;
        }
        
        let prayerTimesInfo = JSON.parse(prayerTimesReq.responseText);
        
        for (const item of prayerTimesInfo.data) {
            
            let wrapper = document.createElement("tr")

            wrappersArray.push(wrapper)
            
            let day = document.createElement("td")
            let fajr = document.createElement("td")
            let sunrise = document.createElement("td")
            let dhuhr = document.createElement("td")
            let asr = document.createElement("td")
            
            let sunset = document.createElement("td")
            let maghrib = document.createElement("td")
            let isha = document.createElement("td")
            let imsak = document.createElement("td")
            let midnight = document.createElement("td")
            
            day.innerText = item.date.gregorian.month.en + " " + item.date.gregorian.day
            fajr.innerText = item.timings.Fajr.slice(0, 5);
            sunrise.innerText = item.timings.Sunrise.slice(0, 5);
            dhuhr.innerText = item.timings.Dhuhr.slice(0, 5);
            asr.innerText = item.timings.Asr.slice(0, 5);

            sunset.innerText = item.timings.Sunset.slice(0, 5);
            maghrib.innerText = item.timings.Maghrib.slice(0, 5);
            isha.innerText = item.timings.Isha.slice(0, 5);
            imsak.innerText = item.timings.Imsak.slice(0, 5);
            midnight.innerText = item.timings.Midnight.slice(0, 5);

            wrapper.append(day)
            wrapper.append(fajr)
            wrapper.append(sunrise)
            wrapper.append(dhuhr)
            wrapper.append(asr)

            wrapper.append(sunset)
            wrapper.append(maghrib)
            wrapper.append(isha)
            wrapper.append(imsak)
            wrapper.append(midnight)

            table.append(wrapper)
        }
    }
    prayerTimesReq.open(
        "get",
        "http://api.aladhan.com/v1/calendar?latitude=" + latVal + "&longitude=" + longVal + "&method=2&month=" + monthVal + "&year=" + yearVal
    );
    prayerTimesReq.send()
}
