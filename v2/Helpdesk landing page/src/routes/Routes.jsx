import {
  HomeOutlined,
  InfoOutlined,
  ContactsOutlined,
  ReportProblemOutlined,
  InfoRounded,
} from '@mui/icons-material';

/**
 * Menu dinâmico baseado no papel do usuário.
 * 
 * - Rotas públicas: qualquer um vê
 * - Rotas privadas: só aparecem após autenticação
 */
const SideRoute = (role) => {
  const isAuthenticated = !!role;
  const normalizedRole = role ? role.toUpperCase() : null;

  const publicRoutes = [
    {
      id: 1,
      label: "Início",
      link: "/",
      icon: <HomeOutlined />,
    },
    {
      id: 2,
      label: "Sobre Nós",
      link: "/sobre",
      icon: <InfoRounded />,
    },
    {
      id: 3,
      label: "Serviços",
      link: "/servicos",
      icon: <InfoOutlined />,
    },
    {
      id: 4,
      label: "Contacto",
      link: "/contacto",
      icon: <ContactsOutlined />,
    },
  ];

  const privateRoutes = [
    {
      id: 5,
      label: "Fazer Reporte",
      link: "/report", // corrigido (antes estava /reporte)
      roles: ["CLIENTE", "ATENDENTE", "ADMIN"],
      icon: <ReportProblemOutlined />,
    },
  ];

  if (!isAuthenticated) return publicRoutes;

  return [
    ...publicRoutes,
    ...privateRoutes.filter((item) =>
      item.roles.includes(normalizedRole)
    ),
  ];
};

export default SideRoute;
