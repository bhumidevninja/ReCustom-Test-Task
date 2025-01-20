import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { UserActions } from './UserActions';
import { FaDownload, FaEdit, FaTrash } from 'react-icons/fa';

jest.mock('axios');

describe('UserActions Component', () => {
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
  };

  const mockFetchUsers = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders buttons and triggers actions', () => {

    render(<UserActions user={mockUser} fetchUsers={mockFetchUsers} />);

    expect(screen.getByTestId('download')).toBeInTheDocument();
    expect(screen.getByTestId('edit')).toBeInTheDocument();
    expect(screen.getByTestId('delete')).toBeInTheDocument();
  });

  test('opens modal when Edit button is clicked', () => {
    render(<UserActions user={mockUser} fetchUsers={mockFetchUsers} />);

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));

    expect(screen.getByTestId('edit')).toBeInTheDocument();
  });

  test('downloads PDF when the Download button is clicked', async () => {

    const mockGet = jest.spyOn(axios, 'get').mockResolvedValue({ data: new Blob() });

    render(<UserActions user={mockUser} fetchUsers={mockFetchUsers} />);

    fireEvent.click(screen.getByTestId('download'));

    await screen.getByTestId('download');

    expect(mockGet).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_BASE_URL}/api/users/${mockUser.id}/download_pdf/`,
      { responseType: 'blob' }
    );

    // Clear the spy after the test
    mockGet.mockRestore();
  });

  test('deletes user when Delete button is clicked and confirmed', async () => {
    const mockDelete = jest.spyOn(axios, 'delete').mockResolvedValue({ status: 200 });
    const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' };
    const mockFetchUsers = jest.fn();
  
    render(<UserActions user={mockUser} fetchUsers={mockFetchUsers} />);
  
    fireEvent.click(screen.getByTestId('delete'));
  
    expect(screen.getByText('Confirm Deletion')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Proceed'));

    await screen.findByTestId('delete');
    expect(mockDelete).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_BASE_URL}/api/users/${mockUser.id}/`
    );

    expect(mockFetchUsers).toHaveBeenCalled();
  
    mockDelete.mockRestore();
  });
});
