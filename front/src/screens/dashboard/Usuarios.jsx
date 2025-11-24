import React, { useEffect, useState } from "react";
import {
    Table,
    Card,
    Button,
    Modal,
    Form,
    Input,
    Select,
    Switch,
    message,
    Popconfirm
} from "antd";
import axiosInstance from "../../httpCommom"
import { toast } from "react-toastify";

const { Option } = Select;

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [form] = Form.useForm();
    const [editId, setEditId] = useState(null);

    // ==========================
    //     CARREGAR USUÁRIOS
    // ==========================
    const carregarUsuarios = async () => {
        try {
            const response = await axiosInstance.get("auth/users");
            setUsuarios(response.data);
        } catch (error) {
            message.error("Erro ao carregar usuários");
        }
    };

    useEffect(() => {
        carregarUsuarios();
    }, []);

    // ==========================
    //      CRIAR USUÁRIO
    // ==========================
    const abrirModalCriar = () => {
        form.resetFields();
        setIsEdit(false);
        setIsModalOpen(true);
    };

    const criarUsuario = async (values) => {
        try {
            await axiosInstance.post("auth/register", values);
            message.success("Usuário criado com sucesso!");
            setIsModalOpen(false);
            carregarUsuarios();
        } catch (error) {
            message.error("Erro ao criar usuário");
        }
    };

    // ==========================
    //       EDITAR USUÁRIO
    // ==========================
    const abrirModalEditar = (user) => {
        setIsEdit(true);
        setEditId(user.id);
        form.setFieldsValue({
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            role: user.role
        });
        setIsModalOpen(true);
    };

    const salvarEdicao = async () => {
        try {
            const valores = form.getFieldsValue();
            await axiosInstance.put(`auth/users/${editId}`, valores);
            message.success("Usuário atualizado!");
            setIsModalOpen(false);
            carregarUsuarios();
        } catch (error) {
            message.error("Erro ao atualizar usuário");
        }
    };

    // ==========================
    //   ATIVAR / DESATIVAR
    // ==========================
    const toggleAtivo = async (id, estado) => {
        try {
            await axiosInstance.patch(`auth/users/${id}/status?enabled=${estado}`);
            message.success("Status do usuário alterado!");
            carregarUsuarios();
        } catch (error) {
            message.error("Erro ao alterar estado do usuário");
        }
    };

    // ==========================
    //       COLUNAS TABELA
    // ==========================
    const colunas = [
        {
            title: "Nome",
            dataIndex: "fullName",
            key: "fullName",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Telefone",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Ativo",
            dataIndex: "enabled",
            key: "enabled",
            render: (enabled, record) => (
                <Switch
                    checked={enabled}
                    onChange={(estado) => toggleAtivo(record.id, estado)}
                />
            ),
        },
        {
            title: "Ações",
            render: (record) => (
                <>
                    <Button type="link" onClick={() => abrirModalEditar(record)}>
                        Editar
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div style={{ padding: 30 }}>
            <Card
                title="Gerenciar Usuários"
                extra={<Button type="primary" onClick={abrirModalCriar}>Novo Usuário</Button>}
            >
                <Table
                    columns={colunas}
                    dataSource={usuarios}
                    rowKey="id"
                    pagination={{ pageSize: 6 }}
                />
            </Card>

            {/* MODAL */}
            <Modal
                open={isModalOpen}
                title={isEdit ? "Editar Usuário" : "Criar Usuário"}
                okText={isEdit ? "Salvar" : "Criar"}
                cancelText="Cancelar"
                onCancel={() => setIsModalOpen(false)}
                onOk={isEdit ? salvarEdicao : () => form.submit()}
            >
                <Form form={form} layout="vertical" onFinish={criarUsuario}>
                    <Form.Item label="Nome Completo" name="fullName" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Email" name="email" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Telefone" name="phone" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    {!isEdit && (
                        <>
                            <Form.Item label="Username" name="username" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item label="Senha" name="password" rules={[{ required: true }]}>
                                <Input.Password />
                            </Form.Item>
                        </>
                    )}

                    <Form.Item label="Role" name="role" rules={[{ required: true }]}>
                        <Select placeholder="Selecione o cargo">
                            <Option value="ADMIN">ADMIN</Option>
                            <Option value="CLIENTE">CLIENTE</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Usuarios;
