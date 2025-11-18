import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Card, Table, message } from "antd";
import axiosInstance from "../../httpCommom"
import { toast } from "react-toastify";

const { Option } = Select;

const Reporte = () => {
    const [form] = Form.useForm();

   

    // Criar reporte
    const enviarReporte = async (values) => {
        const userId = localStorage.getItem("principal")
        const user = JSON.parse(userId);


        console.log("id ",user.id)
        try {
           const response = await axiosInstance.post("reportes", {
                titulo: values.titulo,
                descricao: values.descricao,
                local: values.local,
                data: values.data,
                prioridade: values.prioridade,
                userId: user.id
            });
            console.log("esponse",response)
            if(response.status == 200){
                 form.resetFields();
                 toast.success("Reporte enviado com sucesso")
            }
           
            carregarReportes();
        } catch (error) {
            message.error("Erro ao enviar reporte");
        }
    };

   

    return (
        <div style={{ padding: 30 }}>
            <Card title="Criar Reporte" bordered style={{ marginBottom: 30 }}>
                <Form form={form} layout="vertical" onFinish={enviarReporte}>
                    <Form.Item
                        name="titulo"
                        label="Título"
                        rules={[{ required: true, message: "Digite o título" }]}
                    >
                        <Input placeholder="Ex.: Falha na iluminação" />
                    </Form.Item>

                    <Form.Item
                        name="descricao"
                        label="Descrição"
                        rules={[{ required: true, message: "Digite a descrição" }]}
                    >
                        <Input.TextArea rows={3} placeholder="Explique o problema" />
                    </Form.Item>

                    <Form.Item
                        name="local"
                        label="Local"
                        rules={[{ required: true, message: "Informe o local" }]}
                    >
                        <Input placeholder="Ex.: Sala 3" />
                    </Form.Item>

                    <Form.Item
                        name="data"
                        label="Data"
                        rules={[{ required: true, message: "Informe a data" }]}
                    >
                        <Input type="date" placeholder="2025-02-14" />
                    </Form.Item>

                    <Form.Item
                        name="prioridade"
                        label="Prioridade"
                        rules={[{ required: true, message: "Selecione a prioridade" }]}
                    >
                        <Select placeholder="Selecione">
                            <Option value="ALTA">Alta</Option>
                            <Option value="MEDIA">Média</Option>
                            <Option value="BAIXA">Baixa</Option>
                        </Select>
                    </Form.Item>

                    

                    <Button type="primary" htmlType="submit">
                        Enviar Reporte
                    </Button>
                </Form>
            </Card>

           
        </div>
    );
};

export default Reporte;
