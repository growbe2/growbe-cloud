import { FuseNavigation } from '@berlingoqc/fuse';

export const navigation: FuseNavigation[] = [
  {
    id: 'accueil',
    title: 'Accueil',
    type: 'item',
    icon: 'home',
    url: '/home',
  },
{
    id: 'growbe',
    title: 'Growbe',
    type: 'item',
    icon: 'settings_input_component',
    url: '/growbe'
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    icon: 'dashboard',
    url: '/dashboard',
  },
  {
    id: 'admin',
    title: 'Admin',
    type: 'item',
    icon: 'admin_panel_settings',
    url: '/admin'
  },
  {
    id: 'account',
    title: 'Account',
    type: 'item',
    icon: 'profile',
    url: '/account'
  },
  {
    id: 'faq',
    title: 'FAQ',
    type: 'item',
    icon: 'help',
    url: '/faq',
  },
];
