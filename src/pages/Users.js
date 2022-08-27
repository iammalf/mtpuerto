import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//FIREBASE
import { collection, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
// material
import { Card, Box, Stack, Button, Container, Typography, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit, Preview } from '@mui/icons-material';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// components
import Page from '../components/Page';

export default function Tours() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'tours'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let toursArr = [];
      querySnapshot.forEach((doc) => {
        toursArr.push({ ...doc.data(), id: doc.id });
      });
      setTours(toursArr);
    });
    return () => unsubscribe();
  }, []);

  //DELETE USERS

  const deleteUsers = async (id) => {
    await deleteDoc(doc(db, 'tours', id));
  };

  //CODIGO DATAGRID
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 300,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 400,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      sortable: false,
      width: 200,
      renderCell: (tours) => (
        <Box>
          <Tooltip title="View Details">
            <IconButton color="success">
              <Preview />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit This User">
            <Link to={`/dashboard/edittour/${tours.id}`}>
              <IconButton color="primary">
                <Edit />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Delete this User">
            <IconButton
              color="error"
              onClick={() => {
                deleteUsers(tours.id);
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  //Refencia a la BD Firestore
  // const usersCollection = collection(db, "users");
  //Funcion para mostrar todos los usuarios
  /* const getUsers = async () => {
   const data = await getDocs(usersCollection);
   setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
   console.log(users);
 };
 //usamos useEffect
 useEffect(() => {
   getUsers();
 }, []); */

  //CODIGO DE LA PLANTILLA

  return (
    <Page title="Tours List">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Tours
          </Typography>
          <Link to="/dashboard/newtour">
            <Button variant="contained" color="primary">
              New Tour
            </Button>
          </Link>
        </Stack>

        <Card>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={tours}
              columns={columns}
              pageSize={5}
              components={{ Toolbar: GridToolbar }}
              rowsPerPageOptions={[5, 10, 20]}
              checkboxSelection
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}
