import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, FlatList} from 'react-native';

import {
  Container,
  List,
  ListName,
  DateOfBirth,
  ImageArrowRight,
  ButtonAdd,
  TituloAdd,
  Input,
  ButtonAdicionar,
  ButtonText,
} from './style';

import ArrowRight from '../../assets/img/right-arrow.png';
import Add from '../../assets/img/add.png';
import Modal from '../../components/modal';
import CloseModal from '../../assets/img/close.png';

import api from '../../services/api';

class Main extends Component {
  state = {
    visible: false,
    list: [],
  };

  async componentDidMount() {
    const response = await api.get('customers');

    this.setState({list: response.data});
  }

  onOpenModal = () => {
    this.setState({visible: true});
  };

  closeModal = () => {
    this.setState({visible: false});
  };

  handleUser = id => {
    const {navigation} = this.props;

    navigation.navigate('InfoUser', {id});
  };

  render() {
    const {visible, list} = this.state;

    return (
      <Container>
        <FlatList
          data={list.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <List onPress={() => this.handleUser(item.id)} key={item.id}>
              <View>
                <ListName>Nome: {item.name}</ListName>
                <DateOfBirth>Data de Nascimento: {item.birthdate}</DateOfBirth>
              </View>
              <ImageArrowRight source={ArrowRight} />
            </List>
          )}
        />

        <ButtonAdd onPress={this.onOpenModal}>
          <Image source={Add} />
        </ButtonAdd>

        <Modal visible={visible}>
          <TouchableOpacity
            style={{alignSelf: 'flex-end'}}
            onPress={this.closeModal}>
            <Image source={CloseModal} />
          </TouchableOpacity>
          <TituloAdd>ADICIONAR CLIENTE</TituloAdd>

          <Image />
          <Input placeholder="Nome" placeholderTextColor="#000" />
          <Input
            placeholder="CPF"
            placeholderTextColor="#000"
            keyboardType={'numeric'}
          />
          <Input placeholder="Data de Nascimento" placeholderTextColor="#000" />

          <ButtonAdicionar>
            <ButtonText>ADICIONAR</ButtonText>
          </ButtonAdicionar>
        </Modal>
      </Container>
    );
  }
}

export default Main;
