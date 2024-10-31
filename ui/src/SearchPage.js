import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Modal, CircularProgress, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function SearchPage() {
  const [name, setName] = useState('');
  const [movie, setMovie] = useState('');
  const [movieFound, setMovieFound] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (name && movie) {
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:5000/movies/search', { name, movie });
        setMovieFound(response.data.existing_records || []);
        setShowModal(true);
      } catch (error) {
        console.error('Erro ao buscar o filme:', error);
        alert('Ocorreu um erro ao buscar o filme. Por favor, tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Por favor, insira seu nome e o título do filme.');
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const getSearchResult = (entry) => {
    return Object.entries(entry)
      .filter(([key]) => key !== '_id' && key !== 'name')
      .map(([key, value]) => (
        <Typography key={key} variant="body1">
          <strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> {value}
        </Typography>
      ));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
      <Typography
          variant="h3"
          component="h1"
          color="primary"
          align="center"
          gutterBottom
        >
          Busca de Filmes
      </Typography>
      <TextField
        label="Digite seu nome"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        fullWidth
      />
      <TextField
        label="Digite o título do filme"
        variant="outlined"
        value={movie}
        onChange={(e) => setMovie(e.target.value)}
        margin="normal"
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleSearch} sx={{ mt: 2 }}>
        Buscar
      </Button>
      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
          <CircularProgress />
        </Box>
      )}
      <Modal open={showModal} onClose={closeModal}>
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 600,
            bgcolor: 'background.paper',
            boxShadow: 3,
            borderRadius: 2,
            p: 4,
          }}
        >
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={closeModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="h5" component="h2" gutterBottom>
            Resultados Encontrados
          </Typography>
          {movieFound.length > 0 ? (
            movieFound.map((entry, index) => (
              <Box key={index} my={2} borderBottom={1} borderColor="divider" pb={2}>
                <Typography variant="h6" gutterBottom>
                  {entry.name}
                </Typography>
                {getSearchResult(entry)}
              </Box>
            ))
          ) : (
            <Typography variant="body1">Nenhum filme encontrado.</Typography>
          )}
        </Box>
      </Modal>
    </Box>
  );
}

export default SearchPage;
