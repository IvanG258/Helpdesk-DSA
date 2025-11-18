import {
  DashboardOutlined,
  PeopleOutlined,
  ContentCutOutlined,
  FitnessCenterOutlined,
  FastfoodOutlined,
  SportsEsportsOutlined,
  ShoppingCartOutlined,
  MonetizationOnOutlined,
  StorefrontOutlined,
  Settings
} from '@mui/icons-material';

/**
 * Retorna todos os itens de menu com base no papel do usuário.
 */
const SideRoute = (role) => {
  if (!role) return [];

  const normalizedRole = role.toUpperCase();

  const routes = [
    {
      id: 1,
      label: 'Dashboard',
      link: '/dashboard',
      roles: ['ADMIN'],
      icon: <DashboardOutlined />
    },
    {
      id: 2,
      label: 'Reporte',
      link: '/reporte',
      roles: ['CLIENTE'],
      icon: <DashboardOutlined />
    },
    {
      id: 3,
      label: 'Reportes',
      link: '/reportes',
      roles: ['ADMIN'],
      icon: <DashboardOutlined />
    },
    {
      id: 4,
      label: 'Usuarios',
      link: '/usuarios',
      roles: ['ADMIN'],
      icon: <DashboardOutlined />
    },
    {
      id: 5,
      label: 'Configuracoes',
      link: '/configuracoes',
      roles: ['ADMIN','CLIENTE'],
      icon: <DashboardOutlined />
    },

    
  ];

  return routes
    .filter(item => item.roles?.includes(normalizedRole))
    .map(item => ({
      ...item,
      children: item.children
        ? item.children.filter(sub => sub.roles ? sub.roles.includes(normalizedRole) : true)
        : undefined
    }));
};

export default SideRoute;
