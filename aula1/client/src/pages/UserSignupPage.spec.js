import { fireEvent, render } from "@testing-library/react";
import UserSignupPage from "./UserSignupPage";

describe('UserSignupPage', () => {

    describe('Layout', () => {
        it('has header of Sign Up', () => {
            const { container } = render(<UserSignupPage />);
            const header = container.querySelector('h1');
            expect(header).toHaveTextContent('Sign Up');
        });

        it('has input for display name', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const displayNameInput = queryByPlaceholderText('Informe o seu nome');
            expect(displayNameInput).toBeInTheDocument();
        });
        it('has input for username', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const usernameInput = queryByPlaceholderText('Informe o usuário');
            expect(usernameInput).toBeInTheDocument();
        });
        it('has input for password', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const passwordInput = queryByPlaceholderText('Informe a sua senha');
            expect(passwordInput).toBeInTheDocument();
        });
        it('has password type for password input', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const passwordInput = queryByPlaceholderText('Informe a sua senha');
            expect(passwordInput.type).toBe('password');
        });

        it('has input for password repeat', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const passwordRepeatInput = queryByPlaceholderText('Confirme sua senha');
            expect(passwordRepeatInput).toBeInTheDocument();
        });
        it('has password type for password repeat input', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const passwordRepeatInput = queryByPlaceholderText('Confirme sua senha');
            expect(passwordRepeatInput.type).toBe('password');
        });

        it('has submit button', () => {
            const { container } = render(<UserSignupPage />);
            const header = container.querySelector('button');
            expect(header).toBeInTheDocument();
        });
    });
    describe('Interactions', () => {
        const changeEvent = (content) => {
            return {
                target: {
                    value: content,
                },
            }
        };
        let displayNameInput, usernameInput, passwordInput, repeatPasswordInput, button;
        const setupForSubmit = (props) => {
            const rendered = render(<UserSignupPage {...props} />)

            const { container, queryByPlaceholderText } = rendered;

            displayNameInput = queryByPlaceholderText('Informe o seu nome');
            usernameInput = queryByPlaceholderText('Informe o usuário');
            passwordInput = queryByPlaceholderText('Informe a sua senha');
            repeatPasswordInput = queryByPlaceholderText('Confirme sua senha');

            fireEvent.change(displayNameInput, changeEvent('my-display-name'));
            fireEvent.change(usernameInput, changeEvent('my-username'));
            fireEvent.change(passwordInput, changeEvent('P4ssword'));
            fireEvent.change(repeatPasswordInput, changeEvent('P4ssword'));

            button = container.querySelector('button');

            return rendered;
        }

        it('sets the displayName value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const displayNameInput = queryByPlaceholderText('Informe o seu nome');
            fireEvent.change(displayNameInput, changeEvent('my-display-name'));
            expect(displayNameInput).toHaveValue('my-display-name');
        });

        it('sets the username value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const usernameInput = queryByPlaceholderText('Informe o usuário');
            fireEvent.change(usernameInput, changeEvent('my-username'));
            expect(usernameInput).toHaveValue('my-username');
        });

        it('sets the password value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const passwordInput = queryByPlaceholderText('Informe a sua senha');
            fireEvent.change(passwordInput, changeEvent('P4ssword'));
            expect(passwordInput).toHaveValue('P4ssword');
        });
        it('sets the password repeat value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const passwordRepeatInput = queryByPlaceholderText('Confirme sua senha');
            fireEvent.change(passwordRepeatInput, changeEvent('P4ssword'));
            expect(passwordRepeatInput).toHaveValue('P4ssword');
        });

        it('calls postSignup when the fields are valid and the actions are provided in props', () => {
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({}),
            }
            setupForSubmit({actions});
            fireEvent.click(button);
            expect(actions.postSignup).toHaveBeenCalledTimes(1);
        });

        it('does not throw exception when clicking the button and actions are not provided in props', () => {
            setupForSubmit();
            expect(() => fireEvent.click(button)).not.toThrow();
        });

        it('calls post with user body when the fields are valid', () => {
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({}),
            }
            setupForSubmit({actions});
            fireEvent.click(button);

            const expectedUserObject = {
                displayName: 'my-display-name',
                userame: 'my-username',
                password: 'P4ssword',
            }
            expect(actions.postSignup).toHaveBeenCalledWith(expectedUserObject);
        });
    });
});