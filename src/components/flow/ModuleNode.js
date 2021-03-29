import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import './flow-styles.scss';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid blue',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    position: 'fixed',
    top: '10px',
    right: '25px',
  },
}));

function ModuleNode(props) {
  // console.log(props);
  const classes = useStyles();
  const { data } = props;

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div
        className="ModuleNode"
        style={{ backgroundColor: data.color }}
        onClick={handleOpen}
      >
        {/* <MaterialModal /> */}
        <p>{data.label}</p>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        // BackdropComponent={}
        BackdropProps={{
          timeout: 500,
        }}
        // disableEnforceFocus
        // disableBackdropClick
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div
              style={{
                display: 'flex',
                marginLeft: '-25px',
                alignItems: 'center',
                marginTop: '-10px',
              }}
            >
              <IconButton aria-label="close" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
              <h2>{props.data.name}</h2>
            </div>

            <p id="transition-modal-description">
              Shared by:{' '}
              <Link to={`/app/${props.data.applicationID}`}>
                {props.data.applicationID}{' '}
              </Link>
            </p>
            <p id="transition-modal-description">
              Consumed by:{' '}
              <Link to={`/app/${props.data.consumingApplicationID}`}>
                {props.data.consumingApplicationID}
              </Link>
            </p>
            <p id="transition-modal-description">File</p>
            <ul>
              {props.data.usedIn.map((item, i) => (
                <li key={`usedIn${i}`} className="ModuleNode-file">
                  {item.file}
                </li>
              ))}
            </ul>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModuleNode;
