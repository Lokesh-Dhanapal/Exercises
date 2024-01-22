import { Button } from "@mui/material";

interface ButtonData {
  onClick: () => void;
  isAvailable: boolean | null | undefined;
  text: string;
}

const ButtonComponent = ({ onClick, isAvailable, text }: ButtonData) => {
  return (
    <>
      <Button disabled={!isAvailable} onClick={onClick} variant="contained">
        {text}
      </Button>
    </>
  );
};

export default ButtonComponent;
