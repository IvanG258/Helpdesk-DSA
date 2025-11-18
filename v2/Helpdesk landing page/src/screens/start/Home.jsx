import React from "react";
import { Button, Typography } from "antd";
import { motion } from "framer-motion";

const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <div
      style={{
        height: "100vh",
        backgroundImage:
          "url(https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        padding: "0 40px",
        position: "relative",
      }}
    >
      {/* Sobreposição escura */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.55)",
        }}
      />

      {/* Conteúdo */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 600,
          color: "white",
        }}
      >
        <Title style={{ color: "#fff", fontSize: 52, fontWeight: 700 }}>
          Soluções Profissionais em Redes & Suporte Técnico
        </Title>

        <Paragraph
          style={{
            color: "#e6e6e6",
            fontSize: 18,
            marginTop: 20,
            lineHeight: 1.7,
          }}
        >
          Instalamos, gerimos e mantemos infraestruturas de rede com alto nível
          de segurança, desempenho e fiabilidade.  
          A nossa missão é garantir conectividade e estabilidade para o seu negócio.
        </Paragraph>

        {/* Botões */}
        <div style={{ marginTop: 30 }}>
          <a href="/#servicos">
            <Button
              type="primary"
              size="large"
              style={{
                paddingInline: 35,
                height: 48,
                fontSize: 16,
                borderRadius: 8,
              }}
            >
              Ver Serviços
            </Button>
          </a>

          <a href="/#contacto">
            <Button
              size="large"
              style={{
                marginLeft: 15,
                paddingInline: 35,
                height: 48,
                fontSize: 16,
                borderRadius: 8,
              }}
            >
              Contactar
            </Button>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
