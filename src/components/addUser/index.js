import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
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
} from './style';

import ArrowBack from '../../assets/img/left-arrow.png';

class AddUser extends Component {
  state = {
    name: '',
    cpf: '',
    birthdate: '',
  };

  handleAddUser = async () => {
    const {createUserRequest, navigation} = this.props;
    const {name, cpf, birthdate} = this.state;

    createUserRequest(name, cpf, birthdate);

    setTimeout(() => {
      navigation.navigate('Main');
    }, 5000);
  };

  render() {
    const {name, cpf, birthdate} = this.state;
    return (
      <Container behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <Content>
          <TituloAdd>ADICIONAR CLIENTE</TituloAdd>
          <Image />
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
          <Input
            placeholder="Data de Nascimento"
            value={birthdate}
            placeholderTextColor="#000"
            onChangeText={text => this.setState({birthdate: text})}
          />

          <ButtonAdicionar onPress={this.handleAddUser}>
            <ButtonText>ADICIONAR</ButtonText>
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
