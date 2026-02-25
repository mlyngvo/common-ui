import {afterEach, describe, expect, it, jest} from '@jest/globals';
import {fireEvent, render, screen} from '@testing-library/react';
import React from 'react';

import {Radio} from './radio';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('radio test', () => {
  it('can render radio group with options', () => {
    render(
      <Radio
        label="Fruits"
        options={[
          {label: 'Apple', value: 'apple'},
          {label: 'Banana', value: 'banana'},
        ]}
      />
    );

    expect(screen.getByText('Fruits')).toBeVisible();
    expect(screen.getByLabelText('Apple')).toBeInTheDocument();
    expect(screen.getByLabelText('Banana')).toBeInTheDocument();
  });

  it('can call onChange with selected value', () => {
    const onChange = jest.fn();

    render(
      <Radio
        label="Fruits"
        options={[
          {label: 'Apple', value: 'apple'},
          {label: 'Banana', value: 'banana'},
        ]}
        RadioProps={{onChange}}
      />
    );

    fireEvent.click(screen.getByLabelText('Banana'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('banana');
  });
});
