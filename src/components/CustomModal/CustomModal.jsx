import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { grey } from '@mui/material/colors';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "600px",
  height: "400px",
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  pt: 2,
  pl: 4,
  pr: 4,
  pb: 2
};

const CustomModal = ({ isOpen, setIsOpen, isEdit, job, setJob, addJob, updateJob }) => {

  const { _id, _source } = job;
  const { source, job_type, job_title, bgtocc, jobdate, state, degree, salary } = _source;

  const [isUpdateActive, setUpdateActive] = useState(false);

  const onChangeHander = (e) =>
    setJob(p => ({ _id: p._id, _source: { ...p._source, [e.target.id]: e.target.value } }));

  return (
    <div>
      <Modal
        open={isOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form">
          <h3 style={{ paddingBottom: "15px" }}>{isEdit ? "Update Job" : "Add Job"}</h3>
          <CancelRoundedIcon onClick={() => setIsOpen(false)}
            style={{ position: "absolute", right: "-35px", top: "-10px" }}
            sx={{ color: grey[50] }}
            fontSize="large">
          </CancelRoundedIcon>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

            <Grid item xs={6}>
              <TextField
                label="Source"
                id="source"
                defaultValue={source}
                size="small"
                fullWidth
                onChange={onChangeHander}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Job type"
                id="job_type"
                defaultValue={job_type}
                size="small"
                fullWidth
                onChange={onChangeHander}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Job title"
                id="job_title"
                defaultValue={job_title}
                size="small"
                fullWidth
                onChange={onChangeHander}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="BGT Occ"
                id="bgtocc"
                defaultValue={bgtocc}
                size="small"
                fullWidth
                onChange={onChangeHander}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Job date"
                id="jobdate"
                defaultValue={jobdate}
                size="small"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                onChange={onChangeHander}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="State"
                id="state"
                defaultValue={state}
                size="small"
                fullWidth
                onChange={onChangeHander}
              />

            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Degree"
                id="degree"
                defaultValue={degree}
                size="small"
                fullWidth
                onChange={onChangeHander}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Salary"
                id="salary"
                defaultValue={salary}
                size="small"
                fullWidth
                required
                onChange={onChangeHander}
              />
            </Grid>

          </Grid>

          <Grid pt={4}>
            {isEdit ?
              <Button type="submit" fullWidth variant="contained" onClick={(e) => updateJob(e)}>Update</Button>
              : <Button type="submit" fullWidth variant="contained" onClick={(e) => addJob(e)}>Add</Button>}
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
