import React from 'react';
import DefaultPage from '@/Layouts/Components/DefaultPage.jsx';
import { Link as InertiaLink, useForm } from '@inertiajs/react';
import Header from '@/Layouts/Components/Header/Header';
import RegistrationNavBar from '@/Layouts/Components/RegistrationNavBar/RegistrationNavBar';
import {
  Button,
  Select,
  TextField,
  TextareaAutosize,
  Input,
} from '@mui/material';
import '@/Utils/css/style.module.css';

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
            <TextField
              type="text"
              placeholder="name"
              name="name"
              value={data.name}
              onChange={handleOnInputChange}
              required
              variant="standard"
              className="textfield"
            />
          </div>

          <div className="campField w33">
            <TextField
              type="number" // Use type="number" para inputs numéricos
              placeholder="Valor da Comissão"
              name="comission"
              value={data.comission}
              onChange={handleOnInputChange}
              variant="standard"
              className="textfield"
              step="0.01" // Permite incrementos de 0.01 (opcional)
            />
          </div>

          <div className="campField w33">
            <select
              name="document_type"
              value={data.document_type || ''}
              onChange={handleOnInputChange}
              variant="standard"
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
            <TextField
              type="text"
              placeholder="Documento"
              name="document"
              value={data.document}
              onChange={handleOnInputChange}
              variant="standard"
              className="textfield"
            />
          </div>

          <div className="campField w33">
            <TextField
              type="text"
              placeholder="País"
              name="country"
              value={data?.address?.country}
              onChange={handleOnInputAddressChange}
              variant="standard"
              className="textfield"
            />
          </div>

          <div className="campField w33">
            <TextField
              type="text"
              placeholder="Cidade"
              name="city"
              value={data?.address?.city}
              onChange={handleOnInputAddressChange}
              variant="standard"
              className="textfield"
            />
          </div>

          <div className="campField w33">
            <TextField
              type="text"
              placeholder="Rua"
              name="street"
              value={data?.address?.street}
              onChange={handleOnInputAddressChange}
              variant="standard"
              className="textfield"
            />
          </div>

          <div className="campField w50">
            <TextareaAutosize
              placeholder="Dados Bancários"
              name="bank_data"
              value={data?.bank_data}
              onChange={handleOnInputChange}
              variant="standard"
              className="textfield"
            />
          </div>

          <div className="campField w50">
            <TextareaAutosize
              placeholder="Observações"
              name="afiliated_observation"
              value={data?.afiliated_observation}
              onChange={handleOnInputChange}
              variant="standard"
              className="textfield"
            />
          </div>

          <div className="btns-container">
            <Button type="submit" className="button" variant="contained" disableElevation>
              {afiliate ? 'Atualizar' : 'Cadastrar'}
            </Button>
          </div>
        </form>
      </div>
    </DefaultPage>
  );
};

export default Edit;
