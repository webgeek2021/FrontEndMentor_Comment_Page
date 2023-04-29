import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeleteModal = (props) => {

    return (
        <>

            <Modal show={props.show} onHide={props.handleClose} centered className='delete-modal'>
                <Modal.Header>
                    <Modal.Title>Delete comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure , you want to delete this comment ? This will remove the comment and can't be undone</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className='cancel-btn' onClick={()=>props.handleClose()}>
                        No , Cancel
                    </Button>
                    <Button variant="primary" className='delete-btn' onClick={()=>props.handleDelete(props.parentId,props.childId)}>
                        Yes , Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteModal