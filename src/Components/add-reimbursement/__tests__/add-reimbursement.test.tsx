import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../redux/Store";
import ReimbursementSubmit from "../add-reimbursement";

describe('ReimbursementSubmit', () => {
    test('renders the reimbursements form', () => {
      render(
        <BrowserRouter>
        <Provider store={store}>
            <ReimbursementSubmit />
        </Provider>
        </BrowserRouter>
        
      );
      const AmountInput = screen.getByPlaceholderText('Amount');
      const DescriptionInput = screen.getByPlaceholderText('Description');
      
     
      
     
      const SubmitButton = screen.getByRole('button', { name: 'Submit' });
      
      expect(AmountInput).toBeDefined();
      expect(DescriptionInput).toBeDefined();
   
    
     
      fireEvent.click(SubmitButton);
     
    });
  });