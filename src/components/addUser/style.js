import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
`;
export const Content = styled.View`
  background-color: rgba(53, 79, 171, 0.9);
  flex: 1;
  align-items: center;
  justify-content: center;
  /* backgroundColor: 'rgba(53,79,171,0.9)',
    paddingHorizontal: 20,
    paddingVertical: 30,
    margin: 20,
    height: 533,
    borderRadius: 5,
    alignItems: 'stretch',
    // justifyContent: 'center',
    alignItems: 'center', */
`;

export const TituloAdd = styled.Text`
  font-size: 20px;
  font-weight: bold;
  justify-content: center;
  color: #fff;
  margin-bottom: 40px;
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
