# NZ Flight Map

The flight data is pulled in from the free API https://opensky-network.org/apidoc/, which provides data on planes actively flying around the world. 
 
The data comes back as an array full of arrays, and doesn't contain too much helpful information other than providing the latitude and longitude and callsign of the aircraft. The API is called every 10 seconds, and the response is put into global state, so the plane locations actively update on the map.
          
When a plane icon is clicked, the web scraper takes that planes callsign data, reformats it, and searches for the active flight data 
at https://www.flightstats.com/v2/. The response data is cleansed and then the relevant information is parsed into JSON format, and returned to the app to be displayed.

At this stage the scraper can find flight details for most major commercial airlines which operate within NZ airspace.  

### Application
                    
The application was built using React, Redux, Express, Node.js, Bootstrap, and the Google Maps API.

This app was made by Bas Suckling with help from Cass Guinut.

