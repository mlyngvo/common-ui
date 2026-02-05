import {afterEach, beforeEach, describe, expect, it, jest} from '@jest/globals';
import {useMediaQuery} from '@mui/material';
import {fireEvent, render, screen} from '@testing-library/react';
import React from 'react';

import {SideNav} from './sidenav';

jest.mock('@mui/material', () => ({
  ...jest.requireActual<typeof import('@mui/material')>('@mui/material'),
  useMediaQuery: jest.fn(),
}));

const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<typeof useMediaQuery>;

afterEach(() => {
  document.body.innerHTML = '';
  jest.clearAllMocks();
});

describe('sidenav test', () => {
  // Default to desktop for existing tests
  beforeEach(() => {
    mockUseMediaQuery.mockReturnValue(false);
  });
  it('can render sidenav basics (title, logo, items)', () => {
    render(
      <SideNav
        appTitle="My App"
        logo={<span>LOGO</span>}
        navItems={[
          {title: 'Dashboard', icon: <span>ICON</span>},
          {title: 'Settings', icon: <span>ICON</span>},
        ]}
      />
    );

    expect(screen.getByText('My App')).toBeVisible();
    expect(screen.getByText('LOGO')).toBeVisible();

    expect(screen.getByText('Dashboard')).toBeVisible();
    expect(screen.getByText('Settings')).toBeVisible();
  });

  it('can call onClick for a nav item', () => {
    const onDashboardClick = jest.fn();

    render(
      <SideNav
        appTitle="My App"
        logo={<span>LOGO</span>}
        navItems={[
          {title: 'Dashboard', icon: <span>ICON</span>, onClick: onDashboardClick},
        ]}
      />
    );

    fireEvent.click(screen.getByText('Dashboard'));
    expect(onDashboardClick).toHaveBeenCalledTimes(1);
  });

  it('can render and click nested items', () => {
    const onChildClick = jest.fn();

    render(
      <SideNav
        appTitle="My App"
        logo={<span>LOGO</span>}
        navItems={[
          {
            title: 'Admin',
            icon: <span>ICON</span>,
            selected: true,
            children: [
              {title: 'Users', onClick: onChildClick},
              {title: 'Roles', onClick: () => {}},
            ],
          },
        ]}
      />
    );

    expect(screen.getByText('Admin')).toBeVisible();
    expect(screen.getByText('Users')).toBeVisible();
    expect(screen.getByText('Roles')).toBeVisible();

    fireEvent.click(screen.getByText('Users'));
    expect(onChildClick).toHaveBeenCalledTimes(1);
  });

  it('can render bottom nav items', () => {
    render(
      <SideNav
        appTitle="My App"
        logo={<span>LOGO</span>}
        navItems={[{title: 'Top', icon: <span>ICON</span>}]}
        bottomNavItems={[{title: 'Bottom', icon: <span>ICON</span>}]}
      />
    );

    expect(screen.getByText('Top')).toBeVisible();
    expect(screen.getByText('Bottom')).toBeVisible();
  });

  it('can render profile and trigger logout', () => {
    const onLogout = jest.fn();

    render(
      <SideNav
        appTitle="My App"
        logo={<span>LOGO</span>}
        navItems={[{title: 'Top', icon: <span>ICON</span>}]}
        profile={{
          displayLine: 'Jane Doe',
          secondaryLine: 'jane@example.invalid',
          onLogout,
        }}
      />
    );

    expect(screen.getByText('Jane Doe')).toBeVisible();
    expect(screen.getByText('jane@example.invalid')).toBeVisible();

    // The logout button only contains an icon, so select it via the nearest button.
    const logoutButton = screen.getByText('Jane Doe').closest('button');
    expect(logoutButton).toBeNull(); // sanity: displayLine is not inside a button

    const allButtons = screen.getAllByRole('button');
    // There are multiple buttons (logo, maybe others). The logout button is the last one in the profile area.
    fireEvent.click(allButtons[allButtons.length - 1]);

    expect(onLogout).toHaveBeenCalledTimes(1);
  });

  describe('responsive behavior', () => {
    it('shows AppBar with menu button on mobile', () => {
      mockUseMediaQuery.mockReturnValue(true);

      render(
        <SideNav
          appTitle="My App"
          logo={<span>LOGO</span>}
          navItems={[{title: 'Dashboard', icon: <span>ICON</span>}]}
        />
      );

      // AppBar should be present with menu icon
      const menuButton = screen.getByTestId('MenuRoundedIcon');
      expect(menuButton).toBeInTheDocument();
    });

    it('does not show AppBar on desktop', () => {
      mockUseMediaQuery.mockReturnValue(false);

      render(
        <SideNav
          appTitle="My App"
          logo={<span>LOGO</span>}
          navItems={[{title: 'Dashboard', icon: <span>ICON</span>}]}
        />
      );

      // Menu icon should not be present on desktop
      expect(screen.queryByTestId('MenuRoundedIcon')).not.toBeInTheDocument();
    });

    it('drawer is initially closed on mobile', () => {
      mockUseMediaQuery.mockReturnValue(true);

      render(
        <SideNav
          appTitle="My App"
          logo={<span>LOGO</span>}
          navItems={[{title: 'Dashboard', icon: <span>ICON</span>}]}
        />
      );

      // On mobile, drawer starts closed, so app title inside drawer should not be visible
      expect(screen.queryByText('My App')).not.toBeVisible();
    });

    it('opens drawer when clicking menu button on mobile', () => {
      mockUseMediaQuery.mockReturnValue(true);

      render(
        <SideNav
          appTitle="My App"
          logo={<span>LOGO</span>}
          navItems={[{title: 'Dashboard', icon: <span>ICON</span>}]}
        />
      );

      // Drawer content should not be visible initially
      expect(screen.queryByText('My App')).not.toBeVisible();

      // Click the menu button to open drawer
      const menuButton = screen.getByTestId('MenuRoundedIcon').closest('button') as HTMLElement;
      fireEvent.click(menuButton);

      // After clicking, drawer content should be visible
      expect(screen.getByText('My App')).toBeVisible();
      expect(screen.getByText('Dashboard')).toBeVisible();
    });

    it('drawer is always visible on desktop', () => {
      mockUseMediaQuery.mockReturnValue(false);

      render(
        <SideNav
          appTitle="My App"
          logo={<span>LOGO</span>}
          navItems={[{title: 'Dashboard', icon: <span>ICON</span>}]}
        />
      );

      // On desktop, drawer is permanent and always visible
      expect(screen.getByText('My App')).toBeVisible();
      expect(screen.getByText('Dashboard')).toBeVisible();
    });
  });
});