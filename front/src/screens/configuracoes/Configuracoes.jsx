import React, { useState } from "react";
import { Tabs, Form, Input, Button, Card } from "antd";

const { TabPane } = Tabs;

const Configuracoes = () => {
  const [formUser] = Form.useForm();
  const [formPassword] = Form.useForm();

  const handleSaveUser = (values) => {
    console.log("Dados atualizados:", values);
    // Chamar API aqui
  };

  const handleChangePassword = (values) => {
    console.log("Senha alterada:", values);
    // Chamar API aqui
  };

  return (
    <Card title="Configurações" style={{ maxWidth: 700, margin: "30px auto" }}>
      <Tabs defaultActiveKey="1">
        {/* Aba Editar Dados */}
        <TabPane tab="Editar Dados" key="1">
          <Form
            layout="vertical"
            form={formUser}
            onFinish={handleSaveUser}
          >
            <Form.Item
              label="Nome Completo"
              name="nome"
              rules={[{ required: true, message: "Informe seu nome" }]}
            >
              <Input placeholder="Digite seu nome" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Informe seu email" }]}
            >
              <Input type="email" placeholder="Digite seu email" />
            </Form.Item>

            <Form.Item
              label="Telefone"
              name="telefone"
            >
              <Input placeholder="Número de telefone" />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Salvar Alterações
            </Button>
          </Form>
        </TabPane>

        {/* Aba Trocar Senha */}
        <TabPane tab="Trocar Senha" key="2">
          <Form
            layout="vertical"
            form={formPassword}
            onFinish={handleChangePassword}
          >
            <Form.Item
              label="Senha Atual"
              name="senhaAtual"
              rules={[{ required: true, message: "Informe a senha atual" }]}
            >
              <Input.Password placeholder="Senha atual" />
            </Form.Item>

            <Form.Item
              label="Nova Senha"
              name="novaSenha"
              rules={[
                { required: true, message: "Informe a nova senha" },
                { min: 6, message: "A senha deve ter pelo menos 6 caracteres" },
              ]}
            >
              <Input.Password placeholder="Nova senha" />
            </Form.Item>

            <Form.Item
              label="Confirmar Nova Senha"
              name="confirmarSenha"
              dependencies={["novaSenha"]}
              rules={[
                { required: true, message: "Confirme a nova senha" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("novaSenha") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("As senhas não coincidem");
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirmar nova senha" />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Alterar Senha
            </Button>
          </Form>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default Configuracoes;
