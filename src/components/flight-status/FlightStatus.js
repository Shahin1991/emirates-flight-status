import React, { Fragment, useState, useEffect } from 'react'
import FlightInput from '../flight-input/FlightInput'
import FlightStatusList from '../flight-status-list/FlightStatusList'
import * as FlightStatusRes from '../../mocks/flight-status-DXB-LHR.json';
import { Typography } from '@mui/material';

const FlightStatus = () => {
    const [depAirportCode, setdepAirportCode] = useState('DXB');
    const [arrAirportCode, setarrAirportCode] = useState('LHR');
    const [depDate, setdepDate] = useState('2022-03-19');
    const [airportList, setairportList] = useState([]);
    const [flightList, setflightList] = useState([])

    useEffect(() => {
        fetch('https://www.emirates.com/service/airports?lang=en')
            .then(res => res.json())
            .then(json => {
                const airportList = getFormattedAirportList(json.results);
                setairportList(airportList);
            })
        return () => {
        }
    }, [])

    // useEffect(() => {
    //     fetch('https://www.emirates.com/service/flight-status?departureDate=2022-03-17&origin=DXB&destination=LHR')
    //         .then(res => res.json())
    //         .then(json => {
    //             const flightList = json.results;
    //             setflightList(flightList);
    //         })
    //         .catch(err => {
    //             const flightListResponse = FlightStatusRes;
    //             const flightListResults = flightListResponse.results
    //             setflightList(flightListResults);
    //             // console.log(flightListResults);
    //         })
    //     return () => {
    //     }
    // }, [])

    const getFlightStatusInfo = ({ depAirport, arrAirport, depDate }) => {
        const flightStatusApiUrl = `https://www.emirates.com/service/flight-status?departureDate=${depDate}&origin=${depAirport}&destination=${arrAirport}`
        console.log(flightStatusApiUrl);
        fetch(flightStatusApiUrl)
            .then(json => {
                const flightList = json.results;
                setflightList(flightList);
            })
            .catch(err => {
                const flightListResponse = FlightStatusRes;
                const flightListResults = flightListResponse.results
                setflightList(flightListResults);
                // console.log(flightListResults);
            })
    }


    const getFormattedAirportList = (airportObject) => {
        const airportList = Object.keys(airportObject)
            .filter(airportKey => (airportObject[airportKey].stationType === '0'
                && airportObject[airportKey].isEK === 'Yes'))
            .map(airportKey => ({
                airportCode: airportKey,
                airportName: airportObject[airportKey].longName,
                airportShortName: airportObject[airportKey].shortName
            }))
        // console.log(airportList);
        return airportList;
    }


    return (<Fragment>
        {/* <div>FlightStatus</div> */}
        <Typography variant='h6'>Emirates</Typography>
        <Typography variant='h3'>Flight Status</Typography>
        {/* <Typography variant='h3'>H3 heading</Typography> */}

        {/* <Typography variant='h3'>H3 heading</Typography> */}
        <FlightInput
            airportList={airportList} 
            getFlightStatusInfo={getFlightStatusInfo}
            />
            {flightList&&flightList.length>0?(
                  <FlightStatusList
                  flightList={flightList}
                  airportList={airportList} />
            ):(
                <Typography variant="h4" component="div">
                    Please select a valid flight combination
                </Typography>
            )}
      
    </Fragment>

    )
}

export default FlightStatus