import React, { Fragment, useState, useEffect } from 'react'
import { Autocomplete, TextField, Box, MenuItem, Stack, Button, LoadingButton } from '@mui/material';

const FlightInput = ({ airportList, getFlightStatusInfo }) => {

    const [depAirportVal, setDepAirportVal] = useState(null);
    const [depAirportInpVal, setDepAirportInpVal] = useState('');

    const [arrAirportVal, setArrAirportVal] = useState(null);
    const [arrAirportInpVal, setArrAirportInpVal] = useState('');

    const [depDate, setdepDate] = useState('');

    // const [loading, setLoading] = React.useState(true);
    // function handleClick() {
    //   setLoading(true);
    // }

    const handleViewDetailsClick = () => {
        const depAirportCode = depAirportVal.id;
        const arrAirportCode = arrAirportVal.id;

        getFlightStatusInfo({
            depAirport:depAirportCode,
            arrAirport:arrAirportCode,
            depDate:depDate,
        });
    }

    const getDateList = () => {
        const today = new Date();
        const yesterday = new Date(today);
        const tomorrow = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        tomorrow.setDate(tomorrow.getDate() + 1);

        return [
            {
                dateLabel: `Yesterday, ${getFormattedDate(yesterday).dateLabel}`,
                dateValue: getFormattedDate(yesterday).dateValue,
            },
            {
                dateLabel: `Today, ${getFormattedDate(today).dateLabel}`,
                dateValue: getFormattedDate(today).dateValue,
            },
            {
                dateLabel: `Tomorrow, ${getFormattedDate(tomorrow).dateLabel}`,
                dateValue: getFormattedDate(tomorrow).dateValue,
            },
        ]
    }

    const getFormattedDate = (dateObject) => {
        const yyyy = dateObject.getFullYear();
        let mm = dateObject.getMonth() + 1;
        let dd = dateObject.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        const dateLabel = `${dd}-${mm}-${yyyy}`;
        const dateValue = `${yyyy}-${mm}-${dd}`;

        return { dateLabel, dateValue };
    }

    const formattedAirportList = airportList.map(airport => (
        {
            id: airport.airportCode,
            label: `${airport.airportName} (${airport.airportCode})`
        }
    ))
    const dateList = getDateList();


    const handleDepDateChange = (event) => {
        setdepDate(event.target.value)
    }

    return (
        <Fragment>
            {/* <div>FlightInput</div> */}
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                justifyContent='center'
                alignItems='center'
                spacing={1}
                sx={{
                    padding:'50px 0px'
                }}
            >
                <Autocomplete
                    disablePortal
                    id="dep-airport-auto-complete"
                    options={formattedAirportList}
                    sx={(theme) => ({
                        [theme.breakpoints.down("md")]: {
                           width: '90vw',
                        },
                        [theme.breakpoints.up("md")]: {
                           width: '25vw',
                        },
                    })}
                    value={depAirportVal}
                    onChange={(event, newValue) => {
                        setDepAirportVal(newValue);
                    }}
                    inputValue={depAirportInpVal}
                    onInputChange={(event, newInputValue) => {
                        setDepAirportInpVal(newInputValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="Departure Airport" />}
                />
                <Autocomplete
                    disablePortal
                    id="arr-airport-auto-complete"
                    options={formattedAirportList}
                    sx={(theme) => ({
                        [theme.breakpoints.down("md")]: {
                           width: '90vw',
                        },
                        [theme.breakpoints.up("md")]: {
                           width: '25vw',
                        },
                    })}
                    value={arrAirportVal}
                    onChange={(event, newValue) => {
                        setArrAirportVal(newValue);
                    }}
                    inputValue={arrAirportInpVal}
                    onInputChange={(event, newInputValue) => {
                        setArrAirportInpVal(newInputValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="Arrival Airport" />}
                />
                <Box width={{ xs: '90vw', md: '20vw' }}>
                    <TextField
                        label='Select Date'
                        select
                        fullWidth
                        value={depDate}
                        onChange={handleDepDateChange}>
                        {getDateList().map(dateObj => (
                            <MenuItem value={dateObj.dateValue}>{dateObj.dateLabel}</MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Button 
                sx={(theme) => ({
                    [theme.breakpoints.down("md")]: {
                        width: '90vw', 
                        padding: '15px 0px'
                    },
                    [theme.breakpoints.up("md")]: {
                        width: '15vw', 
                        padding: '15px 0px',
                    },
                })}
                variant="contained" 
                color="error"
                onClick={() => {
                    handleViewDetailsClick();
                  }}>
                    View Details
                </Button>

                {/* <LoadingButton
          size="small"
          onClick={handleClick}
          loading={loading}
          loadingIndicator="Loading..."
          variant="outlined"
        >
          Fetch data
        </LoadingButton> */}
                {/* <LoadingButton loading variant="outlined">
                Submit
            </LoadingButton> */}
                {/* <input type='button' value='View Details' /> */}
            </Stack>
        </Fragment>
    )
}

export default FlightInput