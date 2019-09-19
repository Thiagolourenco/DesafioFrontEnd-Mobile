import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #3867d6;
  align-items: center;
`;

export const List = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})`
  height: 75px;
  width: 350px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  margin-top: 25px;
  /* margin-bottom: 25px; */
  flex-direction: row;
`;

export const ListName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.8);
  padding-left: 12px;
  padding-top: 15px;
`;

export const DateOfBirth = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.8);
  padding-left: 12px;
`;

export const ImageArrowRight = styled.Image`
  margin-left: 80px;
  align-self: center;
`;

export const ButtonAdd = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  background-color: #354fab;
  height: 77px;
  width: 77px;
  border-radius: 38.5;
  /* position: absolute; */
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  margin-top: 350px;
  margin-right: 20px;
`;

/**
 *
 * Estilos Modal
 */

export const TituloAdd = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: #fff;
  margin-bottom: 20px;
`;

export const Input = styled.TextInput`
  height: 51px;
  width: 320px;
  background-color: rgba(255, 255, 255, 0.85);
  color: #000;
  padding: 8px;
  border-radius: 15px;
  font-size: 18px;
  margin-bottom: 15px;
`;

export const ButtonAdicionar = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  height: 50px;
  width: 157px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  background-color: #3867d6;
  margin-top: 35px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`;
