import * as React from 'react';
import Paper from '@mui/material/Paper';
import TableMUI from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getApplicants } from '../../services/applicants';
import { Applicant } from '../../interfaces/applicant';

interface Column {
  id: string;
  label: string;
}

const columns: readonly Column[] = [
  {
    id: 'code',
    label: 'CODIGO',
  },
  {
    id: 'lastname',
    label: 'APELLIDOS',
  },
  {
    id: 'firstname',
    label: 'NOMBRES',
  },
  {
    id: 'professionalschool',
    label: 'ESCUELA PROFESIONAL',
  },
  {
    id: 'score',
    label: 'PUNTAJE',
  },
  {
    id: 'merit',
    label: 'PUESTO',
  },
  {
    id: 'observation',
    label: 'OBSERVACION',
  },
  {
    id: 'detail',
    label: 'DETALLE',
  },
];

export function Table() {
  const [page, setPage] = React.useState(1);
  const [totalpages, setTotalPages] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [allApplicants, setAllApplicants] = React.useState<Applicant[]>([]);
  const [isLoading, setIsLoading] = React.useState(true)

  const fetchApplicants = async (page: number) => {
    setIsLoading(true);
    const data = await getApplicants(import.meta.env.API_URL, { page: page.toString() });
    setIsLoading(false);
    if (data.success) {
      setAllApplicants(data.ok.data);
      setTotalPages(data.ok.totalpages);
    }
  };

  React.useEffect(() => {
    fetchApplicants(page);
  }, [page])


  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>Cargando...</div>
      ) : (
        <>
          <TableContainer>
            <TableMUI stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {allApplicants
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        <TableCell>
                          {row.code}
                        </TableCell>
                        <TableCell>
                          {row.lastname}
                        </TableCell>
                        <TableCell>
                          {row.firstname}
                        </TableCell>
                        <TableCell>
                          {row.professionalschool}
                        </TableCell>
                        <TableCell>
                          {row.score}
                        </TableCell>
                        <TableCell>
                          {row.merit}
                        </TableCell>
                        <TableCell>
                          {row.observation}
                        </TableCell>
                        <TableCell>
                          {row.detail}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </TableMUI>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={totalpages}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Paper>
  );
}