window.onload = () => {
    displayStores(stores);
    setOnClickListener();
}

var map;
var markers = [];
var infoWindow;

function initMap() {
    var losAngeles = {
        lat: 34.063380, 
        lng: -118.358080
    };
  
    map = new google.maps.Map(document.getElementById('map'), {
        center: losAngeles, 
        zoom: 11, 
        styles: [
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": 36
                    },
                    {
                        "color": "#333333"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#fefefe"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#fefefe"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dedede"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 29
                    },
                    {
                        "weight": 0.2
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e9e9e9"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#006341"
                    }
                ]
            }
        ]
    });
    infoWindow = new google.maps.InfoWindow();
    searchByZip();
}


function searchByZip(){
    var foundStores = []
    var input = document.getElementById('zipcode-input');
    var zip = document.getElementById('zipcode-input').value;
    if(zip){
        for(var store of stores){
            var postalCode = store['address']['postalCode'].substring(0, 5);
            if (zip == postalCode) {
                foundStores.push(store);
            }
        }
    } else {
        foundStores = stores;
    }
    input.addEventListener('keyup', function(event){
        if(event.keyCode === 13){
            event.preventDefault();
            document.querySelector('.fa-search').click();
        }
    })
    clearLocations();
    displayStores(foundStores);
    showMarkers(foundStores);
    setOnClickListener();
}

function clearLocations(){
    infoWindow.close();
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers.length = 0;
}

function setOnClickListener(){
    var storeElements = document.querySelectorAll('.store');
    storeElements.forEach(function(elem, index){
        elem.addEventListener('click', function(){
            new google.maps.event.trigger(markers[index], 'click');
        })
    })
}

function displayStores(stores) {
    var storesHtml = '';
    for(var [index, store] of stores.entries()){
        var address = store['addressLines'];
        var phone = store['phoneNumber'];
        storesHtml += `
        <div class="store">
        <div class="store-background">
            <div class="store-info">
                <div class="storeaddress">
                    <span>${address[0]}</span>
                    <span>${address[1]}</span>                    
                </div>
                <div class="storephone">
                    ${phone}
                </div>
            </div>
            <div class="store-number-container">                    
                <div class="store-number">
                    ${index+1} 
                </div>
            </div>
        </div>
        </div>
        `

        document.querySelector('.stores-list').innerHTML = storesHtml;
    }
}

function showMarkers(stores){
    var bounds = new google.maps.LatLngBounds();
    for(var [index, store] of stores.entries()){        
        var latlng = new google.maps.LatLng( //from api
            store["coordinates"]["latitude"],
            store["coordinates"]["longitude"]);
        var name = store["name"];
        var address = store["addressLines"][0];
        var phoneNumber = store["phoneNumber"];
        var openStatusText = store["openStatusText"];
    bounds.extend(latlng);

    createMarker(latlng, name, address, phoneNumber, openStatusText, index);
    }
    map.fitBounds(bounds);
}

function createMarker(latlng, name, address, phoneNumber, openStatusText, index) {
    var html = `
        <div class="store-info-window">
            <div class="store-info-name" style="font-weight: bold; margin-bottom: 1px">
                ${name}
            </div>
            <div class="store-info-status" style="margin-bottom: 5px; padding-bottom: 5px; border-bottom: 1px solid #E5E5E5;">
                ${openStatusText}
            </div>
            <div class="store-info-address" style="margin-bottom: 1px">
                ${address}
            </div>
            <div class="store-info-phone">
                ${phoneNumber}
            </div>
        </div>
    `;
    var marker = new google.maps.Marker({
        map: map,
        position: latlng, 
        label: (index+1).toString() 
    });
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    });
    markers.push(marker);
}

