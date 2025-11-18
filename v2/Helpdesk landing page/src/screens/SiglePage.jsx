import React from 'react';
import { Layout } from 'antd';
import { motion } from 'framer-motion';
import Home from './start/Home';
import Sobre from './sobre/Sobre';
import Servicos from './servicos/Servicos';
import Contacto from './contacto.jsx/Contacto';
import FalaConosco from './faleConosco/FaleConosco';
import Reporte from './reports/Reporte';

const { Content } = Layout;

export default function SinglePage() {
  return (
    <Layout>
      <Content className="singlepage-container" style={{ scrollBehavior: 'smooth' }}>
        <motion.section
          id="inicio"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Home />
        </motion.section>

        <motion.section
          id="sobre"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Sobre />
        </motion.section>

        <motion.section
          id="servicos"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Servicos />
        </motion.section>

        <motion.section
          id="contacto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Contacto />
        </motion.section>

         

        <motion.section
          id="falaconosco"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FalaConosco />
        </motion.section>

       
      </Content>
    </Layout>
  );
}
