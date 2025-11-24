import React from "react";
import { Row, Col, Card, Statistic, List, Typography } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  DollarOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const Dashboard = () => {
  const atividades = [
    "Novo usuário registado",
    "Pagamento confirmado",
    "Relatório gerado",
    "Atualização de dados realizada",
  ];

  return (
    <div style={{ padding: 20 }}>
      <Typography.Title level={3}>Dashboard</Typography.Title>

      {/* Cards principais */}
      <Row gutter={16}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Usuários"
              value={145}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Relatórios"
              value={32}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Faturamento"
              value={75420}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Processos Concluídos"
              value={89}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Secção de actividades recentes */}
      <Card style={{ marginTop: 25 }} title="Atividades Recentes">
        <List
          dataSource={atividades}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Card>

      {/* Placeholder gráfico */}
      <Card style={{ marginTop: 25 }} title="Gráfico (em construção)">
        <div
          style={{
            height: 250,
            border: "1px dashed #ccc",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#888",
          }}
        >
          Gráfico será exibido aqui
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
