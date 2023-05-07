import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Tooltip,
  IconButton,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Typography,
  Toolbar,
  Divider,
  Grid,
} from "@mui/material";
import Pagination from "./Pagination";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import { useSnackbar } from "notistack";
import { formatDate } from "../../../helpers/formatDate";
import { ContactPage, Delete } from "@mui/icons-material";
import routes from "../../../router/routes";

const EmployeesTable = ({
  setFilters,
  filters,
  employees,
  employeesPages,
  page,
  setPage,
  getData,
  isLoading,
  setIsLoading,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [showFilters, setShowFilters] = useState(false);
  const [values, setValues] = useState({ ...filters });

  useEffect(() => {
    setIsLoading(true);
    setIsLoading(false);
  }, [employees]);

  const handleChangePage = (newPage) => {
    setPage(newPage); // newPage es el número de página que se seleccionó
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value }); // event.target.value es el valor del input y prop es el nombre del input
  };

  const handleSubmit = () => {
    setFilters({ ...filters, keyword: values.keyword });
    setPage(1); // Se establece la página en 1 para que se muestre la primera página de resultados
  };
  const handleClearFilters = () => {
    setValues({ keyword: "" });
    setFilters({ ...filters, keyword: "" });
    setPage(1);
  };

  const handleDelete = async (data) => {
    /* const response = await deleteEmployee(data);
    if (response.success) {
      enqueueSnackbar(response.msg, { variant: "success" });
      setTimeout(() => {
        navigate(0);
      }, 1000);
    } else {
      enqueueSnackbar(response.msg, { variant: "error" });
    } */
  };

  return (
    <>
      {isLoading ? null : (
        <TableContainer component={Paper} sx={{ mb: 5, pb: 3 }}>
          <Toolbar sx={{ bgcolor: "primary.main", color: "white" }}>
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Lista de prospectos
            </Typography>
            <Tooltip
              title={showFilters ? "Ocultar filtros" : "Mostrar filtros"}
            >
              <IconButton onClick={() => setShowFilters(!showFilters)}>
                <Typography variant="body2" color={"white"} sx={{ mr: 1 }}>
                  Filtros
                </Typography>
                <FilterListIcon
                  sx={
                    showFilters
                      ? { color: "secondary.main" }
                      : { color: "white" }
                  }
                />
              </IconButton>
            </Tooltip>
          </Toolbar>
          {showFilters && (
            <Grid
              container
              spacing={2}
              sx={{
                bgcolor: "primary.main",
                p: 3,
              }}
            >
              <Grid item xs={12} lg={12}>
                <FormControl variant="outlined" sx={{ width: "100%" }}>
                  <OutlinedInput
                    size="small"
                    value={values.keyword}
                    onChange={handleChange("keyword")} // trim() remueve espacios en blanco al inicio y al final de la cadena
                    onKeyDown={(evt) => {
                      if (evt.key === "Enter") {
                        handleSubmit();
                      }
                    }}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Filtrar por Nombre"
                    sx={{ bgcolor: "white", fontSize: "11pt" }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleSubmit}
                  sx={{ width: "100%" }}
                >
                  Filtrar
                </Button>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleClearFilters}
                  sx={{ width: "100%" }}
                >
                  Limpiar Filtros
                </Button>
              </Grid>
            </Grid>
          )}
          <Divider />
          <Table sx={{ minWidth: 500, mb: 2 }}>
            <TableHead sx={{ bgcolor: "primary.main", color: "white" }}>
              <TableRow>
                <TableCell key="name">Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Fecha de Creación</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ minHeight: 500 }}>
              {employees && employees[0]
                ? employees.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name ? row.name : "N/A"}
                      </TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{formatDate(row.created_at)}</TableCell>
                      <TableCell>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <Link to={`${routes.employees_list}/${row._id}`}>
                              <Tooltip title="Ver detalle" placement="top">
                                <Button
                                  variant="contained"
                                  sx={{ minWidth: "40px", px: 0 }}
                                >
                                  <ContactPage
                                    fontSize="medium"
                                    sx={{ textAlign: "center" }}
                                  />
                                </Button>
                              </Tooltip>
                            </Link>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => handleDelete(row._id)}
                              sx={{ minWidth: "40px", px: 0 }}
                            >
                              <Delete
                                fontSize="medium"
                                sx={{ textAlign: "center" }}
                              />
                            </Button>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
          <Pagination
            pageNumber={page}
            totalCount={employeesPages * 15}
            updatePageNumber={handleChangePage}
            pageSize={filters.limit}
          />
        </TableContainer>
      )}
    </>
  );
};

export default EmployeesTable;
