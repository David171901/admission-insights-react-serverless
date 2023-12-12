import { Button, MenuItem, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React from 'react';

const professionalschool = [
  'ADMINISTRACIÓN',
  'ADMINISTRACIÓN DE NEGOCIOS INTERNACIONALES',
  'ADMINISTRACIÓN DE TURISMO',
  'ANTROPOLOGÍA',
  'ARTE',
  'AUDITORÍA EMPRESARIAL Y DEL SECTOR PÚBLICO',
  'BIBLIOTECOLOGÍA Y CIENCIAS DE LA INFORMACIÓN',
  'CIENCIAS BIOLÓGICAS',
  'CIENCIAS DE LA COMPUTACIÓN',
  'CONSERVACIÓN Y RESTAURACIÓN',
  'CONTABILIDAD',
  'DANZA',
  'DERECHO',
  'ECONOMÍA',
  'ECONOMÍA INTERNACIONAL',
  'ECONOMÍA PÚBLICA',
  'EDUCACIÓN PRIMARIA',
  'ESTADÍSTICA',
  'FÍSICA',
  'GENÉTICA Y BIOTECNOLOGÍA',
  'GESTIÓN TRIBUTARIA',
  'HISTORIA',
  'INGENIERÍA AGROINDUSTRIAL',
  'INGENIERÍA BIOMÉDICA',
  'INGENIERÍA DE MINAS',
  'INGENIERÍA DE SEGURIDAD Y SALUD EN EL TRABAJO',
  'INGENIERÍA DE SISTEMAS',
  'INGENIERÍA DE SOFTWARE',
  'INGENIERÍA DE TELECOMUNICACIONES',
  'INGENIERÍA ELECTRÓNICA',
  'INGENIERÍA GEOLÓGICA',
  'INGENIERÍA METALÚRGICA',
  'INGENIERÍA TEXTIL Y CONFECCIONES',
  'LINGUÍSTICA',
  'MATEMÁTICA',
  'MICROBIOLOGÍA Y PARASITOLOGÍA',
  'QUÍMICA'
];

const sortBy = [
  {
    value: 'lastname',
    label: 'APELLIDO',
  },
  {
    value: 'firstname',
    label: 'NOMBRE',
  },
  {
    value: 'score',
    label: 'PUNTAJE',
  },
  {
    value: 'merit',
    label: 'MÉRITO',
  },
];

export const SearchForm = () => {
  const [formData, setFormData] = React.useState({
    code: '',
    firstname: '',
    lastname: '',
    professionalschool: '',
    maximumscore: '',
    minimumscore: '',
    sortBy: 'lastname',
    sortOrder: 'asc',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form data:', formData);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box
      component='form'
      noValidate
      autoComplete='off'
      onSubmit={handleSubmit}
      className='mb-16'
    >
      <section>
        <Typography variant='h6' gutterBottom>
          BUSQUEDA:
        </Typography>
        <div className='grid grid-cols-2  md:grid-cols-4 gap-4 my-4'>
          <TextField
            label='CODIGO'
            name='code'
            value={formData.code}
            onChange={handleInputChange}
          />
          <TextField
            label='NOMBRES'
            name='firstname'
            value={formData.firstname}
            onChange={handleInputChange}
          />
          <TextField
            label='APELLIDOS'
            name='lastname'
            value={formData.lastname}
            onChange={handleInputChange}
          />
          <TextField
            select
            label='ESCUELA PROFESIONAL'
            name='professionalschool'
            defaultValue=''
            value={formData.professionalschool}
            onChange={handleSelectChange}
          >
            <MenuItem key={''} value={''} selected disabled>
              {'SELECCIONA UNA ESCUELA PROFESIONAL'}
            </MenuItem>
            {professionalschool.map((school) => (
              <MenuItem key={school} value={school}>
                {school}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label='PUNTAJE MÍNIMO'
            type='number'
            name='minimumscore'
            value={formData.minimumscore}
            onChange={handleInputChange}
          />
          <TextField
            label='PUNTAJE MÁXIMO'
            type='number'
            name='maximumscore'
            value={formData.maximumscore}
            onChange={handleInputChange}
          />
        </div>
      </section>
      <section>
        <Typography variant='h6' gutterBottom>
          ORDENAMIENTO:
        </Typography>
        <div className='grid grid-cols-2  md:grid-cols-4 gap-4 my-4'>
          <TextField
            select
            label='ORDENAR POR'
            defaultValue='lastname'
          >
            {sortBy.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label='DIRECCIÓN DEL ORDEN'
            defaultValue='asc'
          >
            <MenuItem key={'asc'} value={'asc'}>
              {'ASCENDENTE'}
            </MenuItem>
            <MenuItem key={'desc'} value={'desc'}>
              {'DESCENDENTE'}
            </MenuItem>
          </TextField>
        </div>
      </section>
      <Button type='submit' variant='contained' className='w-full'>BUSCAR</Button>
    </Box>
  );
}