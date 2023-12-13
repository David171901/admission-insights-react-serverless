import { Button, MenuItem, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler } from 'react-hook-form';
import z, { TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { emptyLiteralString } from '../../common/zodTypes';

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
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInput>({
    resolver: zodResolver(formSchema),
  });

  const onSubmitHandler: SubmitHandler<FormInput> = (values) => {
    console.log("🚀 ~ file: searchForm.tsx:203 ~ SearchForm ~ values:", values)
  };

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
            defaultValue=''
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