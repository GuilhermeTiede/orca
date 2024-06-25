import {styled} from "@mui/material/styles";
import {Toolbar} from "@mui/material";

export const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 50,
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 30,
  borderRadius: 5
}));
