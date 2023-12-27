
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
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(parseInt(searchParams.get('page')!) || 0);
  const [limit, setLimit] = useState(parseInt(searchParams.get('limit')!) || 10);
  const [count, setCount] = useState(0);
  const [allApplicants, setAllApplicants] = useState<Applicant[]>([]);
  const [isLoading, setIsLoading] = useState(true)

  const fetchApplicants = async (page: number, limit: number) => {
    setIsLoading(true);
    const data = await getApplicants(`${import.meta.env.VITE_API_URL}`, { 
      page: (page + 1).toString(), 
      limit: limit.toString(),
      firstname: searchParams.get('firstname') || '',
      lastname: searchParams.get('lastname') || '',
      professionalschool: searchParams.get('professionalschool') || '',
      minimumscore: searchParams.get('minimumscore') || '0',
      maximumscore: searchParams.get('maximumscore') || '2000',
     });
    setIsLoading(false);
    if (data.success) {
      setAllApplicants(data.ok.data);
      setCount(data.ok.count);
    }
  };

  useEffect(() => {
    fetchApplicants(page, limit);
  }, [page, limit, searchParams])


  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
    const queryParamsObject = Object.fromEntries(searchParams);
    setSearchParams({
      ...queryParamsObject,
      page: newPage.toString(),
    });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const limit_ = parseInt(event.target.value);
    setLimit(limit_);
    setPage(0);
    const queryParamsObject = Object.fromEntries(searchParams);
    setSearchParams({
      ...queryParamsObject,
      limit: limit_.toString(),
      page: page.toString(),
    });
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>Cargando...</div>
      ) : (
        <>
          <TableContainer>
            <TableMUI stickyHeader aria-label="sticky table">
              <TableHead className="bg-green-400">
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
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={count}
            rowsPerPage={limit}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Paper>
  );
}