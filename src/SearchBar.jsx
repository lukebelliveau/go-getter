// @flow
import React from 'react';

import styles from './styles/SearchBar.style';

const { CenterContainer, Input } = styles;

const SearchBar = ({ value, onChange }: { value: string, onChange: (Event) => void }) => (
    <CenterContainer>
      <Input onChange={ onChange } id="brand-search" placeholder="Search for brands"/>
    </CenterContainer>
);

export default SearchBar;