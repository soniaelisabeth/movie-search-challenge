import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography, 
  CircularProgress 
} from '@mui/material';

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/movies/history');
      setHistory(response.data);
    } catch (error) {
      console.error('Erro ao buscar o histórico:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography
          variant="h3"
          component="h1"
          color="primary"
          align="center"
          gutterBottom
        >
          Histórico de Buscas
      </Typography>
      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {!loading && (
        <TableContainer component={Paper} sx={{ mb: 4, overflowX: 'unset'}}>
          <Table>
            <TableHead
            sx={{
              '& .MuiTableCell-root': {
                color: 'white'
              },
            }}
            >
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Filme</TableCell>
                <TableCell>Data</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.name}</TableCell>
                  <TableCell>{entry.movie}</TableCell>
                  <TableCell>{new Date(entry.date).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default HistoryPage;
