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
import { Description } from '@mui/icons-material';

const Edit = ({ position }) => {
  const { data, setData, post, put, errors, setErrors } = useForm({
    name: '',
    access_level: null,
    slug: '',
    description: '',
    ...(position || {}),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (position) {
      put(route('positions.update'), {
        data,
      });
    } else {
      post(route('positions.store'));
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
              required
              variant="standard"
              className="textfield"
            />
          </div>

          <div className="campField w33">
            <select
              name="access_level"
              value={data.access_level}
              onChange={handleOnInputChange}
              variant="standard"
              className="textfield"
            >
              <option value="">Nível acesso</option>
              <option value="1">Administrador</option>
              <option value="2">Operador</option>
              <option value="3">Vendedor</option>
            </select>
          </div>

          <div className="campField w66">
            <TextField
              type="text"
              placeholder="slug"
              name="slug"
              value={data.slug}
              onChange={handleOnInputChange}
              required
              variant="standard"
              className="textfield"
            />
          </div>
          <div className="campField w66">
            <TextareaAutosize
              type="text"
              placeholder="Descrição:"
              name="description"
              value={data.description}
              onChange={handleOnInputChange}
              variant="standard"
              className="textfield"
            />
          </div>

          <div className="btns-container">
            <Button
              type="submit"
              className="button"
              variant="contained"
              disableElevation
            >
              {position ? 'Atualizar' : 'Cadastrar'}
            </Button>
          </div>
        </form>
      </div>
    </DefaultPage>
  );
};

export default Edit;
