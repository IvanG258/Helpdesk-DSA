import React from "react";
import { Card, Row, Col, Typography } from "antd";
import { PhoneOutlined, MailOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const { Title, Paragraph } = Typography;

export default function Contacto() {
  return (
    <div style={{ padding: "80px 20px", maxWidth: 1100, margin: "0 auto" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title level={2} style={{ textAlign: "center", fontWeight: 700 }}>
          Contacto
        </Title>
        <Paragraph style={{ textAlign: "center" }}>
          Entre em contacto connosco para suporte, serviços ou orçamentos.
        </Paragraph>
      </motion.div>

      <Row gutter={[24, 24]} style={{ marginTop: 40 }}>
        <Col xs={24} md={12}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Card style={{ padding: 25, borderRadius: 12, minHeight: 250 }}>
              <Title level={4}>Informações de contacto</Title>
              <Paragraph>
                <PhoneOutlined /> <strong> Telefone:</strong> +258 84 000 0000
              </Paragraph>

              <Paragraph>
                <MailOutlined /> <strong> Email:</strong> suporte@empresa.co.mz
              </Paragraph>

              <Paragraph>
                <EnvironmentOutlined /> <strong> Endereço:</strong> Maputo, Moçambique
              </Paragraph>
            </Card>
          </motion.div>
        </Col>

        <Col xs={24} md={12}>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Card style={{ padding: 0, borderRadius: 12, overflow: "hidden" }}>
              <iframe
                title="map"
                width="100%"
                height="250"
                frameBorder="0"
                style={{ border: 0 }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.8037053991107!2d32.578!3d-25.965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ee68ddb38ba1f8f%3A0xebe189c3e52f4a03!2sMaputo!5e0!3m2!1sen!2smz!4v000000000"
                allowFullScreen
              ></iframe>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </div>
  );
}
