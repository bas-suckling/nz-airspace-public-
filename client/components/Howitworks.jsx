import React from "react"

export default function LandingPage() {

    return (
        <>
            <div className="container-fluid" id="howItWorks">
                <br></br>
                <h1>How it Works</h1>
                <br></br>
                <h2>Data Source</h2>
                <div className='paragraphs'>
                    <p>
                        The flight data is pulled in from the free API <strong >
                        <a className="externalLink" href="https://opensky-network.org/apidoc/">Opensky</a></strong>
                        , which provides data on planes actively flying around the world. The data comes back as an array full of arrays, 
                        and doesn't contain too much helpful information other than providing the latitude and longitude and callsign of the aircraft. 
                        The API is called every 10 seconds and the plane locations actively update on the map.
                    </p>
                    <p>
                        When a plane is clicked, the web scraper takes that planes callsign data, reformats it, and searches for the active flight data 
                        on <strong><a className="externalLink" href="https://www.flightstats.com/v2/">flightstats.com</a></strong>. The response data is
                         cleansed and then the relevant information is parsed into JSON format, and returned to the app to be displayed.
                    </p>
                    <p>
                        At this stage the scraper can find flight details for most major commercial airlines which operate within NZ airspace.  
                    </p>
                    <h2>Application</h2>
                    <p>
                        The application was built using React, Redux, Express, Node.js, Bootstrap, and the Google Maps API.
                    </p>
                    <p>
                        This app was made by Bas Suckling with help from Cass Guinut.
                    </p>
                </div>
            </div>
        </>
    )
}