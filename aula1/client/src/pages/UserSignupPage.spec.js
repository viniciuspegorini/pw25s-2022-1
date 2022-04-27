import React from "react";
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { UserSignupPage } from "./UserSignupPage";
import AuthService from "../services/auth.service";

describe("UserSignupPage", () => {
  describe("Layout", () => {
    it("has header of Sign Up", () => {
      const { container } = render(<UserSignupPage />);
      const header = container.querySelector("h1");
      expect(header).toHaveTextContent("Sign Up");
    });

    it("has input for display name", () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const displayNameInput = queryByPlaceholderText("Informe seu nome");
      expect(displayNameInput).toBeInTheDocument();
    });

    it("has input for username", () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const usernameInput = queryByPlaceholderText("Informe o usuário");
      expect(usernameInput).toBeInTheDocument();
    });
    it("has input for password", () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordInput = queryByPlaceholderText("Informe sua senha");
      expect(passwordInput).toBeInTheDocument();
    });
    it("has input for password repeat", () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordRepeat = queryByPlaceholderText("Confirme sua senha");
      expect(passwordRepeat).toBeInTheDocument();
    });
    it("has password type for password repeat input", () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordRepeat = queryByPlaceholderText("Confirme sua senha");
      expect(passwordRepeat.type).toBe("password");
    });
    it("has submit button", () => {
      const { container } = render(<UserSignupPage />);
      const button = container.querySelector("button");
      expect(button).toBeInTheDocument();
    });
  });
  describe("Interactions", () => {
    const changeEvent = (content) => {
      return {
        target: {
          value: content,
        },
      };
    };

    const mockAsyncDelayed = () => {
      return jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({});
          }, 500);
        });
      });
    };

    let button, displayNameInput, usernameInput, passwordInput, passwordRepeat;
    const setupForSubmit = () => {
      const rendered = render(<UserSignupPage />);

      const { container, queryByPlaceholderText } = rendered;

      displayNameInput = queryByPlaceholderText("Informe seu nome");
      usernameInput = queryByPlaceholderText("Informe o usuário");
      passwordInput = queryByPlaceholderText("Informe sua senha");
      passwordRepeat = queryByPlaceholderText("Confirme sua senha");

      fireEvent.change(displayNameInput, changeEvent("my-display-name"));
      fireEvent.change(usernameInput, changeEvent("my-username"));
      fireEvent.change(passwordInput, changeEvent("P4ssword"));
      fireEvent.change(passwordRepeat, changeEvent("P4ssword"));

      button = container.querySelector("button");

      return rendered;
    };

    it("sets the displayName value into state", () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const displayNameInput = queryByPlaceholderText("Informe seu nome");
      fireEvent.change(displayNameInput, changeEvent("my-display-name"));
      expect(displayNameInput).toHaveValue("my-display-name");
    });

    it("sets the username value into state", () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const usernameInput = queryByPlaceholderText("Informe o usuário");
      fireEvent.change(usernameInput, changeEvent("my-username"));
      expect(usernameInput).toHaveValue("my-username");
    });

    it("sets the password value into state", () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordInput = queryByPlaceholderText("Informe sua senha");
      fireEvent.change(passwordInput, changeEvent("P4ssword"));
      expect(passwordInput).toHaveValue("P4ssword");
    });

    it("sets the password repeat value into state", () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordRepeat = queryByPlaceholderText("Confirme sua senha");
      fireEvent.change(passwordRepeat, changeEvent("P4ssword"));
      expect(passwordRepeat).toHaveValue("P4ssword");
    });

    it("calls postSignup when the fields are valid and the actions are provided in props", () => {
      AuthService.signup = jest.fn().mockResolvedValue({});
      setupForSubmit();
      fireEvent.click(button);
      expect(AuthService.signup).toHaveBeenCalledTimes(1);
    });

    it("does not throw exception when clicking the button when actions not provided in props", () => {
      setupForSubmit();
      expect(() => fireEvent.click(button)).not.toThrow();
    });

    it("calls post with user body when the fields are valid", () => {
      AuthService.signup = jest.fn().mockResolvedValue({});
      setupForSubmit();
      fireEvent.click(button);
      const expectedUserObject = {
        displayName: "my-display-name",
        username: "my-username",
        password: "P4ssword",
      };
      expect(AuthService.signup).toHaveBeenCalledWith(expectedUserObject);
    });

    it("does not allow user to click the Sign Up button when there is an ongoing api call", () => {
      AuthService.signup = mockAsyncDelayed();
      setupForSubmit();
      fireEvent.click(button);

      fireEvent.click(button);
      expect(AuthService.signup).toHaveBeenCalledTimes(1);
    });

    it("displays spinner when there is an ongoing api call", () => {
      AuthService.signup = mockAsyncDelayed();
      const { queryByText } = setupForSubmit();
      fireEvent.click(button);

      const spinner = queryByText("Aguarde...");
      expect(spinner).toBeInTheDocument();
    });

    it("hides spinner after api call finishes successfully", async () => {
      AuthService.signup = mockAsyncDelayed();
      const { queryByText } = setupForSubmit();
      fireEvent.click(button);

      const spinner = queryByText("Aguarde...");
      await waitForElementToBeRemoved(spinner);

      expect(spinner).not.toBeInTheDocument();
    });

    it("hides spinner after api call finishes with error", async () => {
      AuthService.signup = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            reject({
              response: { data: {} },
            });
          }, 500);
        });
      });
      const { queryByText } = setupForSubmit();
      fireEvent.click(button);

      const spinner = queryByText("Aguarde...");
      await waitForElementToBeRemoved(spinner);
      expect(spinner).not.toBeInTheDocument();
    });

    it("displays validation error for displayName when error is received for the field", async () => {
      AuthService.signup = jest.fn().mockRejectedValue({
          response: {
            data: {
              validationErrors: {
                displayName: "não pode ser nulo",
              },
            },
          },
        });
      const { findByText } = setupForSubmit();
      fireEvent.click(button);

      const errorMessage = await findByText("não pode ser nulo");

      expect(errorMessage).toBeInTheDocument();
    });

    it("enables the signup button when password and repeat password have same value", () => {
      setupForSubmit();
      expect(button).not.toBeDisabled();
    });

    it("disables the signup button when password repeat does not match to password", () => {
      setupForSubmit();
      fireEvent.change(passwordRepeat, changeEvent("new-pass"));
      expect(button).toBeDisabled();
    });

    it("disables the signup button when password does not match to password repeat", () => {
      setupForSubmit();
      fireEvent.change(passwordInput, changeEvent("new-pass"));
      expect(button).toBeDisabled();
    });

    it("displays error style for password repeat input when password repeat mismatch", () => {
      const { queryByText } = setupForSubmit();
      fireEvent.change(passwordRepeat, changeEvent("new-pass"));
      const mismatchWarning = queryByText("As senhas devem ser iguais");
      expect(mismatchWarning).toBeInTheDocument();
    });

    it("displays error style for password repeat input when password input mismatch", () => {
      const { queryByText } = setupForSubmit();
      fireEvent.change(passwordInput, changeEvent("new-pass"));
      const mismatchWarning = queryByText("As senhas devem ser iguais");
      expect(mismatchWarning).toBeInTheDocument();
    });

    it("hides the validation error when user changes the content of displayName", async () => {
      AuthService.signup = jest.fn().mockRejectedValue({
          response: {
            data: {
              validationErrors: {
                displayName: "Cannot be null",
              },
            },
          },
        });
      const { findByText } = setupForSubmit();
      fireEvent.click(button);

      const errorMessage = await findByText("Cannot be null");
      fireEvent.change(displayNameInput, changeEvent("name updated"));

      expect(errorMessage).not.toBeInTheDocument();
    });

    it("hides the validation error when user changes the content of username", async () => {
      AuthService.signup = jest.fn().mockRejectedValue({
          response: {
            data: {
              validationErrors: {
                username: "Username cannot be null",
              },
            },
          },
        });
      const { findByText } = setupForSubmit();
      fireEvent.click(button);

      const errorMessage = await findByText("Username cannot be null");
      fireEvent.change(usernameInput, changeEvent("name updated"));

      expect(errorMessage).not.toBeInTheDocument();
    });
    it("hides the validation error when user changes the content of password", async () => {
      AuthService.signup = jest.fn().mockRejectedValue({
          response: {
            data: {
              validationErrors: {
                password: "Cannot be null",
              },
            },
          },
        });
      const { findByText } = setupForSubmit();
      fireEvent.click(button);

      const errorMessage = await findByText("Cannot be null");
      fireEvent.change(passwordInput, changeEvent("updated-password"));

      expect(errorMessage).not.toBeInTheDocument();
    });
  });
});
console.error = () => {};
