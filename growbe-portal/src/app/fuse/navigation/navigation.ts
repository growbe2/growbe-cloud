import { FuseNavigation } from '@berlingoqc/fuse';

export const navigation: FuseNavigation[] = [
  {
    id: 'accueil',
    title: 'Accueil',
    type: 'item',
    icon: 'home',
    url: '/acceuil',
  },
  {
    id: 'faq',
    title: 'FAQ',
    type: 'item',
    icon: 'help',
    url: '/faq'
  },
];

export const navigationLogin: FuseNavigation[] = [
  {
    id: 'organisation',
    title: 'Organisation',
    type: 'item',
    icon: 'help',
    url: '/organisation'
  }
];
