import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';

import './Table.css';
import '../../index.css'

const RenderHeader = ({setGlobalFilter, isDeleteAllhidden}) => {
    return (
        <div className="table-header">
            Jobs Postings
            <Stack direction="row" spacing={3}>
                {!isDeleteAllhidden && <Button variant="contained">Delete selected </Button>}
                <Button variant="contained">Add new</Button>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Global Search" />
                </span>
            </Stack>
        </div>
    );
}

const actionBodyTemplate = () => {
        // <Button type="button" icon="pi pi-pencil" className="p-button-secondary"></Button>
    return (
        <Button variant="contained">Edit</Button>
    );
}

const sourceTemplate = (rowData) => {
    return (
        <>
            <span className="p-column-title">Source</span>
            {rowData._source.source}
        </>
    );
}

const jobTypeTemplate = (rowData) => {
    return (
        <>
            <span className="p-column-title">Job type</span>
            {rowData._source.job_type}
        </>
    );
}

const jobTitleTemplate = (rowData) => {
    return (
        <>
            <span className="p-column-title">Job title</span>
            {rowData._source.job_title}
        </>
    );
}

const bgtoccTemplate = (rowData) => {
    return (
        <>
            <span className="p-column-title">BGT OCC</span>
            {rowData._source.bgtocc}
        </>
    );
}

const stateTemplate = (rowData) => {
    return (
        <>
            <span className="p-column-title">State</span>
            {rowData._source.state}
        </>
    );
}

const degreeTemplate = (rowData) => {
    return (
        <>
            <span className="p-column-title">Degree</span>
            {rowData._source.degree}
        </>
    );
}

const salaryTemplate = (rowData) => {
    return (
        <>
            <span className="p-column-title">Salary</span>
            {rowData._source.salary}
        </>
    );
}

const EmptyMessage = () => <p style={{ color: 'red' }}>No data available</p>

const Table = ({ dataTemp }) => {

    const [jobs, setJobs] = useState(null);
    const [selectedJobs, setSelectedJobs] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const dt = useRef(null);

    useEffect(() => {
        console.log(selectedJobs);
    }, [selectedJobs]);

    useEffect(() => {
        setJobs(dataTemp);
    }, [dataTemp]);

    return <>
        <div className="datatable-doc-demo">
            <div className="card">

                <DataTable
                    ref={dt}
                    value={jobs}
                    header={<RenderHeader setGlobalFilter={setGlobalFilter} isDeleteAllhidden={true}/>}
                    className="p-datatable-customers"
                    dataKey="_id"
                    rowHover
                    globalFilter={globalFilter}
                    selection={selectedJobs}
                    onSelectionChange={e => setSelectedJobs(e.value)}
                    paginator
                    rows={10}
                    emptyMessage={() => <EmptyMessage />}
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    rowsPerPageOptions={[10, 25, 50]}>

                    <Column
                        selectionMode="multiple" style={{ width: '3em' }} />

                    <Column
                        field="_source.source" header="Source"
                        body={sourceTemplate} sortable filter filterPlaceholder="Search by source" />

                    <Column
                        field="_source.job_type" header="Job type"
                        body={jobTypeTemplate} sortable filter filterPlaceholder="Search by jobtype" />

                    <Column
                        field="_source.job_title" header="Job title"
                        body={jobTitleTemplate} sortable filter filterPlaceholder="Search by job title" />

                    <Column
                        field="_source.bgtocc" header="BGT Occ"
                        body={bgtoccTemplate} sortable filter filterPlaceholder="Search by BGT occ" />

                    <Column
                        field="_source.state" header="State"
                        body={stateTemplate} sortable filter filterPlaceholder="Search by state" />

                    <Column
                        field="_source.degree" header="Degree"
                        body={degreeTemplate} sortable filter filterPlaceholder="Search by degree" />

                    <Column
                        field="_source.salary" header="Salary"
                        body={salaryTemplate} sortable filter filterPlaceholder="Search by salary" />

                    <Column
                        body={actionBodyTemplate} headerStyle={{ width: '8em', textAlign: 'center' }}
                        bodyStyle={{ textAlign: 'center', overflow: 'visible' }} />

                </DataTable>

            </div>
        </div>
    </>
}

export default Table;