import React from 'react';
import { useState } from 'react';
const RegistrationNavBar = () => {
    const [activeTab, setActiveTab] = useState('afiliados');
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
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
      {activeTab === 'cargo' && <div>Conteúdo de Cargo</div>}
      {/* ... (outros conteúdos) */}
    </div>
);
}

export default RegistrationNavBar;