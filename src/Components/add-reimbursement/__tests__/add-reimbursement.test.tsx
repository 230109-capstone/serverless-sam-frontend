import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { unmountComponentAtNode } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter, useNavigate } from "react-router-dom";
import { User } from "../../../models/User";
import store from "../../../redux/Store";
import ReimbursementSubmit from "../add-reimbursement";

jest.mock('axios');
let container:any = null;
const mockedAxios = axios as jest.Mocked<typeof axios>;
const setLocalStorage = (user:string, role:string) => {
    window.localStorage.setItem(user, role);
}

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
    window.localStorage.clear();
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe('ReimbursementSubmit', () => {
    test('renders the reimbursements form', () => {
      act(() => {
            render(
            <Provider store={store}>
                <MemoryRouter>
                    <ReimbursementSubmit />
                </MemoryRouter>
            </Provider>, container);
      });
    });

    test("Amount input exists", ()=>{
        let element =        
            render(
            <Provider store={store}>
                <MemoryRouter>
                    <ReimbursementSubmit />
                </MemoryRouter>
            </Provider>, container);
    
        const AmountInput = screen.getByPlaceholderText('Amount');
    
        expect(AmountInput).toBeDefined();
    });

    test("Description input exists", ()=>{
      let element =
        render(
        <Provider store={store}>
            <MemoryRouter>
                <ReimbursementSubmit />
            </MemoryRouter>
        </Provider>, container);
  
      const DescriptionInput = screen.getByPlaceholderText('Description');
  
      expect(DescriptionInput).toBeDefined();
    });

    test('Button Click', ()=>{
    let element =
        render(
        <Provider store={store}>
            <MemoryRouter>
                <ReimbursementSubmit />
            </MemoryRouter>
        </Provider>, container);

    const submitButton = screen.getByRole("button", { name: 'Submit' });
    fireEvent.click(submitButton)
    
    });

    test("Reimbursement Success", async () =>{
        act(() => {
            let element =
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <ReimbursementSubmit />
                    </MemoryRouter>
                </Provider>, container);
        });
        act(() => {
            mockedAxios.post.mockResolvedValueOnce({ status: 200, payload: {"amount": '100', "description": 'bought client lunch', "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYAB"}})
        });
        const submitButton = screen.getByRole("button", { name: 'Submit' });
            await act( async () => {
                fireEvent.click(submitButton)
        });
    });

    test("Reimbursement Fail", async () =>{
      act(() => {
          let element =
          render(
            <Provider store={store}>
                <MemoryRouter>
                    <ReimbursementSubmit />
                </MemoryRouter>
            </Provider>, container);
      });
      act(() => {
          mockedAxios.post.mockResolvedValueOnce({ status: 400, payload: {"amount": '100', "description": 'bought client lunch', "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYAB"}})
      });
      const submitButton = screen.getByRole("button", { name: 'Submit' });
          await act( async () => {
              fireEvent.click(submitButton)
          });
  });

  test("Amount Input Change", async () =>{
    act(() => {
        let element =
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ReimbursementSubmit />
                </MemoryRouter>
            </Provider>, container);
    });
    const input = screen.getByPlaceholderText('Amount') as HTMLInputElement;
    fireEvent.change(input, {target: {value: '100'}});
    expect(input.value).toBe('100');
  });

  test("Description Input Change", async () =>{
    act(() => {
        let element =
            render(
            <Provider store={store}>
                <MemoryRouter>
                    <ReimbursementSubmit />
                </MemoryRouter>
            </Provider>, container);
    });
    const input = screen.getByPlaceholderText('Description') as HTMLInputElement;
    fireEvent.change(input, {target: {value: 'bought client dinner'}});
    expect(input.value).toBe('bought client dinner');
  });

  test('Redirects to view reimbursements page after clicking view reimbursements button', async () => {
    act(() => {
        let element =        
            render(
            <Provider store={store}>
                <MemoryRouter>
                    <ReimbursementSubmit />
                </MemoryRouter>
            </Provider>, container);
    });

    const viewReimbursementsButton = screen.getByRole("button", { name: 'View Reimbursements' });
        await act( async () => {
            fireEvent.click(viewReimbursementsButton)
        });

    expect(useNavigate);
  });

  test('Form clears after submitting reimbursement', async () => {
    act(() => {
        let element =
            render(
            <Provider store={store}>
                <MemoryRouter>
                    <ReimbursementSubmit />
                </MemoryRouter>
            </Provider>, container);
    });
    jest.spyOn(axios, 'post').mockResolvedValueOnce({ status: 200, data: { message: 'Reimbursement successfully added' } });

    const submitButton = screen.getByRole("button", { name: 'Submit' });
        await act( async () => {
            fireEvent.click(submitButton)
        });

    const AmountInput = screen.getByPlaceholderText('Amount') as HTMLInputElement;
    fireEvent.change(AmountInput, {target: {value: ''}});
    expect(AmountInput.value).toBe('');

    const DescriptionInput = screen.getByPlaceholderText('Description') as HTMLInputElement;
    fireEvent.change(DescriptionInput, {target: {value: ''}});
    expect(DescriptionInput.value).toBe('');   
    
  });

  test('Show error message in catch block', async () => {
    act(() => {
        let element =
            render(
            <Provider store={store}>
                <MemoryRouter>
                    <ReimbursementSubmit />
                </MemoryRouter>
            </Provider>, container);
    });
    const errorMessage = 'Unknown Error';
    const errorResponse = { response: {data: { errors: errorMessage}}};
    mockedAxios.post.mockRejectedValue(errorResponse);
    const submitButton = screen.getByRole("button", { name: 'Submit' });
        await act( async () => {
            fireEvent.click(submitButton)
        });
  await expect(errorResponse);
  });

  test('local storage test', async () => {
    act(() => {
        let element =
            render(
            <Provider store={store}>
                <MemoryRouter>
                    <ReimbursementSubmit />
                </MemoryRouter>
            </Provider>, container);
    });
    setLocalStorage('user', 'employee');
    expect(localStorage.getItem('user')).toEqual('employee');
  });

  test('No token provided', async () => {
    act(() => {
        let element =
            render(
            <Provider store={store}>
                <MemoryRouter>
                    <ReimbursementSubmit />
                </MemoryRouter>
            </Provider>, container);
    });
    setLocalStorage('', '');
    const errorMessage = 'Unknown Error';
    const errorResponse = { response: {data: { errors: errorMessage}}};
    mockedAxios.post.mockRejectedValue(errorResponse);
    const submitButton = screen.getByRole("button", { name: 'Submit' });
        await act( async () => {
            fireEvent.click(submitButton)
        });
    await expect(errorResponse);    
  });
})