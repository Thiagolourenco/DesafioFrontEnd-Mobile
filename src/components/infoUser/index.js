import React, {Component} from 'react';
import {View, Image, ActivityIndicator, DatePickerAndroid} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ListActions from '../../store/ducks/list';

import api from '../../services/api';
import {
  Container,
  Title,
  TextIn,
  Input,
  GpButton,
  ButtonUpdate,
  ButtonRemove,
  TextButton,
  InputDate,
  InputDateText,
  ButtonBack,
  Header,
} from './style';
import ArrowBack from '../../assets/img/left-arrow.png';

class InfoUser extends Component {
  state = {
    user: [],
    name: '',
    cpf: '',
    date: new Date(),
    birthdate: '',
    loading: false,
    loadingUp: false,
  };

  /**
   * Função para mostrar o calendario no android, para atualizar a
   * a data de nascimento do cliente
   */

  showDatePicker = async () => {
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
   * Carrega os dados do cliente, através do id
   */
  async componentDidMount() {
    const {navigation} = this.props;
    const id = navigation.getParam('id');

    const response = await api.get(`customers/${id}`);

    this.setState({
      name: response.data.name,
      cpf: response.data.cpf,
      birthdate: response.data.birthdate,
    });
  }

  /**
   * Delete o cliente, atráves do ID
   */
  handleDelete = async id => {
    const {navigation, deleteUserRequest} = this.props;

    this.setState({
      loading: true,
    });

    deleteUserRequest(id);
    setTimeout(() => {
      this.setState({
        loading: false,
      });
      navigation.navigate('Main');
    }, 2000);
  };

  /**
   * Atualiza os Dados do cliente
   */
  handleUpdate = async id => {
    const {name, cpf, date, loadingUp} = this.state;
    const {updateUserRequest} = this.props;
    this.setState({
      loadingUp: true,
    });

    updateUserRequest(id, name, cpf, date);

    setTimeout(() => {
      this.setState({
        loadingUp: false,
      });

      this.props.navigation.navigate('Main');
    }, 2000);
  };

  render() {
    const {navigation} = this.props;
    const {name, cpf, birthdate, loading, loadingUp, date} = this.state;
    const id = navigation.getParam('id');

    return (
      <Container>
        <Header>
          <ButtonBack onPress={() => navigation.navigate('Main')}>
            <Image source={ArrowBack} />
          </ButtonBack>
          <Title>Info Usuário</Title>
        </Header>
        <View>
          <TextIn>Nome</TextIn>
          <Input
            value={name}
            onChangeText={text => this.setState({name: text})}
          />
        </View>
        <View>
          <TextIn>CPF</TextIn>
          <Input
            keyboardType={'numeric'}
            value={cpf}
            onChangeText={text => this.setState({cpf: text})}
          />
        </View>
        <View>
          <TextIn>Data de Nascimento</TextIn>

          <InputDate onPress={() => this.showDatePicker({date})}>
            <InputDateText>{birthdate}</InputDateText>
          </InputDate>
        </View>
        <GpButton>
          <ButtonUpdate onPress={() => this.handleUpdate(id)}>
            {loadingUp ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <TextButton>ATUALIZAR</TextButton>
            )}
          </ButtonUpdate>
          <ButtonRemove onPress={() => this.handleDelete(id)}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <TextButton>REMOVER</TextButton>
            )}
          </ButtonRemove>
        </GpButton>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(ListActions, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(InfoUser);
