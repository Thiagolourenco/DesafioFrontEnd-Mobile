import React, {Component} from 'react';
import {
  ActivityIndicator,
  DatePickerAndroid,
  TouchableOpacity,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import api from '../../services/api';
import ListActions from '../../store/ducks/list';
import {
  Container,
  Content,
  TituloAdd,
  Input,
  ButtonAdicionar,
  ButtonText,
  InputDate,
  InputDateText,
} from './style';
import DateInput from '../dateInput';
import ArrowBack from '../../assets/img/left-arrow.png';

class AddUser extends Component {
  state = {
    name: '',
    cpf: '',
    date: new Date(),
    dateText: 'Date de Nascimento',
    loading: false,
  };

  showDatePicker = async options => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        mode: 'spinner',
      });

      if (action !== DatePickerAndroid.dismissedAction) {
        let date = new Date(year, month, day);
        let newDate = {};

        newDate['date'] = date;
        newDate['dateText'] = date.toLocaleDateString('en-US');
        this.setState(newDate);
      }
    } catch ({code, message}) {
      alert(code, message);
    }
  };
  // componentDidMount() {
  //   const date = new Date().getDate();
  //   const month = new Date().getMonth();
  //   const year = new Date().getFullYear();

  //   this.setState({
  //     date: year + '-' + month + '-' + date,
  //   });
  // }
  /**
   * Adiciona cliente e seus respectivos dados
   */

  handleAddUser = async () => {
    this.setState({
      loading: true,
    });

    const {navigation, createUserRequest} = this.props;
    const {name, cpf, date} = this.state;
    // alert(date);
    createUserRequest(name, cpf, date);
    // await api.post('customers', {name, cpf, birthdate});

    setTimeout(() => {
      this.setState({
        loading: false,
      });
      navigation.navigate('Main');
    }, 5000);
  };

  render() {
    const {name, cpf, birthdate, loading, date, dateText} = this.state;
    return (
      <Container behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <Content>
          <TituloAdd>ADICIONAR CLIENTE</TituloAdd>
          <Input
            placeholder="Nome"
            placeholderTextColor="#000"
            value={name}
            onChangeText={text => this.setState({name: text})}
          />
          <Input
            placeholder="CPF"
            placeholderTextColor="#000"
            value={cpf}
            keyboardType={'numeric'}
            onChangeText={text => this.setState({cpf: text})}
          />

          <InputDate onPress={() => this.showDatePicker({date})}>
            <InputDateText>{dateText}</InputDateText>
          </InputDate>

          <ButtonAdicionar onPress={this.handleAddUser}>
            {loading && <ActivityIndicator size="small" color="#fff" />}
            {!loading && <ButtonText>ADICIONAR</ButtonText>}
          </ButtonAdicionar>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  list: state.list,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ListActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddUser);
