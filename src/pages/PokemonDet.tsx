import { useQuery } from 'react-query';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

interface Result {
  name: string;
  url: string;
}

interface Data {
  count: number;
  next: string | null;
  previous: string | null;
  results: Result[];
}

const PokemonDet = () => {
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");
  const { data, isLoading, error, refetch } = useQuery<Data>({
    queryFn: async () => {
      const response = await axios.get(url);
      return response.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [url, refetch]);

  const results = data?.results;
  const isNextAvailable = data?.next;
  const isPrevAvailable = data?.previous;

  const onNextClick = () => {
    if (data?.next) {
      setUrl(data.next);
    }
  };

  const onPrevClick = () => {
    if (data?.previous) {
      setUrl(data.previous);
    }
  };

  const memoizedResults = useMemo(() => results, [results,url]);

  return (
    <div>
      <TableContainer component={Paper} style={{ width: '100%', marginTop: '50px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={2}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={2}>Error fetching data</TableCell>
              </TableRow>
            ) : (
              memoizedResults?.map((value: Result, index: number) => (
                <TableRow key={index}>
                  <TableCell>{value.name}</TableCell>
                  <TableCell>
                    <a href={value.url}>{value.url}</a>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>
                <Button
                  variant="contained"
                  onClick={onPrevClick}
                  disabled={!isPrevAvailable || isLoading}
                >
                  Prev
                </Button>
                {' '}
                <Button
                  variant="contained"
                  onClick={onNextClick}
                  disabled={!isNextAvailable || isLoading}
                  style={{ marginLeft: '220px' }}
                >
                  Next
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PokemonDet;
