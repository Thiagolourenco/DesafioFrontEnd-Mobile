import React, {Component} from 'react';
import {ActivityIndicator, DatePickerAndroid} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

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

class AddUser extends Component {
  state = {
    name: '',
    cpf: '',
    date: new Date(),
    birthdate: 'Date de Nascimento',
    loading: false,
  };

  /**
   * Função para mostrar o calendario no android, para adicionar a
   * a data de nascimento do cliente
   */
  showDatePicker = async options => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        mode: 'spinner',
      });

      if (action !== DatePickerAndroid.dismissedAction) {
        let date = new Date(year, month, day);
        let newDate = {};

        newDate['date'] = date;
        newDate['birthdate'] = date.toLocaleDateString('en-US');
        this.setState(newDate);
      }
    } catch ({code, message}) {
      alert(code, message);
    }
  };

  /**
   * Adiciona cliente e seus respectivos dados
   */

  handleAddUser = async () => {
    this.setState({
      loading: true,
    });

    const {navigation, createUserRequest} = this.props;
    const {name, cpf, date} = this.state;

    createUserRequest(name, cpf, date);

    setTimeout(() => {
      this.setState({
        loading: false,
      });
      navigation.navigate('Main');
    }, 5000);
  };

  render() {
    const {name, cpf, birthdate, loading, date} = this.state;
    return (
      <Container behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <Content>
          <TituloAdd>ADICIONAR CLIENTE</TituloAdd>
          <Input
            placeholder="Nome e Sobrenome"
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
            <InputDateText>{birthdate}</InputDateText>
          </InputDate>

          <ButtonAdicionar onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <ButtonText>ADICIONAR</ButtonText>
            )}
          </ButtonAdicionar>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(ListActions, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(AddUser);
