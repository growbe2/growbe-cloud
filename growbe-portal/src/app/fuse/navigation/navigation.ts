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
        id: 'dashboard',
        title: 'Dashboards',
        type: 'item',
        icon: 'dashboard',
        url: '/dashboard',
    },
    {
        id: 'growbe',
        title: 'Your Growbes',
        type: 'item',
        icon: 'settings_input_component',
    },
    {
        id: 'admin',
        title: 'Admin',
        type: 'collapsable',
        icon: 'admin_panel_settings',
        roles: ['ADMIN'],
        children: [
          {
            id: 'user',
            title: 'User',
            type: 'item',
            icon: 'supervised_user_circle',
            url: '/admin'
          },
          {
            id: 'orgs',
            title: 'Organisations',
            type: 'item',
            icon: 'groups',
            url: '/orgs'
          },
          {
            id: 'growbe',
            title: 'All growbes',
            type: 'item',
            icon: 'settings_input_component',
            url: '/growbe/admin'
          },
        ],
    },
    {
        id: 'me',
        title: 'My account',
        type: 'item',
        icon: 'account_circle',
        url: '/me'
    },
    {
        id: 'faq',
        title: 'FAQ',
        type: 'item',
        icon: 'help',
        url: '/faq',
    },
];
