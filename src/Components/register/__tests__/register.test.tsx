import { render, screen, fireEvent, waitFor, getByPlaceholderText, findByText } from "@testing-library/react";
import axios from "axios";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Route, Router, useNavigate } from "react-router-dom";
import Login from "../../Login/Login";
import Register from "../register";


jest.mock('axios');
let container:any = null;
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

test("Card Mounts correctly", ()=>{
    // Render the component
    act(() => {
        render(<MemoryRouter>
                <Register/>
            </MemoryRouter>, container);
      });

});

test("Username input exists", ()=>{
    let element = render(<MemoryRouter><Register/></MemoryRouter>, container);

    const usernameInput = screen.getByPlaceholderText("Username");

    expect(usernameInput).toBeDefined();
});

test("Password input exists", ()=>{
    let element = render(<MemoryRouter><Register/></MemoryRouter>, container);

    const usernameInput = screen.getByPlaceholderText("Password");

    expect(usernameInput).toBeDefined();
});

test('Button Click', ()=>{
    let element = render(<MemoryRouter><Register/></MemoryRouter>, container);

    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton)
    
});

test("Register Success", async () =>{
    act(() => {
        let element = render(<MemoryRouter><Register/></MemoryRouter>, container);
    });
    act(() => {
        mockedAxios.post.mockResolvedValueOnce({ status: 200, payload: {username: 'username', password: 'password!'}})
    });
    const submitButton = screen.getByRole("button");
        await act( async () => {
            fireEvent.click(submitButton)
        });
});

test("Register Fail", async () =>{
    act(() => {
        let element = render(<MemoryRouter><Register/></MemoryRouter>, container);
    });
    act(() => {
        mockedAxios.post.mockResolvedValueOnce({ status: 400, payload: {username: 'username', password: 'password'}})
    });
    const submitButton = screen.getByRole("button");
        await act( async () => {
            fireEvent.click(submitButton)
        });
});

test("Username Input Change", async () =>{
    act(() => {
        let element = render(<MemoryRouter><Register/></MemoryRouter>, container);
    });
    const input = screen.getByPlaceholderText('Username');
    fireEvent.change(input, {target: {value: 'username1'}});
    expect(input.value).toBe('username1');
});

test("Password Input Change", async () =>{
    act(() => {
        let element = render(<MemoryRouter><Register/></MemoryRouter>, container);
    });
    const input = screen.getByPlaceholderText('Password');
    fireEvent.change(input, {target: {value: 'password!'}});
    expect(input.value).toBe('password!');
});

test('Redirects to login page after successful registration', async () => {
    act(() => {
        let element = render(<MemoryRouter><Register/></MemoryRouter>, container);
    });
    jest.spyOn(axios, 'post').mockResolvedValueOnce({ status: 200, data: { message: 'Registration successful' } });

    const submitButton = screen.getByRole("button");
        await act( async () => {
            fireEvent.click(submitButton)
        });

    await waitFor(() => expect(axios.post).toHaveBeenCalled());

    expect(useNavigate);
  });

test('Show error message in catch block', async () => {
    act(() => {
        let element = render(<MemoryRouter><Register/></MemoryRouter>, container);
    });
    const errorMessage = 'Unknown Error';
    const errorResponse = { response: {data: { errors: errorMessage}}};
    axios.post.mockRejectedValue(errorResponse);
    const submitButton = screen.getByRole("button");
        await act( async () => {
            fireEvent.click(submitButton)
        });
    await expect(errorResponse);
})
