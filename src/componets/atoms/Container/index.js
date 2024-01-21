import styled from "styled-components";

export const Container = styled.View`
  display: flex;
  flex-direction: row; /* Alterado para row para alinhar itens em uma linha */
  flex-wrap: wrap; /* Permite que os itens do grid quebrem para a próxima linha */
  align-items: flex-start; /* Alinhado à esquerda */
  justify-content: flex-start;
  background-color: ${({ bg, theme }) => theme.colors[bg || "background"]};
  padding: 16px; /* Adiciona um espaço interno para evitar cortes */
  width: ${({ theme, w }) => (w ? `${theme.metrics.px(w)}px` : "100%")};
  height: ${({ theme, h }) => (h ? `${theme.metrics.px(h)}px` : "100%")};
  flex: 1; /* Ocupa todo o espaço disponível */
`;

export const GridItem = styled.View`
  width: 50%; /* Define cada item para ocupar metade do espaço disponível (2 itens por linha) */
  padding: 8px; /* Espaçamento entre os itens do grid */
`;

