import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicatorBase,
} from 'react-native';
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
  };

  async componentDidMount() {
    const {navigation} = this.props;
    const id = navigation.getParam('id');

    // getListIdRequest

    const response = await api.get(`customers/${id}`);

    this.setState({
      name: response.data.name,
      cpf: response.data.cpf,
      birthdate: response.data.birthdate,
    });
  }

  handleDelete = async id => {
    const {navigation} = this.props;

    this.setState({
      loading: true,
    });
    await api.delete(`customers/${id}`);

    this.setState({
      loading: false,
    });

    navigation.navigate('Main');
  };

  handleUpdate = async id => {
    const {name, cpf, birthdate} = this.state;

    const users = await api.put(`customers/${id}`, {name, cpf, birthdate});

    this.setState({
      user: users.data,
    });

    this.props.navigation.navigate('Main');
  };

  render() {
    const {navigation} = this.props;
    const {name, cpf, birthdate, loading} = this.state;
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
            <TextButton>ATUALIZAR</TextButton>
          </ButtonUpdate>
          <ButtonRemove onPress={() => this.handleDelete(id)}>
            <TextButton>REMOVER</TextButton>
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
