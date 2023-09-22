import React, { FC } from 'react';
import Select, { StylesConfig } from 'react-select';

type Props = {
  setSelected: (value: any) => void;
  isMulti?: boolean;
  isClearable?: boolean;
  placeholder: string;
  emptyMessage: string;
  options: Option[];
  disabled?: boolean;
  color?: string;
};

export type Option = {
  label: string;
  value: any;
};

const SelectBar: FC<Props> = ({
  setSelected,
  isMulti,
  isClearable,
  placeholder,
  emptyMessage,
  options,
  disabled,
  color,
}) => {
  const styles = {
    option: (styles: any) => ({ ...styles, color: color ? color : '#000' }),
    input: (styles: any) => ({ ...styles, color: color ? color : '#000' }),
    menu: (styles: any) => ({
      ...styles,
      width: 'max-content',
      minWidth: '100%',
    }),
    minWidth: '100%',
  };

  return (
    <>
      <Select
        placeholder={placeholder}
        noOptionsMessage={() => emptyMessage}
        isDisabled={disabled || false}
        isMulti={isMulti || false}
        isClearable={isClearable || true}
        getOptionLabel={(e: Option) => e.label}
        getOptionValue={(e: Option) => e.value}
        onChange={(value) => setSelected(value)}
        options={options}
        styles={styles}
      />
    </>
  );
};

export default SelectBar;
