import { Button, MenuItem, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler } from 'react-hook-form';
import z, { TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { emptyLiteralString } from '../../common/zodTypes';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

const professionalschool = [
  'MEDICINA HUMANA',
  'OBSTETRICIA',
  'ENFERMERÍA',
  'TEC. MED. LAB. CLÍNICO Y ANATOMÍA PATOLÓGICA',
  'TEC. MED. TERAPIA FÍSICA Y REHABILITACIÓN',
  'TEC. MED. RADIOLOGÍA',
  'TEC. MED. TERAPIA OCUPACIONAL',
  'NUTRICION',
  'DERECHO',
  'CIENCIA POLÍTICA',
  'LITERATURA',
  'FILOSOFÍA',
  'LINGUÍSTICA',
  'COMUNICACIÓN SOCIAL',
  'ARTE',
  'BIBLIOTECOLOGÍA Y CIENCIAS DE LA INFORMACIÓN',
  'DANZA',
  'CONSERVACIÓN Y RESTAURACIÓN',
  'FARMACIA Y BIOQUÍMICA',
  'CIENCIAS DE LOS ALIMENTOS',
  'TOXICOLOGÍA',
  'ODONTOLOGÍA',
  'EDUCACIÓN INICIAL',
  'EDUCACIÓN PRIMARIA',
  'EDUCACIÓN SECUNDARIA',
  'EDUCACIÓN FÍSICA',
  'QUÍMICA',
  'INGENIERÍA QUÍMICA',
  'INGENIERÍA AGROINDUSTRIAL',
  'MEDICINA VETERINARIA',
  'ADMINISTRACIÓN - LIMA',
  'ADMINISTRACIÓN - S.J.L',
  'ADMINISTRACIÓN - HUARAL',
  'ADMINISTRACIÓN DE TURISMO - LIMA',
  'ADMINISTRACIÓN DE TURISMO - S.J.L',
  'ADMINISTRACIÓN DE TURISMO - HUARAL',
  'ADMINISTRACIÓN DE NEGOCIOS INTERNACIONALES - LIMA',
  'ADMINISTRACIÓN DE NEGOCIOS INTERNACIONALES - S.J.L',
  'ADMINISTRACIÓN DE NEGOCIOS INTERNACIONALES - HUARAL',
  'CIENCIAS BIOLÓGICAS',
  'GENÉTICA Y BIOTECNOLOGÍA',
  'MICROBIOLOGÍA Y PARASITOLOGÍA',
  'CONTABILIDAD - LIMA',
  'CONTABILIDAD - S.J.L',
  'GESTIÓN TRIBUTARIA - LIMA',
  'GESTIÓN TRIBUTARIA - S.J.L',
  'AUDITORÍA EMPRESARIAL Y DEL SECTOR PÚBLICO - LIMA',
  'AUDITORÍA EMPRESARIAL Y DEL SECTOR PÚBLICO - S.J.L',
  'PRESUPUESTO Y FINANZAS PÚBLICAS - LIMA',
  'PRESUPUESTO Y FINANZAS PÚBLICAS - S.J.L',
  'ECONOMÍA',
  'ECONOMÍA PÚBLICA',
  'ECONOMÍA INTERNACIONAL',
  'FÍSICA',
  'INGENIERÍA MECÁNICA DE FLUIDOS',
  'MATEMÁTICA',
  'ESTADÍSTICA',
  'INVESTIGACIÓN OPERATIVA',
  'COMPUTACIÓN CIENTÍFICA',
  'HISTORIA',
  'SOCIOLOGÍA',
  'ANTROPOLOGÍA',
  'ARQUEOLOGÍA',
  'TRABAJO SOCIAL',
  'GEOGRAFÍA',
  'INGENIERÍA GEOLÓGICA',
  'INGENIERÍA GEOGRÁFICA',
  'INGENIERÍA DE MINAS',
  'INGENIERÍA METALÚRGICA',
  'INGENIERÍA CIVIL',
  'INGENIERÍA AMBIENTAL',
  'INGENIERÍA INDUSTRIAL',
  'INGENIERÍA TEXTIL Y CONFECCIONES ',
  'INGENIERÍA DE SEGURIDAD Y SALUD EN EL TRABAJO',
  'PSICOLOGÍA',
  'PSICOLOGÍA ORGANIZACIONAL Y DE LA GESTIÓN HUMANA',
  'INGENIERÍA ELECTRÓNICA',
  'INGENIERÍA ELÉCTRICA',
  'INGENIERÍA DE TELECOMUNICACIONES',
  'INGENIERÍA BIOMÉDICA',
  'INGENIERÍA DE SISTEMAS',
  'INGENIERÍA DE SOFTWARE',
  'CIENCIAS DE LA COMPUTACIÓN'
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

const formSchema = z.object({
  code: z.string().length(6).or(emptyLiteralString()),
  firstname: z.string().min(3).or(emptyLiteralString()),
  lastname: z.string().min(3).or(emptyLiteralString()),
  professionalschool: z.string().optional(),
  minimumscore: z.string().optional(),
  maximumscore: z.string().optional(),
  sortby: z.string().optional(),
  sortorder: z.string().optional(),
});

type FormInput = TypeOf<typeof formSchema>;

export const SearchForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInput>({
    resolver: zodResolver(formSchema),
  });

  const onSubmitHandler: SubmitHandler<FormInput> = (values) => {
    const queryParamsObject = Object.fromEntries(searchParams);
    setSearchParams({
      ...queryParamsObject,
      ...values,
    });
  };

  useEffect(() => {
    reset({
      code: searchParams.get('code') || '',
      firstname: searchParams.get('firstname') || '',
      lastname: searchParams.get('lastname') || '',
      minimumscore: searchParams.get('minimumscore') || '0',
      maximumscore: searchParams.get('maximumscore') || '2000',
    });
  }, []);

  return (
    <Box
      component='form'
      noValidate
      autoComplete='off'
      className='mb-16'
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <section>
        <Typography variant='h6' gutterBottom>
          BUSQUEDA:
        </Typography>
        <div className='grid grid-cols-2  md:grid-cols-4 gap-4 my-4'>
          <TextField
            label='CODIGO'
            error={!!errors['code']}
            helperText={errors['code'] ? errors['code'].message : ''}
            {...register('code')}
            inputProps={{ maxLength: 6 }}
          />
          <TextField
            label='NOMBRES'
            error={!!errors['firstname']}
            helperText={errors['firstname'] ? errors['firstname'].message : ''}
            {...register('firstname')}
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            label='APELLIDOS'
            error={!!errors['lastname']}
            helperText={errors['lastname'] ? errors['lastname'].message : ''}
            {...register('lastname')}
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            select
            label='ESCUELA PROFESIONAL'
            defaultValue={''}
            error={!!errors['professionalschool']}
            helperText={errors['professionalschool'] ? errors['professionalschool'].message : ''}
            {...register('professionalschool')}
          >
            <MenuItem key={''} value={''}>
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
            error={!!errors['minimumscore']}
            helperText={errors['minimumscore'] ? errors['minimumscore'].message : ''}
            {...register('minimumscore')}
          />
          <TextField
            label='PUNTAJE MÁXIMO'
            type='number'
            error={!!errors['maximumscore']}
            helperText={errors['maximumscore'] ? errors['maximumscore'].message : ''}
            {...register('maximumscore')}
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
            error={!!errors['sortby']}
            helperText={errors['sortby'] ? errors['sortby'].message : ''}
            {...register('sortby')}
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
            error={!!errors['sortorder']}
            helperText={errors['sortorder'] ? errors['sortorder'].message : ''}
            {...register('sortorder')}
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