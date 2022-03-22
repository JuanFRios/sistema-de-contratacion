interface MenuItem {
  text: string;
  route: string;
  icon: string;
}

export const adminMenuOptions: MenuItem[] = [
  {
    text: 'Vacantes',
    route: '/admin/vacancies',
    icon: 'fa-solid fa-table-list',
  },
  {
    text: 'Entrevistas',
    route: '/admin/interviews',
    icon: 'fa-solid fa-video',
  },
  {
    text: 'Candidatos',
    route: '/admin/candidates',
    icon: 'fa-solid fa-user-group',
  },
  {
    text: 'Documentación',
    route: '/admin/documents',
    icon: 'fa-solid fa-folder-open',
  },
];

export const candidateMenuOptions: MenuItem[] = [
  {
    text: 'Vacantes',
    route: '/candidate/vacancies',
    icon: 'fa-solid fa-table-list',
  },
];
