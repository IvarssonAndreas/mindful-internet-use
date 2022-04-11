import React from 'react'
import {NavItem} from './NavItem'
import {MindlessIcon, QuotesIcon, SettingsIcon} from '@utils'

export interface NavListProps {
  activeTab: 'websites' | 'quotes' | 'settings'
  onChange: (value: NavListProps['activeTab']) => void
}

export const NavList = ({onChange, activeTab}: NavListProps) => {
  return (
    <nav>
      <ul>
        <NavItem
          onClick={() => onChange('websites')}
          active={activeTab === 'websites'}
        >
          <MindlessIcon />
          Mindless Websites
        </NavItem>
        <NavItem
          onClick={() => onChange('quotes')}
          active={activeTab === 'quotes'}
        >
          <QuotesIcon />
          Motivational quotes
        </NavItem>
        <NavItem
          onClick={() => onChange('settings')}
          active={activeTab === 'settings'}
        >
          <SettingsIcon />
          Settings
        </NavItem>
      </ul>
    </nav>
  )
}
