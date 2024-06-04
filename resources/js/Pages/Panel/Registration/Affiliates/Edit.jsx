import React from 'react';
import DefaultPage from '@/Layouts/Components/DefaultPage.jsx';
import { Link as InertiaLink, useForm } from '@inertiajs/react';
import Header from '@/Layouts/Components/Header/Header';
import RegistrationNavBar from '@/Layouts/Components/RegistrationNavBar/RegistrationNavBar';
const Edit = ({ afiliate }) => {
  const { data, setData, post, put, errors, setErrors } = useForm({
    name: '',
    comission: null,
    document: '',
    document_type: '',
    address: {
      country: '',
      city: '',
      street: '',
    },
    bank_data: '',
    afiliated_observation: '',
    ...(afiliate || {}),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (afiliate) {
      put(route('affiliates.update', afiliate.id), {
        data,
      });
    } else {
      post(route('affiliates.store'));
    }
  };

  const handleOnInputChange = (event) => {
    setData(
      event.target.name,
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value
    );
  };

  const handleOnInputAddressChange = (event) => {
    setData({
      ...data,
      address: {
        ...data.address,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value,
      },
    });
  };

  return (
    <DefaultPage>
      <div className="page-layout cadastro">
        <Header />
        <RegistrationNavBar />
        <form onSubmit={handleSubmit} className="form-container">
          <div className="campField">
            <input
              type="text"
              placeholder="name"
              name="name"
              value={data.name}
              onChange={handleOnInputChange}
              required
              className="textfield"
            />
          </div>

          <div className="campField w33">
            <input
              type="number" // Use type="number" para inputs numéricos
              placeholder="Valor da Comissão"
              name="comission"
              value={data.comission}
              onChange={handleOnInputChange}
              className="textfield"
              step="0.01" // Permite incrementos de 0.01 (opcional)
            />
          </div>

          <div className="campField w33">
            <select
              name="document_type"
              value={data.document_type || ''}
              onChange={handleOnInputChange}
              className="textfield"
            >
              <option value="">Tipo de Documento</option>
              {['CPF', 'ID', 'Passport', 'Other'].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="campField w33">
            <input
              type="text"
              placeholder="Documento"
              name="document"
              value={data.document}
              onChange={handleOnInputChange}
              className="textfield"
            />
          </div>

          <div className="campField w33">
            <input
              type="text"
              placeholder="País"
              name="country"
              value={data?.address?.country}
              onChange={handleOnInputAddressChange}
              className="textfield"
            />
          </div>

          <div className="campField w33">
            <input
              type="text"
              placeholder="Cidade"
              name="city"
              value={data?.address?.city}
              onChange={handleOnInputAddressChange}
              className="textfield"
            />
          </div>

          <div className="campField w33">
            <input
              type="text"
              placeholder="Rua"
              name="street"
              value={data?.address?.street}
              onChange={handleOnInputAddressChange}
              className="textfield"
            />
          </div>

          <div className="campField w50">
            <textarea
              placeholder="Dados Bancários&#10;(Inclua dados como conto bancária, agência e o que for necessário para transação)"
              name="bank_data"
              value={data.bank_data}
              onChange={handleOnInputChange}
              className="textfield"
            />
          </div>

          <div className="campField w50">
            <textarea
              placeholder="Observações"
              name="afiliated_observation"
              value={data.afiliated_observation}
              onChange={handleOnInputChange}
              className="textfield"
            />
          </div>

          <div className="btns-container">
            <button type="submit" className="button">
              {afiliate ? 'Atualizar' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </DefaultPage>
  );
};

export default Edit;
