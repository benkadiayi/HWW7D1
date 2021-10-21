import * as React from 'react';
import { useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid';
import { server_calls } from '../../api/server'; // ADD THIS
import { useGetData } from '../../custom-hooks';
import { Button,Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle } from '@material-ui/core'; // ADD THESE
  import { CarForm } from '../../components/CarForm';


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Car name', width: 130, editable:true},
    { field: 'price', headerName: 'Price',type: 'number', width: 130, editable:true },
    {
      field: 'description',
      headerName: 'Description',
      
      width: 90,
    },
    {
      field: 'weight',
      headerName: 'weight',
      description: 'This is the weight',
      sortable: false,
      width: 160,
      
    },
  ];


interface gridData{
    data:{
      id?:string;
    }
  }
  
  export const DataTable =  () => {
    
    let { carData, getData } = useGetData();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<gridData>({data:{}})
  
    let handleOpen = () => {
      setOpen(true)
    }
  
    let handleClose = () => {
      setOpen(false)
    }
  
    let deleteData = () => {
      server_calls.delete(`${gridData.data.id!}`)
      getData()
    }
  
    console.log(gridData) // a list of id's from checked rows
  
      return (
          <div style={{ height: 400, width: '100%' }}>
            <h2>Cars In Inventory</h2>
            <DataGrid 
                          rows={carData} 
                          columns={columns} 
                          pageSize={5} 
                          checkboxSelection 
                           
                      />
  
          <Button onClick={handleOpen}>Update</Button>
          <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>
  
            {/*Dialog Pop Up begin */}
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update A Car</DialogTitle>
            <DialogContent>
              <DialogContentText>Car id: {gridData.data.id!}</DialogContentText>
                <CarForm id={`${gridData.data.id!}`}/>
            </DialogContent>
            <DialogActions>
              <Button onClick = {handleClose} color="primary">Cancel</Button>
              <Button onClick={handleClose} color = "primary">Done</Button> 
            </DialogActions>
          </Dialog>
          </div>
        );
  }
  