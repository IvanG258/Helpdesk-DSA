import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  message,
  notification,
} from 'antd';
import dayjs from 'dayjs';

const { TextArea } = Input;

const Reporte = () => {
  const [loading, setLoading] = useState(false);

  const categorias = [
    { value: "CRITICO", label: "Crítico - interrupção total na rede/segurança" },
    { value: "ALTA", label: "Alta - interrupção parcial do sistema/departamento" },
    { value: "MEDIA", label: "Média - problema localizado/pequeno" },
    { value: "BAIXA", label: "Baixa - solicitações de rotina" },
    { value: "MUITO_BAIXA", label: "Muito baixa - melhoria" },
  ];

  const tiposServico = [
    { value: "REDE", label: "Problema de Rede" },
    { value: "INTERNET", label: "Internet Lenta" },
    { value: "SISTEMA", label: "Erro no Sistema" },
    { value: "EMAIL", label: "Email não Funciona" },
    { value: "SEGURANCA", label: "Segurança / Acesso" },
  ];

  const onFinish = async (values) => {
    setLoading(true);

    // simular envio
    setTimeout(() => {
      setLoading(false);

      notification.success({
        message: "Reporte enviado com sucesso!",
        description:
          "A sua solicitação foi recebida. A equipa de suporte irá avaliar o nível de prioridade.",
        placement: "topRight",
      });
    }, 1200);

    console.log("VALORES ENVIADOS:", values);
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 20 }}>
      <Card title="Fazer Reporte" bordered={false}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Categoria de Prioridade"
            name="categoria"
            rules={[{ required: true, message: "Selecione a categoria!" }]}
          >
            <Select placeholder="Selecione a categoria">
              {categorias.map((cat) => (
                <Select.Option key={cat.value} value={cat.value}>
                  {cat.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Tipo de Serviço"
            name="tipo"
            rules={[{ required: true, message: "Selecione o tipo de serviço!" }]}
          >
            <Select placeholder="Selecione o tipo de serviço">
              {tiposServico.map((serv) => (
                <Select.Option key={serv.value} value={serv.value}>
                  {serv.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Local do Problema"
            name="local"
            rules={[{ required: true, message: "Indique o local!" }]}
          >
            <Input placeholder="Ex: Departamento de TI, sala 3..." />
          </Form.Item>

          <Form.Item
            label="Descrição da Avaria"
            name="descricao"
            rules={[{ required: true, message: "Descreva o problema!" }]}
          >
            <TextArea rows={4} placeholder="Explique o que está acontecendo..." />
          </Form.Item>

          <Form.Item label="Data" name="data">
            <DatePicker
              style={{ width: "100%" }}
              disabled
              value={dayjs()}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              Enviar Reporte
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Reporte;
