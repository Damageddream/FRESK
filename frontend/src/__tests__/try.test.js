import {render, screen, cleanup } from '@testing-library/react'


import Aktualnosci from '../components/Aktualnosci/Aktualnosci'

test('should render Aktualnosci component', () => {
    render(<Aktualnosci/>)
    const aktualnosciElement = screen.getByTestId('aktualnosci-1');

    expect(aktualnosciElement).toBeInTheDocument();
})