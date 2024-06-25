import React from 'react';
import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';

const RegistrationNavBar = () => {
    const [activeTab, setActiveTab] = useState('afiliados');
    const { url } = usePage();

    useEffect(() => {
        const path = url.split('/')[1];
        setActiveTab(path || 'afiliados');
    }, [url]);

    const handleTabClick = (tabName) => {
      setActiveTab(tabName);
      let route = '';
      switch (tabName) {
          case 'afiliados':
              route = '/affiliates';
              break;
          case 'cargo':
              route = '/positions';
              break;
          case 'cliente':
              route = '/customers';
              break;
          case 'colaborador':
              route = '/employees';
              break;
          case 'operador':
              route = '/operators';
              break;
          case 'passeio':
              route = '/tours';
              break;
          case 'prestador':
              route = '/providers';
              break;
          case 'profissional':
              route = '/professionals';
              break;
          case 'veiculos':
              route = '/vehicles';
              break;
          case 'servico':
              route = '/services';
              break;
          case 'parque':
              route = '/parks';
              break;
          default:
              route = '/';
              break;
      }
      Inertia.visit(route);
  };
    
return (
    <div>
      <p>Selecione o perfil de cadastro:</p>
      <nav className="sec-menu-cadastro">
        <ul className="clearfix">
          {['afiliados', 'cargo', 'cliente', 'colaborador', 'operador', 'passeio', 'prestador', 'profissional', 'veiculos', 'servico', 'parque'].map(tabName => (
            <li key={tabName}>
              <a 
                href={`#${tabName}`} 
                className={activeTab === tabName ? 'active' : ''} // Classe 'active' condicional
                onClick={() => handleTabClick(tabName)} // Lidar com o clique
              >
                {tabName.charAt(0).toUpperCase() + tabName.slice(1)} {/* Primeira letra maiúscula */}
              </a>
            </li>
          ))}
        </ul>
        <span></span> {/* Elemento span para o estilo */}
      </nav>

      {/* Conteúdo condicional para cada perfil */}
      {activeTab === 'afiliados' && <div></div>}
      {activeTab === 'cargo' && <div></div>}
      {/* ... (outros conteúdos) */}
    </div>
);
}

export default RegistrationNavBar;