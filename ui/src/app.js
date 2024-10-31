import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, AppBar, Tabs, Tab, Box } from '@mui/material';
import SearchPage from './SearchPage';
import HistoryPage from './HistoryPage';

function App() {
  return (
    <Router>
      <Container maxWidth="md">
        <AppBar
          position="static"
          sx={{ borderBottom: '1px solid #ccc'}}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Tabs
              value={false}
              textColor="inherit"
              TabIndicatorProps={{ style: { backgroundColor: 'white' } }}
            >
              <Tab label="Pesquisar" component={Link} to="/" sx={{ color: 'white' }} />
              <Tab label="Histórico" component={Link} to="/history" sx={{ color: 'white' }} />
            </Tabs>
          </Box>
        </AppBar>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
