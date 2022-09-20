
let area= navigator.geolocation.getCurrentPosition(showPosition)
let select = document.getElementById('business')
let submit = document.getElementById('submit')
let value = select.options[select.selectedIndex].value
console.log(value)



//function for finding the location of the user
async function makeMap(){

    let areas = await showPosition()
    let map = L.map('map').setView(areas, 13);
    let marker = L.marker(areas).addTo(map).bindPopup("Your location").openPopup();

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 3,
        attribution: '© OpenStreetMap'
        }).addTo(map);

            let response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v3/places/search?&query=${value}&limit=10&ll=${areas}`,{
                    method: 'GET',
            		headers: { 
                    Accept: 'application/json',
            		Authorization: 'fsq3Irwxunp77ZsWt90Oq0vFC98MLlFsjAl2YXm8EPyPXcg='
                    }
            })
            let data = await response.json()



//function for finding the business
async function getBusiness() {


                    if(select.options[select.selectedIndex].value == 'coffee'){
                            data.results.forEach((item,index) =>{
                                L.marker([data.results[index].geocodes.main.latitude, data.results[index].geocodes.main.longitude]).addTo(map);
                            })
                    }

                    else if(select.options[select.selectedIndex].value == 'hotel'){
                        data.results.forEach((item,index) =>{
                            L.marker([data.results[index].geocodes.main.latitude, data.results[index].geocodes.main.longitude]).addTo(map) 
                        })
                    }

                    else if(select.options[select.selectedIndex].value == 'restaurant'){
                        data.results.forEach((item,index) =>{
                            L.marker([data.results[index].geocodes.main.latitude, data.results[index].geocodes.main.longitude]).addTo(map) 
                        })
                    }

                    else if(select.options[select.selectedIndex].value == 'market'){
                        data.results.forEach((item,index) =>{
                            L.marker([data.results[index].geocodes.main.latitude, data.results[index].geocodes.main.longitude]).addTo(map) 
                        })
                    }
                    }


submit.addEventListener('click',getBusiness())
            
}



document.addEventListener('DOMContentLoaded', makeMap)


//function to find the posiston
 async function showPosition() {
   let position = await new Promise((resolve,reject) =>{
    navigator.geolocation.getCurrentPosition(resolve, reject)

   });
   return [position.coords.latitude, position.coords.longitude]
  }



    






