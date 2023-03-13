import Login from "../Login"
import {render, screen, act} from "@testing-library/react"
import user from "@testing-library/user-event"
import {Provider} from "react-redux"
import store from "../../../redux/Store";
import {BrowserRouter} from "react-router-dom";


describe("Test HTML Component", () => {

    it("Username input should exist", () => {
        render(<BrowserRouter>
            <Provider store={store}>
                <Login/>)
            </Provider>
        </BrowserRouter>)

        const usernameInput = screen.getByPlaceholderText("username")
        expect(usernameInput).toBeInTheDocument()

    });

    it("Password input should exist", () => {
        render(<BrowserRouter>
            <Provider store={store}>
                <Login/>)
            </Provider>
        </BrowserRouter>)

        const passwordInput = screen.getByPlaceholderText("password")
        expect(passwordInput).toBeInTheDocument()
    });

    it("submit button should exist", () => {
        render(<BrowserRouter>
            <Provider store={store}>
                <Login/>)
            </Provider>
        </BrowserRouter>)

        const submitButton = screen.getByRole('button')
        expect(submitButton).toBeInTheDocument()
    })
});

describe("Tests form submission", () => {

    test('Username can input a username and password', () => {
        render(<BrowserRouter>
            <Provider store={store}>
                <Login/>)
            </Provider>
        </BrowserRouter>)
        const usernameInput: HTMLFormElement = screen.getByPlaceholderText("username")
        const passwordInput: HTMLFormElement = screen.getByPlaceholderText("password")
        const submitButton = screen.getByRole("button")

        act(() => {
            user.click(usernameInput)
            user.keyboard("newUser123")

            user.click(passwordInput)
            user.keyboard("newUser123")

            user.click(submitButton)
        })

    })
})