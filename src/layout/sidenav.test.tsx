import {afterEach, describe, expect, it, jest} from '@jest/globals';
import {fireEvent, render, screen} from '@testing-library/react';
import React from 'react';

import {SideNav} from './sidenav';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('sidenav test', () => {
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
});