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
    icon: 'grow',
    url: '/growbe'
  },
  {
    id: 'organisation',
    title: 'Organisation',
    type: 'item',
    icon: 'help',
    url: '/organisation',
  },
  {
    id: 'node',
    title: 'Node editor',
    type: 'item',
    icon: 'editor',
    url: '/editor',
  },
  {
    id: 'faq',
    title: 'FAQ',
    type: 'item',
    icon: 'help',
    url: '/faq',
  },
];
