import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import EmployeesTable from "../../../components/enterprise/employees/EmployeesTable";
import { useParams } from "react-router-dom";
import { getEmployeesByPage } from "../../../api/enterprise";

const Employees = () => {
  const { page } = useParams();
  const [filters, setFilters] = useState({ limit: 10, keyword: "" });
  const [newPage, setNewPage] = useState(page || 1);
  const [employeesPages, setEmployeesPages] = useState(1);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    const res = await getEmployeesByPage(page, filters);
    setEmployees(res.data);
    setEmployeesPages(res.totalPages);
  };

  useEffect(() => {
    getData();
  }, [filters, newPage]);

  /* const updateFilters = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }; */

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button variant="contained">Create invitation</Button>
      </Grid>
      <Grid item xs={12}>
        <EmployeesTable
          setFilters={setFilters}
          filters={filters}
          employees={employees}
          employeesPages={employeesPages}
          page={newPage}
          setPage={setNewPage}
          getData={getData}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </Grid>
    </Grid>
  );
};

export default Employees;
