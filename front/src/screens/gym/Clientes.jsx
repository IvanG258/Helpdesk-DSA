import React, { useEffect, useState } from 'react';
import {
  Card,
  Row,
  Col,
  Button,
  Table,
  Modal,
  Form,
  Input,
  DatePicker,
  message,
  Popconfirm,
  Tag,
  Space,
} from 'antd';
import {
  UserAddOutlined,
  EditOutlined,
  PoweroffOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import axiosInstance from '../../httpCommom';
import { toast } from 'react-toastify';

dayjs.locale('pt-br');

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCliente, setEditingCliente] = useState(null);
  const [totalClientes, setTotalClientes] = useState(0);

  const [form] = Form.useForm();

  // --- Estatísticas ---
 
  const clientesSemana = 9;
  const clientesMes =9;

  const fetchClientes = async () =>{
    try{
        const response = await axiosInstance.get("clientes");
        console.log("response ",response.data)
        setClientes(response.data.content)
        setTotalClientes(response.data.totalElements)
    }catch{

    }
  }
  // --- Busca inicial simulada ---
  useEffect(() => {
   
    fetchClientes();
  }, []);

  const handleAdd = async () => {
    try {
      const values = await form.validateFields(); 
      setLoading(true);

      const dataFormatada = values.dataInicio.format('YYYY-MM-DD');
      const novoCliente = {
        nome: values.nome,
        telefone: values.telefone,
        dataInicio: dataFormatada,
      };

      const response = await axiosInstance.post('clientes', novoCliente);

      if (response.status === 201) {
        toast.success('Cliente cadastrado com sucesso!');
        setClientes((prev) => [
          ...prev,
          { id: response.data.id || Date.now(), ...novoCliente, estadoCliente: 'ATIVO' },
        ]);
        form.resetFields();
        setModalVisible(false);
      } else {
        toast.error('Erro ao cadastrar cliente.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Ocorreu um erro ao registrar o cliente.');
    } finally {
      setLoading(false);
    }
  };

  // --- Ativar / Desativar cliente ---
  const handleAtivarDesativar = (id) => {
    setClientes((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, estadoCliente: c.estadoCliente === 'ATIVO' ? 'INATIVO' : 'ATIVO' }
          : c
      )
    );
    message.info('Estado do cliente atualizado.');
  };

  // --- Editar cliente ---
  const handleEditClick = (cliente) => {
    setEditingCliente(cliente);
    setModalVisible(true);
    form.setFieldsValue({
      nome: cliente.nome,
      telefone: cliente.telefone,
      dataInicio: dayjs(cliente.dataInicio),
    });
  };

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Telefone',
      dataIndex: 'telefone',
      key: 'telefone',
    },
    {
      title: 'Data de Início',
      dataIndex: 'dataInicio',
      key: 'dataInicio',
      render: (text) => dayjs(text).format('DD/MM/YYYY'),
    },
    {
      title: 'Estado',
      dataIndex: 'estadoCliente',
      key: 'estadoCliente',
      render: (estado) => (
        <Tag color={estado === 'ATIVO' ? 'green' : 'volcano'}>{estado}</Tag>
      ),
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditClick(record)}
            size="small"
          >
            Editar
          </Button>

          <Popconfirm
            title={
              record.estadoCliente === 'ATIVO'
                ? 'Deseja desativar este cliente?'
                : 'Deseja ativar este cliente?'
            }
            okText="Sim"
            cancelText="Não"
            onConfirm={() => handleAtivarDesativar(record.id)}
          >
            <Button
              icon={
                record.estadoCliente === 'ATIVO' ? (
                  <PoweroffOutlined />
                ) : (
                  <CheckOutlined />
                )
              }
              type={record.estadoCliente === 'ATIVO' ? 'default' : 'primary'}
              danger={record.estadoCliente === 'ATIVO'}
              size="small"
            >
              {record.estadoCliente === 'ATIVO' ? 'Desativar' : 'Ativar'}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      {/* --- Cards de estatísticas --- */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card bordered={false} style={{ background: '#001529', color: '#fff' }}>
            <h3 style={{ color: '#fff' }}>Total de Clientes</h3>
            <h1 style={{ color: '#40a9ff' }}>{totalClientes}</h1>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} style={{ background: '#002140', color: '#fff' }}>
            <h3 style={{ color: '#fff' }}>Registrados esta Semana</h3>
            <h1 style={{ color: '#52c41a' }}>{clientesSemana}</h1>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} style={{ background: '#003a8c', color: '#fff' }}>
            <h3 style={{ color: '#fff' }}>Registrados este Mês</h3>
            <h1 style={{ color: '#faad14' }}>{clientesMes}</h1>
          </Card>
        </Col>
      </Row>

      {/* --- Cabeçalho + botão --- */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '24px 0',
        }}
      >
        <h2 style={{ margin: 0 }}>Lista de Clientes</h2>
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          onClick={() => {
            setEditingCliente(null);
            form.resetFields();
            setModalVisible(true);
          }}
        >
          Registrar Cliente
        </Button>
      </div>

      {/* --- Tabela --- */}
      <Table
        columns={columns}
        dataSource={clientes}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      {/* --- Modal --- */}
      <Modal
        title={editingCliente ? 'Editar Cliente' : 'Registrar Novo Cliente'}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingCliente(null);
        }}
        onOk={handleAdd}
        confirmLoading={loading}
        okText="Salvar"
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="nome"
            label="Nome"
            rules={[{ required: true, message: 'Insira o nome do cliente' }]}
          >
            <Input placeholder="Ex: João Silva" />
          </Form.Item>

          <Form.Item
            name="telefone"
            label="Telefone"
            rules={[{ required: true, message: 'Insira o telefone' }]}
          >
            <Input placeholder="Ex: 84xxxxxxx" />
          </Form.Item>

          <Form.Item
            name="dataInicio"
            label="Data de Início"
            rules={[{ required: true, message: 'Selecione a data de início' }]}
          >
            <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
 
export default Clientes;
