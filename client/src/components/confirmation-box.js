import React, {Component} from 'react'
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import {closeConfirmation} from '../actions/order/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class ConfirmationBox extends Component {

    constructor(){
        super();

        this.handleClose = this.handleClose.bind(this);
        this.handleYes = this.handleYes.bind(this);
        this.handleNo = this.handleNo.bind(this);
    }

    handleClose(){
        this.props.closeModal();
    }

    handleYes() {
        console.log("user clicked yes");
        this.props.confirmModalState.todoFunction();
        this.handleClose();
    }

    handleNo() {
        console.log("user clicked no");
        this.handleClose();
    }

    createYesNoButton() {
        if(this.props.confirmModalState.todoFunction) {
            return (
                <div className="right-align" style={{'paddingTop':'15px'}}>
                    <hr/>
                    <button className="btn btn-danger" onClick={this.handleYes}>Yes</button>&nbsp;
                    <button className="btn btn-success" onClick={this.handleNo}>No</button>
                </div>
            )
        }
        return null;
    }
    render() {
        return (
            <div>
                {
                    this.props.confirmModalState.isShowing &&
                    <ModalContainer onClose={this.handleClose}>
                        <ModalDialog onClose={this.handleClose}>
                            <h1>{this.props.confirmModalState.header}</h1>
                            <p>{this.props.confirmModalState.message}</p>
                            {this.props.confirmModalState.component}
                            {this.createYesNoButton()}


                        </ModalDialog>
                    </ModalContainer>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        confirmModalState: state.modalState
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        closeModal: closeConfirmation
    }, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(ConfirmationBox);