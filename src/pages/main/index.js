import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ListActions from '../../store/ducks/list';
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
  DateP,
} from './style';

import ArrowRight from '../../assets/img/right-arrow.png';
import Add from '../../assets/img/add.png';

class Main extends Component {
  async componentDidMount() {
    const {getListRequest} = this.props;

    getListRequest();
  }

  handleUser = id => {
    const {navigation} = this.props;

    navigation.navigate('InfoUser', {id});
  };

  handleAddUser = async () => {
    const {navigation} = this.props;

    navigation.navigate('AddUser');
  };

  render() {
    const {list} = this.props;

    return (
      <Container>
        <FlatList
          style={{flex: 1}}
          data={list.data.data}
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

        <ButtonAdd onPress={this.handleAddUser}>
          <Image source={Add} />
        </ButtonAdd>
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
)(Main);
