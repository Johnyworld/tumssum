import { render, screen } from '@testing-library/react';
import GlobalHeader from '.';
import { MemoryRouter } from 'react-router-dom'


/**
 * Test Global Header
 * - 로고와 GNB 메뉴를 렌더한다.
 */

test('renders logo and gnb menu', () => {
	render(<MemoryRouter><GlobalHeader /></MemoryRouter>)
	const logo = screen.getByText('tumssum');
	const menu = screen.getAllByRole('menuitem');
	expect(logo).toBeInTheDocument();
	expect(menu.map(item => item.textContent)).toEqual(['Home', 'Category', 'Bank']);
})
