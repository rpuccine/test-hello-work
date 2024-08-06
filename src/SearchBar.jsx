import {Box, Button, TextField} from "@mui/material";

export default function SearchBar({
  loading,
  clickHandler,
  what,
  setWhat,
  where,
  setWhere
}) {
  const handleWhatChange = (event) => {
    setWhat(event.target.value);
  };

  const handleWhereChange = (event) => {
    setWhere(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'end',
        gap: 2,
        mt: 4
      }}
    >
      <TextField
        fullWidth
        id="input-what"
        label="Quel emploi recherchez-vous ?"
        variant="standard"
        margin="normal"
        value={what}
        onChange={handleWhatChange}
      />
      <TextField
        fullWidth
        id="outlined-where"
        label="Où ?"
        variant="standard"
        margin="normal"
        value={where}
        onChange={handleWhereChange}
      />
      <Button
        fullWidth
        variant="contained"
        disabled={loading}
        onClick={clickHandler}
        sx={{
          height: 'fit-content',
          marginBottom: 1
        }}
      >
        {loading ? 'Loading...' : 'Recherchez'}
      </Button>
    </Box>
  );
}