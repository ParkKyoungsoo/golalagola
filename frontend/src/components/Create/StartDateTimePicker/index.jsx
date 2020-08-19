import React, { useState, useContext } from 'react';
import { DateTimePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { CommonContext } from '../../../context/CommonContext';

function BasicDateTimePicker() {
  const [selectedDate, handleDateChange] = useState(new Date());
  const { newEventData, setNewEventData } = useContext(CommonContext);

  const changeStartDate = () => {
    handleDateChange();
    setNewEventData({ ...newEventData, event_date: selectedDate });
  };

  return (
    <>
      <DateTimePicker
        label="Set the start of the vote"
        inputVariant="outlined"
        format={'yyyy-MM-dd HH:mm'}
        disablePast
        showTodayButton
        value={selectedDate}
        onChange={changeStartDate}
      />
    </>
  );
}

const MuiUtilContainer = () => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <BasicDateTimePicker></BasicDateTimePicker>
    </MuiPickersUtilsProvider>
  );
};

export default MuiUtilContainer;
