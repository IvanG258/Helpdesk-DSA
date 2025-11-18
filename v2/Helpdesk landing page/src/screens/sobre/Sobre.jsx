import React from "react";
import { Typography, Row, Col, Card } from "antd";
import { motion } from "framer-motion";
import {
  TeamOutlined,
  ThunderboltOutlined,
  SafetyCertificateOutlined,
  LaptopOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export default function Sobre() {
  return (
    <div style={{ padding: "90px 20px", maxWidth: 1200, margin: "0 auto" }}>
      {/* Cabeçalho */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title level={2} style={{ textAlign: "center", fontWeight: 800 }}>
          Sobre a Nossa Empresa
        </Title>

        <Paragraph
          style={{
            textAlign: "center",
            maxWidth: 850,
            margin: "0 auto",
            fontSize: 17,
            color: "#555",
          }}
        >
          Somos uma empresa especializada em redes, infraestrutura tecnológica,
          servidores e suporte técnico. Ajudamos empresas a garantirem
          estabilidade, segurança e alto desempenho nos seus sistemas.
        </Paragraph>
      </motion.div>

      {/* Secção 1 - Missão / Visão / Valores */}
      <Row gutter={[24, 24]} style={{ marginTop: 50 }}>
        <Col xs={24} md={8}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Card
              style={{
                padding: 25,
                borderRadius: 14,
                minHeight: 230,
              }}
              hoverable
            >
              <Title level={4}>Nossa Missão</Title>
              <Paragraph>
                Proporcionar soluções tecnológicas de alto nível, garantindo
                conectividade, segurança e suporte contínuo aos nossos clientes.
              </Paragraph>
            </Card>
          </motion.div>
        </Col>

        <Col xs={24} md={8}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Card
              style={{
                padding: 25,
                borderRadius: 14,
                minHeight: 230,
              }}
              hoverable
            >
              <Title level={4}>Nossa Visão</Title>
              <Paragraph>
                Tornar-nos líderes em Moçambique no fornecimento de infraestrutura
                e soluções tecnológicas de alto desempenho.
              </Paragraph>
            </Card>
          </motion.div>
        </Col>

        <Col xs={24} md={8}>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Card
              style={{
                padding: 25,
                borderRadius: 14,
                minHeight: 230,
              }}
              hoverable
            >
              <Title level={4}>Nossos Valores</Title>
              <Paragraph>
                Transparência, excelência, profissionalismo, inovação e total
                compromisso com cada cliente.
              </Paragraph>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Secção 2 - Diferenciais com Ícones */}
      <div style={{ marginTop: 80 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title
            level={3}
            style={{ textAlign: "center", fontWeight: 700, marginBottom: 10 }}
          >
            Porque Escolher a Nossa Empresa?
          </Title>

          <Paragraph
            style={{ textAlign: "center", maxWidth: 850, margin: "0 auto" }}
          >
            Trabalhamos com foco em resultados, confiabilidade e suporte contínuo.
            Oferecemos soluções completas que fazem a diferença no seu dia a dia.
          </Paragraph>
        </motion.div>

        <Row gutter={[24, 24]} style={{ marginTop: 40 }}>
          <Col xs={24} md={6}>
            <FeatureBox
              icon={<TeamOutlined />}
              title="Equipa Especializada"
              text="Profissionais altamente qualificados em redes e suporte."
            />
          </Col>

          <Col xs={24} md={6}>
            <FeatureBox
              icon={<ThunderboltOutlined />}
              title="Atendimento Rápido"
              text="Respostas ágeis e suporte imediato para emergências."
            />
          </Col>

          <Col xs={24} md={6}>
            <FeatureBox
              icon={<SafetyCertificateOutlined />}
              title="Segurança Reforçada"
              text="Proteção avançada para sua rede e infraestrutura."
            />
          </Col>

          <Col xs={24} md={6}>
            <FeatureBox
              icon={<LaptopOutlined />}
              title="Tecnologia Atual"
              text="Usamos ferramentas modernas para garantir alta performance."
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

/* COMPONENTE REUTILIZÁVEL */
const FeatureBox = ({ icon, title, text }) => (
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
  >
    <Card
      hoverable
      style={{
        textAlign: "center",
        padding: 25,
        borderRadius: 14,
        minHeight: 220,
      }}
    >
      <div style={{ fontSize: 45, color: "#1677ff", marginBottom: 15 }}>
        {icon}
      </div>
      <Title level={4}>{title}</Title>
      <Paragraph style={{ color: "#555" }}>{text}</Paragraph>
    </Card>
  </motion.div>
);
