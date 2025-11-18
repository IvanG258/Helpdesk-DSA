import React from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import { motion } from "framer-motion";

const { Title, Paragraph } = Typography;

export default function FaleConosco() {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Mensagem enviada:", values);
  };

  return (
    <div style={{ padding: "80px 20px", maxWidth: 700, margin: "0 auto" }}>
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title level={2} style={{ textAlign: "center", fontWeight: 700 }}>
          Fale Conosco
        </Title>

        <Paragraph style={{ textAlign: "center", marginBottom: 40 }}>
          Tem dúvidas? Precisa de suporte? Envie-nos uma mensagem.
        </Paragraph>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Card style={{ padding: 30, borderRadius: 12 }}>
          <Form layout="vertical" form={form} onFinish={handleSubmit}>
            <Form.Item
              label="Nome"
              name="nome"
              rules={[{ required: true, message: "Digite o seu nome" }]}
            >
              <Input placeholder="Seu nome" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Digite seu email" }]}
            >
              <Input placeholder="exemplo@email.com" />
            </Form.Item>

            <Form.Item
              label="Mensagem"
              name="mensagem"
              rules={[{ required: true, message: "Digite sua mensagem" }]}
            >
              <Input.TextArea rows={4} placeholder="Escreva sua mensagem..." />
            </Form.Item>

            <Button type="primary" htmlType="submit" block size="large">
              Enviar Mensagem
            </Button>
          </Form>
        </Card>
      </motion.div>
    </div>
  );
}
