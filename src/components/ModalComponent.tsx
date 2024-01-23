import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useQuery } from "react-query";
import {useEffect , useMemo} from "react"
import axios from "axios";
import { CircularProgress } from "@mui/material";

interface ModalData {
  open: boolean;
  onClose: () => void;
  url: string;
}

const ModalComponent = ({ open, onClose, url }: ModalData) => {
  const { data, isLoading, isError, refetch} = useQuery({
    queryKey: ["modalComponent", url],
    queryFn: async () => {
      const response = await axios.get(url);
      return response.data;
    },
    staleTime: 10000,
  });

  useEffect(() => {
    refetch()
  },[data])

  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    maxWidth: "80%",
    bgcolor: "#FFFFFF",
    boxShadow: 24,
    p: 4,
    borderRadius: '5px',
  };

  const contentStyle = {
    marginBottom: "20px",
  };

  const nameStyle = {
    fontFamily: "cursive", 
    color: "#0384fc", 
    fontSize: "2rem", 
    fontWeight: "bold", 
    marginBottom: "10px", 
  };

  const memoizedResults = useMemo(() => data, [data]);

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {isLoading && <><Typography>Loading...</Typography><br/><CircularProgress/></>}
          {isError && <Typography>Error fetching data</Typography>}
          {data && (
            <>
              <Typography variant="h6" component="h2" sx={{ ...nameStyle, ...contentStyle }}>
                {memoizedResults.name}
              </Typography>
              <Typography sx={contentStyle}>
                <strong>Experience:</strong> {memoizedResults.base_experience}
              </Typography>
              <Typography sx={contentStyle}>
                <strong>Ability:</strong> {memoizedResults.abilities[0].ability.name}
              </Typography>
              <Typography sx={contentStyle}>
                <strong>Height:</strong> {memoizedResults.height}
              </Typography>
              <Typography sx={contentStyle}>
                <strong>Weight:</strong> {memoizedResults.weight}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ModalComponent;
