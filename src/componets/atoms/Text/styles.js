import styled from "styled-components/native";
export const CustomText = styled.Text`
  font-size: ${(props) => props.theme.metrics.px(32)}px;
  color: ${(props) => props.color || props.theme.colors.dark};
  margin-top: ${(props) => props.theme.metrics.px(0)}px;
  font-family: "SourceSansPro_700Bold";
`;
