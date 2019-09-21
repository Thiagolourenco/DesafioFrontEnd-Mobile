import React, {Component} from 'react';
import {View, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
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
} from './style';
import ArrowBack from '../../assets/img/left-arrow.png';

class InfoUser extends Component {
  state = {
    user: [],
    name: '',
    cpf: '',
    birthdate: '',
    loading: false,
    loadingUp: false,
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

    await api.delete(`customers/${id}`);
    // deleteUserRequest(id);
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
    const {name, cpf, birthdate, loadingUp} = this.state;
    const {updateUserRequest} = this.props;
    this.setState({
      loadingUp: true,
    });

    updateUserRequest(id, name, cpf, birthdate);
    // const users = await api.put(`customers/${id}`, {name, cpf, birthdate});

    setTimeout(() => {
      this.setState({
        // user: users.data,
        loadingUp: false,
      });

      this.props.navigation.navigate('Main');
    }, 2000);
  };

  render() {
    const {navigation, list} = this.props;
    const {name, cpf, birthdate, loading, loadingUp} = this.state;
    const id = navigation.getParam('id');

    return (
      <Container>
        <View style={{flexDirection: 'row', alignSelf: 'stretch'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Main')}
            style={{justifyContent: 'center', marginLeft: 20}}>
            <Image source={ArrowBack} />
          </TouchableOpacity>
          <Title>Info Usuário</Title>
        </View>
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
          <Input
            value={birthdate}
            onChangeText={text => this.setState({birthdate: text})}
          />
        </View>
        <GpButton>
          <ButtonUpdate onPress={() => this.handleUpdate(id)}>
            {loadingUp && <ActivityIndicator size="small" color="#fff" />}
            {!loadingUp && <TextButton>ATUALIZAR</TextButton>}
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

const mapStateToProps = state => ({
  list: state.list,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ListActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InfoUser);
