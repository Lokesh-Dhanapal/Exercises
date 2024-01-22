import { useState, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { Card, TableContainer } from "@mui/material";
import { Table } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableRow } from "@mui/material";
import { TableCell } from "@mui/material";
import { Paper} from "@mui/material";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import ButtonComponent from "../components/ButtonComponent";

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
const Pokemon = () => {
  const [url, setUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
  );

  const { data, isLoading, isError, refetch } = useQuery<Data>({
    queryFn: async () => {
      const response = await axios.get(url);
      return response.data;
    },
  });
  const result = data?.results;
  const isNextAvailable = data?.next;
  const isPrevAvailable = data?.previous;

  useEffect(() => {
    refetch();
  }, [url, result]);

  const handlePrevClick = () => {
    if (data?.previous) {
      setUrl(data.previous);
    }
  };

  const handleNextClick = () => {
    if (data?.next) {
      setUrl(data?.next);
    }
  };

  const memoizedResults = useMemo(() => result, [result, url]);

  return (
    <div>
      <TableContainer
        component={Paper}
        style={{ width: "100%", marginTop: "50px", marginLeft: "0px" }}
      >
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
                <CircularProgress />
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell>Error Fetching Data</TableCell>
              </TableRow>
            ) : (
              memoizedResults?.map((value) => (
                <TableRow>
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
              <TableCell>
                <ButtonComponent
                  onClick={handlePrevClick}
                  isAvailable={Boolean(isPrevAvailable)}
                  text="PREV"
                />
              </TableCell>
              <TableCell align="right">
              <ButtonComponent
                  onClick={handleNextClick}
                  isAvailable={Boolean(isNextAvailable)}
                  text="NEXT"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Pokemon;
