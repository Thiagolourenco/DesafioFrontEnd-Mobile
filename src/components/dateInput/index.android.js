import React, {Component} from 'react';
import {DatePickerAndroid, View} from 'react-native';

import {Container, DateButton, DateText, Picker} from './style';
class DateInput extends Component {
  handleOpenPicker = async () => {
    const {date} = this.props;

    const {action, year, month, day} = await DatePickerAndroid.open({
      mode: 'spinner',
      date,
    });

    if (action === DatePickerAndroid.dateSetAction) {
      const selectedDate = new Date(year, month, day);

      onChange(selectedDate);
    }
  };

  render() {
    const {date, onChange} = this.props;

    return (
      <Container>
        <DateButton onPress={this.handleOpenPicker} />
        <DateText>{date}</DateText>
      </Container>
    );
  }
}

export default DateInput;
