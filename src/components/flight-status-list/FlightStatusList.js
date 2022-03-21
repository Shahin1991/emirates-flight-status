import React, { Fragment } from 'react'
import { Card, CardContent, Typography, Stack, Divider, Box, Chip } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import CircleIcon from '@mui/icons-material/Circle';

const FlightStatusList = ({ flightList, airportList }) => {

    const getAirportDisplayStringFromCode = (airportCode, airportList) => {
        const airportShortName = airportList
            && airportList
                .filter(airport => (airport.airportCode === airportCode))
                .map(airport => (`${airport.airportShortName} (${airport.airportCode})`));
        return airportShortName;
    }

    const getTimeStringFromDate = (dateString) => {
        const dateTime = new Date(dateString);
        return dateTime.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
    }

    const getDateStringFromDate = (dateString) => {
        const dateTime = new Date(dateString);
        const weekDay = dateTime.toLocaleString('en-US', {weekday:'short'});
        const day = dateTime.toLocaleString('en-US', {day:'2-digit'});
        const month = dateTime.toLocaleString('en-US', {month:'short'});
        return (`${weekDay} ${day} ${month}`);
    }

    const getStatusCodeColor = (statusCode) => (
        statusCode==='ARVD'?'#15700E':(statusCode==='PDEP'?'#305291':'#FFBF00')
    )

    const getStatusCodeText = (statusCode) => {
        let statusCodeText = 'Others'
        switch(statusCode) {
            case 'ARVD':
              statusCodeText= 'Arrived';
              break;
            case 'PDEP':
                statusCodeText= 'Delayed Departure';
              break;
            default:
                statusCodeText='Others'
          }
          return statusCodeText;
        }


    return (
        <Fragment>
            {flightList && flightList.length > 0 ? (
                flightList.map(flight => {
                    const {
                        airlineDesignator,
                        flightId,
                        flightNumber,
                        flightRoute: [{
                            originActualAirportCode,
                            destinationActualAirportCode,
                            statusCode,
                            departureTerminal,
                            arrivalTerminal,
                            departureTime: {
                                schedule: scheduleDeparture,
                                actual: actualDeparture,
                            },
                            arrivalTime: {
                                schedule: scheduleArrival,
                                actual: actualArrival,
                            },
                        }]
                    } = flight;
                    return (
                        <Stack
                            direction='column'
                            justifyContent='center'
                            alignItems='center'
                            spacing={2}
                            key={flightId}
                        >
                            <Card
                                sx={{
                                    margin: '5px 0px'
                                }}
                            >
                                <CardContent sx={{
                                    padding: '30px',
                                    minWidth: '75vw',
                                    maxWidth: '1100',
                                    display: { xs: 'none', md: 'block' }
                                }}>
                                    <Stack
                                        direction='row'
                                        justifyContent='center'
                                    >
                                        <Stack
                                            direction='column'
                                            alignItems='start'
                                            sx={{ padding: '0px 20px' }}
                                        >
                                            <Typography variant="body2" sx={{ fontSize: '0.875rem' }} component="div">
                                                {departureTerminal}
                                            </Typography>
                                            <Typography variant="subtitle1" component="div" sx={{ fontSize: '1.25rem' }}>
                                                {getAirportDisplayStringFromCode(originActualAirportCode, airportList)}
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontSize: '0.875rem' }} component="div">Departed:</Typography>
                                            <Typography variant="h3" component="div">
                                                {getTimeStringFromDate(actualDeparture)}
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontSize: '0.875rem' }} component="div">
                                                {getDateStringFromDate(actualDeparture)}
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontSize: '0.75rem', textAlign:'start' }} component="div">
                                                {`Scheduled Departure: ${getTimeStringFromDate(scheduleDeparture)}`}
                                            </Typography>
                                        </Stack>
                                        <Stack
                                            direction='row'
                                            alignItems='center'
                                            justifyContent='space-between'
                                            sx={{ width: '30%', position: 'relative' }}
                                        >
                                            <CircleIcon sx={{ transform: 'scale(0.5)', color: 'green' }}></CircleIcon>
                                            <Divider
                                                sx={{
                                                    width: '95%',
                                                    borderColor: 'green',
                                                    color: 'green', left: '10px',
                                                    borderWidth: '1px',
                                                    position: 'absolute',
                                                    backgroundColor: 'green'
                                                }}></Divider>
                                            <FlightIcon sx={{ transform: 'rotate(90deg)', color: 'green' }}></FlightIcon>
                                        </Stack>
                                        <Stack
                                            direction='column'
                                            alignItems='end'
                                            sx={{ padding: '0px 20px' }}
                                        >
                                            <Typography variant="body2" sx={{ fontSize: '0.875rem' }} component="div">
                                                {arrivalTerminal}
                                            </Typography>
                                            <Typography variant="subtitle1" component="div" sx={{ fontSize: '1.25rem' }}>
                                                {getAirportDisplayStringFromCode(destinationActualAirportCode, airportList)}
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontSize: '0.875rem' }} component="div">Arrived:</Typography>
                                            <Typography variant="h3" component="div">
                                                {getTimeStringFromDate(actualArrival)}
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontSize: '0.875rem' }} component="div">
                                                {getDateStringFromDate(actualArrival)}
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontSize: '0.75rem', textAlign:'start' }} component="div">
                                                {`Scheduled Arrival: ${getTimeStringFromDate(scheduleArrival)}`}
                                            </Typography>
                                        </Stack>
                                        <Box
                                            sx={{
                                                margin: '0px 10px 0px 10px'
                                            }}
                                        >
                                            <Divider
                                                orientation='vertical'
                                                sx={{
                                                    height: '100%',
                                                    backgroundImage: 'linear-gradient(0deg,#d8d8d8 60%,transparent 0)',
                                                    backgroundRepeat: 'repeat-y',
                                                    backgroundSize: '3px 10px',
                                                    borderColor: 'rgba(0, 0, 0, 0)'
                                                }}
                                            ></Divider>
                                        </Box>
                                        <Stack
                                            direction='column'
                                            justifyContent='space-evenly'
                                            alignItems='center'
                                            sx={{ padding: '0px 20px' }}
                                        >
                                            <Chip
                                                sx={{
                                                    borderRadius: '3px',
                                                    color: 'white',
                                                    backgroundColor: getStatusCodeColor(statusCode),
                                                    fontWeight: 'bold',
                                                    width:'150px'
                                                }}
                                                label={getStatusCodeText(statusCode)} />
                                            <Stack
                                                direction='row'>
                                                <Box
                                                    sx={{
                                                        width: '31px',
                                                        height: '26px'
                                                    }}
                                                >
                                                    <img
                                                        src='https://c.ekstatic.net/uiassets/tails/ek.svg'
                                                        alt='emirates-tailfin'
                                                        style={{ width: '100%' }} />
                                                </Box>
                                                <Typography variant="subtitle1" component="div" sx={{ fontSize: '1.25rem', paddingLeft: '16px' }}>
                                                    {`${airlineDesignator} ${flightNumber.substr(flightNumber.length - 3)}`}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </CardContent>
                                <CardContent sx={{
                                    padding: '30px',
                                    minWidth: '90vw',
                                    maxWidth: '1100',
                                    display: { xs: 'block', md: 'none' }
                                }}>
                                    <Stack
                                        direction='column'
                                        justifyContent='center'
                                        spacing={4}
                                    >
                                        <Stack
                                            direction='row'
                                            justifyContent='space-between'
                                            alignItems='center'
                                            sx={{ padding: '0px 20px' }}
                                        >
                                            <Stack
                                                direction='row'>
                                                <Box
                                                    sx={{
                                                        width: '31px',
                                                        height: '26px'
                                                    }}
                                                >
                                                    <img
                                                        src='https://c.ekstatic.net/uiassets/tails/ek.svg'
                                                        alt='emirates-tailfin'
                                                        style={{ width: '100%' }} />
                                                </Box>
                                                <Typography variant="subtitle1" component="div" sx={{ fontSize: '1.25rem', paddingLeft: '16px' }}>
                                                    {`${airlineDesignator} ${flightNumber.substr(flightNumber.length - 3)}`}
                                                </Typography>
                                            </Stack>
                                            <Chip
                                                sx={{
                                                    borderRadius: '3px',
                                                    color: 'white',
                                                    backgroundColor: getStatusCodeColor(statusCode),
                                                    fontWeight: 'bold',
                                                    width:'150px',
                                                }}
                                                label={getStatusCodeText(statusCode)} />
                                        </Stack>
                                        <Stack
                                            direction='row'
                                            alignItems='center'
                                            justifyContent='space-between'
                                            alignSelf='center'
                                            sx={{ width: '95%', position: 'relative' }}
                                        >
                                            <CircleIcon sx={{ transform: 'scale(0.5)', color: 'green' }}></CircleIcon>
                                            <Divider
                                                sx={{
                                                    width: '98%',
                                                    borderColor: 'green',
                                                    color: 'green', left: '10px',
                                                    borderWidth: '1px',
                                                    position: 'absolute',
                                                    backgroundColor: 'green'
                                                }}></Divider>
                                            <FlightIcon sx={{ transform: 'rotate(90deg)', color: 'green' }}></FlightIcon>
                                        </Stack>
                                        <Stack
                                            direction='row'
                                            justifyContent='space-between'
                                        >
                                            <Stack
                                                direction='column'
                                                alignItems='start'
                                                sx={{ padding: '0px 20px' }}
                                            >
                                                <Typography variant="body2" sx={{ fontSize: '0.875rem' }} component="div">
                                                    {departureTerminal}
                                                </Typography>
                                                <Typography variant="subtitle1" component="div" sx={{ fontSize: '1.25rem' }}>
                                                    {getAirportDisplayStringFromCode(originActualAirportCode, airportList)}
                                                </Typography>
                                                <Typography variant="body2" sx={{ fontSize: '0.875rem' }} component="div">
                                                    Departed:
                                                </Typography>
                                                <Typography variant="h3" component="div">
                                                    {getTimeStringFromDate(actualDeparture)}
                                                </Typography>
                                                <Typography variant="body2" sx={{ fontSize: '0.875rem' }} component="div">
                                                    {getDateStringFromDate(actualDeparture)}
                                                </Typography>
                                                <Typography variant="body2" sx={{ fontSize: '0.75rem', textAlign:'start' }} component="div">
                                                    {`Scheduled Departure: ${getTimeStringFromDate(scheduleDeparture)}`}
                                                </Typography>
                                            </Stack>
                                            <Stack
                                                direction='column'
                                                alignItems='end'
                                                sx={{ padding: '0px 20px' }}
                                            >
                                                <Typography variant="body2" sx={{ fontSize: '0.875rem' }} component="div">
                                                    {arrivalTerminal}
                                                </Typography>
                                                <Typography variant="subtitle1" component="div" sx={{ fontSize: '1.25rem' }}>
                                                    {getAirportDisplayStringFromCode(destinationActualAirportCode, airportList)}
                                                </Typography>
                                                <Typography variant="body2" sx={{ fontSize: '0.875rem' }} component="div">
                                                    Arrived:
                                                </Typography>
                                                <Typography variant="h3" component="div">
                                                    {getTimeStringFromDate(actualArrival)}
                                                </Typography>
                                                <Typography variant="body2" sx={{ fontSize: '0.875rem' }} component="div">
                                                    {getDateStringFromDate(actualArrival)}
                                                </Typography>
                                                <Typography variant="body2" sx={{ fontSize: '0.75rem', textAlign:'start' }} component="div">
                                                    {`Scheduled Arrival: ${getTimeStringFromDate(scheduleArrival)}`}
                                                </Typography>
                                            </Stack>
                                        </Stack>


                                    </Stack>
                                </CardContent>
                            </Card>
                        </Stack>
                    )
                })
            ) : (
                <Typography variant="h4" component="div">Please select a valid flight combination</Typography>
            )
            }
        </Fragment>
    )
}

export default FlightStatusList