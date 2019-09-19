import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';

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
  };

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

  render() {
    const {navigation} = this.props;
    const {name, cpf, birthdate} = this.state;

    return (
      <Container>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Main')}>
            <Image source={ArrowBack} />
          </TouchableOpacity>
          <Title>Info Usuário</Title>
        </View>
        <View>
          <TextIn>Nome</TextIn>
          <Input value={name} />
        </View>
        <View>
          <TextIn>CPF</TextIn>
          <Input value={cpf} />
        </View>
        <View>
          <TextIn>Data de Nascimento</TextIn>
          <Input value={birthdate} />
        </View>
        <GpButton>
          <ButtonUpdate>
            <TextButton>ATUALIZAR</TextButton>
          </ButtonUpdate>
          <ButtonRemove>
            <TextButton>REMOVER</TextButton>
          </ButtonRemove>
        </GpButton>
      </Container>
    );
  }
}

export default InfoUser;
