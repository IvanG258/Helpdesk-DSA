import React, { useEffect, useState } from "react";
import {
    Table,
    Card,
    Button,
    Input,
    Select,
    Modal,
    Form,
    message,
    Popconfirm,
} from "antd";
import axios from "axios";
import axiosInstance from "../../httpCommom"

const { Option } = Select;

const Reportes = () => {
    const [reportes, setReportes] = useState([]);
    const [filtroTexto, setFiltroTexto] = useState("");
    const [filtroPrioridade, setFiltroPrioridade] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [edicaoId, setEdicaoId] = useState(null);

    // =======================
    //   CARREGAR REPORTES
    // =======================
    const carregarReportes = async () => {
        try {
            const response = await axiosInstance.get("reportes");
            setReportes(response.data);
        } catch (error) {
            message.error("Erro ao carregar reportes");
        }
    };

    useEffect(() => {
        carregarReportes();
    }, []);

    // =======================
    //       FILTRAGEM
    // =======================
    const reportesFiltrados = reportes.filter((r) => {
        const texto = filtroTexto.toLowerCase();
        const prioridadeOK = filtroPrioridade ? r.prioridade === filtroPrioridade : true;

        return (
            (r.titulo?.toLowerCase().includes(texto) ||
                r.descricao?.toLowerCase().includes(texto) ||
                r.local?.toLowerCase().includes(texto)) &&
            prioridadeOK
        );
    });

    // =======================
    //      EDITAR REPORTE
    // =======================
    const abrirModalEdicao = (reporte) => {
        setEdicaoId(reporte.id);
        form.setFieldsValue({
            titulo: reporte.titulo,
            descricao: reporte.descricao,
            local: reporte.local,
            data: reporte.data,
            prioridade: reporte.prioridade,
            userId: reporte.usuarioId
        });
        setIsModalOpen(true);
    };

    const salvarEdicao = async () => {
        try {
            const valores = form.getFieldsValue();
            await axios.put(`http://localhost:8080/reportes/${edicaoId}`, valores);
            message.success("Reporte atualizado com sucesso!");
            setIsModalOpen(false);
            carregarReportes();
        } catch (error) {
            message.error("Erro ao atualizar reporte");
        }
    };

    // =======================
    //      EXCLUIR REPORTE
    // =======================
    const excluirReporte = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/reportes/${id}`);
            message.success("Reporte removido!");
            carregarReportes();
        } catch (error) {
            message.error("Erro ao remover reporte");
        }
    };

    // =======================
    //        COLUNAS TABELA
    // =======================
    const colunas = [
        {
            title: "Título",
            dataIndex: "titulo",
            key: "titulo",
        },
        {
            title: "Descrição",
            dataIndex: "descricao",
            key: "descricao",
        },
        {
            title: "Local",
            dataIndex: "local",
            key: "local",
        },
        {
            title: "Data",
            dataIndex: "data",
            key: "data",
        },
        {
            title: "Prioridade",
            dataIndex: "prioridade",
            key: "prioridade",
        },
        {
            title: "Usuário",
            dataIndex: "nomeUsuario",
            key: "nomeUsuario",
        },
        {
            title: "Ações",
            key: "acoes",
            render: (_, record) => (
                <>
                    <Button
                        type="link"
                        onClick={() => abrirModalEdicao(record)}
                    >
                        Editar
                    </Button>

                    <Popconfirm
                        title="Tem certeza que deseja apagar?"
                        onConfirm={() => excluirReporte(record.id)}
                    >
                        <Button danger type="link">Excluir</Button>
                    </Popconfirm>
                </>
            )
        }
    ];

    // =======================
    //        RETORNO UI
    // =======================
    return (
        <div style={{ padding: 30 }}>
            <Card title="Filtrar Reportes" style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", gap: 20 }}>
                    <Input
                        placeholder="Buscar por texto..."
                        style={{ width: 300 }}
                        value={filtroTexto}
                        onChange={(e) => setFiltroTexto(e.target.value)}
                    />

                    <Select
                        placeholder="Filtrar por prioridade"
                        style={{ width: 200 }}
                        allowClear
                        onChange={(value) => setFiltroPrioridade(value)}
                    >
                        <Option value="ALTA">Alta</Option>
                        <Option value="MEDIA">Média</Option>
                        <Option value="BAIXA">Baixa</Option>
                    </Select>
                </div>
            </Card>

            <Card title="Lista de Reportes">
                <Table
                    columns={colunas}
                    dataSource={reportesFiltrados}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                />
            </Card>

            {/* MODAL DE EDIÇÃO */}
            <Modal
                title="Editar Reporte"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={salvarEdicao}
                okText="Salvar"
                cancelText="Cancelar"
            >
                <Form layout="vertical" form={form}>
                    <Form.Item name="titulo" label="Título">
                        <Input />
                    </Form.Item>

                    <Form.Item name="descricao" label="Descrição">
                        <Input.TextArea rows={3} />
                    </Form.Item>

                    <Form.Item name="local" label="Local">
                        <Input />
                    </Form.Item>

                    <Form.Item name="data" label="Data">
                        <Input />
                    </Form.Item>

                    <Form.Item name="prioridade" label="Prioridade">
                        <Select>
                            <Option value="ALTA">Alta</Option>
                            <Option value="MEDIA">Média</Option>
                            <Option value="BAIXA">Baixa</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="userId" label="ID do Usuário">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Reportes;
