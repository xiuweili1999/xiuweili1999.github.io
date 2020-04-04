const mymap = L.map("mapid").setView([39.001383, -76.907276], 10);
      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken:
            "pk.eyJ1IjoibGk0MTA5ODU3MjUiLCJhIjoiY2s4bDlrb3QwMDF1djNnbjFzenhkajdkYyJ9.tiNJ7UHUI0RiIgt_iaRIJg",
        }
      ).addTo(mymap);

      const customStyle = {
        maxWidth: "500",
        className: "custom",
      };

      const marker = L.marker([38.986169, -76.945122])
        .bindPopup("<b>McKeldin Library</b><br>UMD Library", customStyle)
        .addTo(mymap);

      fetch("https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json")
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          let numberLst = [];
          while (numberLst.length < 3){
            const randomNumber = jsonData[Math.floor(Math.random() * jsonData.length)];

            if(numberLst.includes(randomNumber)){
              const randomNumber = jsonData[Math.floor(Math.random() * jsonData.length)];
            }
            else{
              if(randomNumber.hasOwnProperty("geocoded_column_1")){
              numberLst.push(randomNumber);
              }
            }
          }
          for (let i = 0; i < numberLst.length; i++) {
            const loc = numberLst[i].geocoded_column_1.coordinates.reverse();
            jsonData.push(numberLst[i]);

            const mark = L.marker(loc).bindPopup('<strong>' + numberLst[i].name + '</strong>' + '<br>' + 'Type: ' + numberLst[i].type + '<br>' + 'Category: ' + numberLst[i].category + '<br>' + 'Address: ' + numberLst[i].address_line_1 + '' + numberLst[i].address_line_2 + ' ' + numberLst[i].city + ' ' + numberLst[i].state + ' ' + numberLst[i].zip + '<br>' + 'Inspection Type: ' + numberLst[i].inspection_type + '<br>'+ 'Inspection Result: ' + numberLst[i].inspection_results , customStyle).addTo(mymap);
          }
        });

