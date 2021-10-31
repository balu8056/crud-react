
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
import Notification from "../Notification/Notification";
import CustomModal from "../CustomModal/CustomModal";

import axios from "axios";

import './Table.css';
import '../../index.css'
import urls from "../../helpers/urls.json";

const RenderHeader = ({ selectedJobs, setGlobalFilter, isDeleteAllActive, deleteSelectedJobs, clickAddnew }) => {
    return (
        <div className="table-header">
            Jobs Postings
            <Stack direction="row" spacing={3}>
                {isDeleteAllActive && <Button variant="contained" onClick={() => deleteSelectedJobs(selectedJobs)}>Delete selected </Button>}
                <Button variant="contained" onClick={() => clickAddnew()}>Add new</Button>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Global Search" />
                </span>
            </Stack>
        </div>
    );
}

const ActionBodyTemplate = ({ clickEdit, rowData }) => {
    console.log(rowData);
    return (
        <Button variant="contained" onClick={() => clickEdit()}>Edit</Button>
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

const Table = ({ dataTemp, getTable }) => {

    const tempJob = {
        _id: null,
        _source: {
            source: null,
            job_type: null,
            job_title: null,
            bgtocc: null,
            jobdate: null,
            state: null,
            degree: null,
            salary: null,
        }
    };

    const [jobs, setJobs] = useState(null);
    const [customJob, setCustomJob] = useState(tempJob);
    const [selectedJobs, setSelectedJobs] = useState([]);
    const [isDeleteAllActive, setIsDeleteAllActive] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [triggerNotification, setTriggerNotification] = useState(null);
    const [severity, setSeverity] = useState(null);
    const [message, setMessage] = useState("This is the message!!!");
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const dt = useRef(null);

    useEffect(() => {
        setIsDeleteAllActive(selectedJobs.length > 0 ? true : false);
    }, [selectedJobs]);

    useEffect(() => {
        setJobs(dataTemp);
    }, [dataTemp]);

    const notify = (sev, mes) => {
        setSeverity(sev);
        setMessage(mes);
        setTriggerNotification(prev => !prev);
    }

    useEffect(() => {
        console.log(isOpen);
    }, [isOpen]);

    const clickEdit = (rowJob) => {
        setIsEdit(true);
        setIsOpen(true);
        setCustomJob(rowJob);
    };

    const clickAddnew = () => {
        setIsEdit(false);
        setIsOpen(true);
        setCustomJob(tempJob);
    };

    const deleteSelectedJobs = (selectedJobs) => {
        return false;
    };


    const addJob = (e) => {
        e.preventDefault();
        axios.post(`${urls.baseUrl}/${urls.addjob}`, {...customJob._source})
            .then(res => {
                notify("success", "Added successfuly!!!")
            })
            .catch(err=>{
                notify("error", "Please try again!!!");
            })
    };

    const updateJob = (e) => {
        e.preventDefault();
        console.log(customJob);
        axios.post(`${urls.baseUrl}/${urls.updatejobbyid}/${customJob._id}`, { ...customJob._source })
            .then(res => {
                if (res.status === 200)
                    notify("success", "Updated successfully!!!");
                else
                    notify("error", "Please try again!!!");
            })
            .catch(function (error) {
                console.log(error);
                notify("error", "Please try again!!!");
            })
            .then(() => {
                setTimeout(() => {
                    getTable();
                    setIsOpen(false);
                }, 2000);
            });

    };
    return <>
        <div className="datatable-doc-demo">
            <div className="card">

                <DataTable
                    ref={dt}
                    value={jobs}
                    header={<RenderHeader
                        selectedJobs={selectedJobs}
                        setGlobalFilter={setGlobalFilter}
                        isDeleteAllActive={isDeleteAllActive}
                        deleteSelectedJobs={deleteSelectedJobs}
                        clickAddnew={clickAddnew}
                    />}
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
                    rowsPerPageOptions={[10, 20, 50]}>

                    <Column
                        selectionMode="multiple" style={{ width: '3em' }} />

                    <Column
                        field="_source.source" header="Source"
                        body={sourceTemplate} sortable />

                    <Column
                        field="_source.job_type" header="Job type"
                        body={jobTypeTemplate} sortable />

                    <Column
                        field="_source.job_title" header="Job title"
                        body={jobTitleTemplate} sortable />

                    <Column
                        field="_source.bgtocc" header="BGT Occ"
                        body={bgtoccTemplate} sortable />

                    <Column
                        field="_source.state" header="State"
                        body={stateTemplate} sortable />

                    <Column
                        field="_source.degree" header="Degree"
                        body={degreeTemplate} sortable />

                    <Column
                        field="_source.salary" header="Salary"
                        body={salaryTemplate} sortable />

                    <Column
                        body={(e) => <Button variant="contained" onClick={() => clickEdit(e)}>Edit</Button>} headerStyle={{ width: '8em', textAlign: 'center' }}
                        bodyStyle={{ textAlign: 'center', overflow: 'visible' }} />

                </DataTable>

            </div>
        </div>

        <CustomModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isEdit={isEdit}
            job={customJob}
            setJob={setCustomJob}
            addJob={addJob}
            updateJob={updateJob} />

        {(triggerNotification != null) && <Notification triggerNotification={triggerNotification} severity={severity} message={message} />}
    </>
}

export default Table;