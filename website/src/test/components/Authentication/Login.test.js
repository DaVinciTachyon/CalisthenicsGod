import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
} from '@testing-library/react';
import Login from '../../../components/Authentication/Login';
import { randomAlphaNumeric, randomEmail } from '../../util';

afterEach(cleanup);

describe('Login', () => {
  it('Empty', async () => {
    const { getByTestId } = render(<Login />);
    expect(getByTestId('signInButton')).toHaveTextContent('Sign In');

    fireEvent.click(getByTestId('signInButton'));

    expect(getByTestId('notification')).toHaveTextContent('Email is required');
  });

  it('No password', async () => {
    const { getByTestId } = render(<Login />);
    expect(getByTestId('signInButton')).toHaveTextContent('Sign In');

    const email = randomEmail();
    fireEvent.change(getByTestId('email'), { target: { value: email } });
    expect(getByTestId('email').value).toBe(email);
    fireEvent.click(getByTestId('signInButton'));

    expect(getByTestId('notification')).toHaveTextContent(
      'Password is required'
    );
  });

  it('Incorrect details', async () => {
    const { getByTestId } = render(<Login />);
    expect(getByTestId('signInButton')).toHaveTextContent('Sign In');

    const email = randomEmail();
    fireEvent.change(getByTestId('email'), { target: { value: email } });
    expect(getByTestId('email').value).toBe(email);

    const password = randomAlphaNumeric(6);
    fireEvent.change(getByTestId('password'), { target: { value: password } });
    expect(getByTestId('password').value).toBe(password);

    fireEvent.click(getByTestId('signInButton'));

    await waitForElement(() => getByTestId('notification'));
    expect(getByTestId('notification')).toHaveTextContent(
      'Email does not exist'
    );
  });
});
