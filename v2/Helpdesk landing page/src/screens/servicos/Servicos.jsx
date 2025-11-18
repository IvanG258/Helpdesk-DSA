import React from "react";
import { Box, Grid, Card, CardContent, Typography, Button, CardActions, Divider, Chip, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Wifi, Build, Cloud, Radar } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function Servicos() {
  const services = [
    {
      id: 1,
      title: "Instalação de Redes",
      description:
        "Montagem completa de redes estruturadas, incluindo cabeamento, configuração de routers, switches e pontos de acesso.",
      icon: <Radar sx={{ fontSize: 50, color: "#1976d2" }} />,
    },
    {
      id: 2,
      title: "Manutenção de Infraestrutura",
      description:
        "Diagnóstico e manutenção preventiva e corretiva de toda rede corporativa ou residencial.",
      icon: <Build sx={{ fontSize: 50, color: "#f57c00" }} />,
    },
    {
      id: 3,
      title: "Suporte Técnico Especializado",
      description:
        "Assistência técnica completa para problemas de rede, falhas de conexão e instabilidade de sistemas.",
      icon: <Wifi sx={{ fontSize: 50, color: "#388e3c" }} />,
    },
    {
      id: 4,
      title: "Serviços em Servidores",
      description:
        "Configuração, monitoramento e otimização de servidores em ambientes locais e na cloud.",
      icon: <Cloud sx={{ fontSize: 50, color: "#7b1fa2" }} />,
    },
  ];

  const pricingPlans = [
    {
      id: 1,
      label: "BÁSICO",
      title: "Semanal",
      price: "$50",
      features: ["Instalação de redes básica", "Suporte remoto", "Monitoramento de rede"],
      color: "primary",
    },
    {
      id: 2,
      label: "INTERMEDIÁRIO",
      title: "Mensal",
      price: "$180",
      features: ["Instalação completa", "Suporte presencial", "Manutenção preventiva", "Configuração de roteadores"],
      color: "secondary",
    },
    {
      id: 3,
      label: "PRO",
      title: "Anual",
      price: "$2000",
      features: ["Todas funcionalidades do plano mensal", "Monitoramento 24/7", "Suporte prioritário", "Consultoria de infraestrutura"],
      color: "success",
    },
  ];

  return (
    <Box sx={{ padding: "60px 20px", maxWidth: 1200, margin: "0 auto" }}>
      {/* Título */}
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700 }}>
        Serviços Profissionais de Redes
      </Typography>
      <Typography variant="body1" align="center" sx={{ maxWidth: 700, margin: "0 auto 40px auto" }}>
        Oferecemos soluções completas em redes de internet, suporte técnico e manutenção de infraestruturas. Qualidade, rapidez e profissionalismo garantidos.
      </Typography>

      {/* Cards de Serviços */}
      <Grid container spacing={4} justifyContent="center">
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={6} lg={3} key={service.id}>
            <Card sx={{ textAlign: "center", padding: 3, borderRadius: 3, boxShadow: 3 }}>
              {service.icon}
              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                {service.title}
              </Typography>
              <Typography variant="body2">{service.description}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Seção de Pricing */}
      <Box sx={{ marginTop: 8 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700 }}>
          Planos de Preço
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {pricingPlans.map((plan) => (
            <Grid item xs={12} sm={6} md={4} key={plan.id}>
              <Card sx={{ padding: 3, borderRadius: 3, boxShadow: 3 }}>
                <Chip label={plan.label} color={plan.color} sx={{ mb: 1 }} />
                <Typography variant="h5" sx={{ mt: 1, mb: 1 }}>
                  {plan.title}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List dense>
                  {plan.features.map((feat, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckIcon color="success" />
                      </ListItemIcon>
                      <ListItemText primary={feat} />
                    </ListItem>
                  ))}
                </List>
                <Divider sx={{ mt: 2, mb: 2 }} />
                <CardActions sx={{ justifyContent: "space-between" }}>
                  <Typography variant="h6">{plan.price}</Typography>
                  <Button variant="contained" endIcon={<KeyboardArrowRightIcon />}>
                    Contratar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
