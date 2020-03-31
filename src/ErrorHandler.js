import React, { Component } from 'react';
import Modal from './components/UI/Modal/Modal';
// import axios from './axios';


const withErrorHandler = ( WrappedComponent , axios) => {
    return class extends Component {
        state = { error : null}

        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            })
            axios.interceptors.response.use(res => res, err => {
                this.setState({error: err})
            })
        }

        errorConfirmHandler = () => {
            this.setState({error : null})
    
        }


        render() {
            return (
            <>
            {/* this.state.error.message... the messsage is givn by the error object of firebase */}
            <Modal showModal={this.state.error}
            closeBack={this.errorConfirmHandler}>
                {this.state.error ? this.state.error.message : null} 
            </Modal>
            <WrappedComponent {...this.props}/>
            </>
            )
        }
    }
};

export default withErrorHandler;