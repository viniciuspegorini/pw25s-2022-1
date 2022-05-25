import React from "react";
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { LoginPage } from "./LoginPage";
import AuthService from "../services/auth.service";
import { BrowserRouter } from 'react-router-dom';

describe("LoginPage", () => {
  const getLoginPage = () => {
    return (<BrowserRouter><LoginPage /></BrowserRouter>);
  }

  describe("Layout", () => {
    it("has header of Login", () => {
      const { container } = render( getLoginPage() );
      const header = container.querySelector("h1");
      expect(header).toHaveTextContent("Login");
    });

    it("has input for username", () => {
      const { queryByPlaceholderText } = render(getLoginPage());
      const usernameInput = queryByPlaceholderText("Your username");
      expect(usernameInput).toBeInTheDocument();
    });

    it("has input for password", () => {
      const { queryByPlaceholderText } = render(getLoginPage());
      const passwordInput = queryByPlaceholderText("Your password");
      expect(passwordInput).toBeInTheDocument();
    });

    it("has password type for password input", () => {
      const { queryByPlaceholderText } = render(getLoginPage());
      const passwordInput = queryByPlaceholderText("Your password");
      expect(passwordInput.type).toBe("password");
    });
    it("has login button", () => {
      const { container } = render(getLoginPage());
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
          }, 300);
        });
      });
    };
    let usernameInput, passwordInput, button;

    const setupForSubmit = () => {
      const rendered = render(getLoginPage());
      const { container, queryByPlaceholderText } = rendered;

      usernameInput = queryByPlaceholderText("Your username");
      fireEvent.change(usernameInput, changeEvent("my-user-name"));
      passwordInput = queryByPlaceholderText("Your password");
      fireEvent.change(passwordInput, changeEvent("P4ssword"));
      button = container.querySelector("button");
      return rendered;
    };

    it("sets the username value into state", () => {
      const { queryByPlaceholderText } = render(getLoginPage());
      const usernameInput = queryByPlaceholderText("Your username");
      fireEvent.change(usernameInput, changeEvent("my-user-name"));
      expect(usernameInput).toHaveValue("my-user-name");
    });
    it("sets the password value into state", () => {
      const { queryByPlaceholderText } = render(getLoginPage());
      const passwordInput = queryByPlaceholderText("Your password");
      fireEvent.change(passwordInput, changeEvent("P4ssword"));
      expect(passwordInput).toHaveValue("P4ssword");
    });
    it("calls postLogin when the actions are provided in props and input fields have value", () => {
      AuthService.login = jest.fn().mockResolvedValue({});
      setupForSubmit();
      fireEvent.click(button);
      expect(AuthService.login).toHaveBeenCalledTimes(1);
    });
    it("does not throw exception when clicking the button when actions not provided in props", () => {
      setupForSubmit();
      expect(() => fireEvent.click(button)).not.toThrow();
    });

    it("calls postLogin with credentials in body", () => {
      AuthService.login = jest.fn().mockResolvedValue({});
      setupForSubmit();
      fireEvent.click(button);

      const expectedUserObject = {
        username: "my-user-name",
        password: "P4ssword",
      };

      expect(AuthService.login).toHaveBeenCalledWith(expectedUserObject);
    });

    it("enables the button when username and password is not empty", () => {
      setupForSubmit();
      expect(button).not.toBeDisabled();
    });
    it("disables the button when username is empty", () => {
      setupForSubmit();
      fireEvent.change(usernameInput, changeEvent(""));
      expect(button).toBeDisabled();
    });
    it("disables the button when password is empty", () => {
      setupForSubmit();
      fireEvent.change(passwordInput, changeEvent(""));
      expect(button).toBeDisabled();
    });
    it("displays alert when login fails", async () => {
      const { findByText } = setupForSubmit();
      AuthService.login = jest.fn().mockRejectedValue({
        response: {
          data: {
            message: "Login failed",
          },
        },
      });
      fireEvent.click(button);

      const alert = await findByText("Login failed");
      expect(alert).toBeInTheDocument();
    });
    it("clears alert when user changes username", async () => {
      const { findByText } = setupForSubmit();
      AuthService.login = jest.fn().mockRejectedValue({
        response: {
          data: {
            message: "Login failed",
          },
        },
      });
      fireEvent.click(button);

      const alert = await findByText("Login failed");
      fireEvent.change(usernameInput, changeEvent("updated-username"));

      expect(alert).not.toBeInTheDocument();
    });
    it("clears alert when user changes password", async () => {
      const { findByText } = setupForSubmit();
      AuthService.login = jest.fn().mockRejectedValue({
        response: {
          data: {
            message: "Login failed",
          },
        },
      });
      fireEvent.click(button);
      const alert = await findByText("Login failed");
      fireEvent.change(passwordInput, changeEvent("updated-P4ssword"));
      expect(alert).not.toBeInTheDocument();
    });

    it("does not allow user to click the Login button when there is an ongoing api call", () => {
      AuthService.login = jest.fn().mockResolvedValue({});
      setupForSubmit();
      fireEvent.click(button);

      fireEvent.click(button);
      expect(AuthService.login).toHaveBeenCalledTimes(1);
    });

    it("displays spinner when there is an ongoing api call", () => {
      AuthService.login = jest.fn().mockResolvedValue({});
      const { queryByText } = setupForSubmit();
      fireEvent.click(button);

      const spinner = queryByText("Aguarde...");
      expect(spinner).toBeInTheDocument();
    });

    it("hides spinner after api call finishes successfully", async () => {
      AuthService.login = jest.fn().mockResolvedValue({});

      const { queryByText } = setupForSubmit();
      fireEvent.click(button);

      const spinner = queryByText("Aguarde...");
      await waitForElementToBeRemoved(spinner);
      expect(spinner).not.toBeInTheDocument();
    });
    it("hides spinner after api call finishes with error", async () => {
      AuthService.login = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            reject({
              response: { data: {} },
            });
          }, 300);
        });
      });
      const { queryByText } = setupForSubmit();
      fireEvent.click(button);

      const spinner = queryByText("Aguarde...");
      await waitForElementToBeRemoved(spinner);
      expect(spinner).not.toBeInTheDocument();
    });
  });
});

console.error = () => {};