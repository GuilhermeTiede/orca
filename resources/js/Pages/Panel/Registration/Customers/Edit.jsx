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
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';
import '@/Utils/css/style.module.css';
import { Description } from '@mui/icons-material';

const Edit = ({ customer }) => {
  const { data, setData, post, put, errors, setErrors } = useForm({
    first_name: '',
    social_name: '',
    nationality: '',
    address: '',
    email: '',
    phone: '',
    gender: '',
    document_type: '',
    document_number: '',
    birth_date: '',
    customer_type: '',
    notes: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (customer) {
      put(route('customers.update'), {
        data,
      });
    } else {
      post(route('customers.store'));
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

  return (
    <DefaultPage>
      <div className="page-layout cadastro">
        <Header />
        <RegistrationNavBar />
        <form onSubmit={handleSubmit} className="form-container">
          <div className="campField">
            <TextField
              type="text"
              placeholder="Nome"
              name="name"
              value={data.name}
              onChange={handleOnInputChange}
              variant="standard"
              className="textfield"
            />
          </div>

          <div className="campField w33">
            <TextField
              type="text"
              placeholder="Nome Social"
              name="social_name"
              value={data.social_name}
              onChange={handleOnInputChange}
              variant="standard"
              className="textfield"
            />
          </div>

          <div className="campField w33">
            <TextField
              type="text"
              placeholder="Nacionalidade"
              name="nationality"
              value={data.nationality}
              onChange={handleOnInputChange}
              variant="standard"
              className="textfield"
            />
          </div>

          <div className="campField w33">
            <TextField
              type="text"
              placeholder="E-mail"
              name="email"
              value={data.email}
              onChange={handleOnInputChange}
              variant="standard"
              className="textfield"
            />
          </div>

          <div className="campField w33">
            <TextField
              type="text"
              placeholder="Whatsapp"
              name="phone"
              value={data.phone}
              onChange={handleOnInputChange}
              variant="standard"
              className="textfield"
            />
          </div>

          <div className="campField w33">
            <TextField
              type="text"
              placeholder="Endereço"
              name="endereco"
              value={data.endereco}
              onChange={handleOnInputChange}
              variant="standard"
              className="textfield"
            />
          </div>

          <div className="campField w33">
            <FormControl variant="standard" className="textfield">
              <select
                name="gender"
                value={data.gender}
                onChange={handleOnInputChange}
                className='textfield'
              >
                <option value="">
                  <em>Selecione</em>
                </option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
            </FormControl>
          </div>

          <div className="campField w33">
            <TextField
              type="text"
              placeholder="Data de Nascimento"
              name="birth_date"
              value={data.birth_date}
              onChange={handleOnInputChange}
              variant="standard"
              className="textfield"
            />
          </div>

          <div className="campField w33">
            <FormControl variant="standard" className="textfield">
              <InputLabel>Tipo de Documento</InputLabel>
              <Select
                name="document_type"
                value={data.document_type}
                onChange={handleOnInputChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="CPF">CPF</MenuItem>
                <MenuItem value="RG">RG</MenuItem>
                <MenuItem value="Passaporte">Passaporte</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="campField w33">
            <TextField
              type="text"
              placeholder="Documento"
              name="document_number"
              value={data.document_number}
              onChange={handleOnInputChange}
              variant="standard"
              className="textfield"
            />
          </div>

          <div className="campField w33">
            <FormControl variant="standard" className="textfield">
              <InputLabel>Tipo de Pessoa</InputLabel>
              <Select
                name="tipo_de_pessoa"
                value={data.tipo_de_pessoa}
                onChange={handleOnInputChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Fisica">Física</MenuItem>
                <MenuItem value="Juridica">Jurídica</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="campField w33">
            <FormControl variant="standard" className="textfield">
              <InputLabel>Tipo de Cliente</InputLabel>
              <Select
                name="customer_type"
                value={data.customer_type}
                onChange={handleOnInputChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Novo">Novo</MenuItem>
                <MenuItem value="Existente">Existente</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="campField">
            <TextareaAutosize
              placeholder="Observações"
              name="notes"
              value={data.notes}
              onChange={handleOnInputChange}
              minRows={3}
              className="textfield"
            />
          </div>

          <div className="btns-container">
            <Button
              href=""
              className="button grey"
              variant="contained"
              disableElevation
            >
              Consultar dados
            </Button>
            <Button
              href=""
              className="button grey"
              variant="contained"
              disableElevation
            >
              Atualizar dados
            </Button>
            <Button
              type="submit"
              className="button"
              variant="contained"
              disableElevation
            >
              Cadastrar
            </Button>
          </div>
        </form>
      </div>
    </DefaultPage>
  );
};

export default Edit;
