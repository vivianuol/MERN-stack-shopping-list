import React, { Component } from 'react';
import {
    Button, 
    Modal,
    ModalHeader,
    Form,
    FormGroup,
    Label,
    Input,
    ModalBody
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ItemModal extends Component {
    state = {
        modal: false,
        name: '',
        category: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        user_id: PropTypes.string 

    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newItem = {
            name: this.state.name,
            category: this.state.category,
            user_id: this.props.user ? this.props.user.id : ""
        }

        //console.log({"newItem": newItem});

        //Add item via addItem action
        this.props.addItem(newItem);

        //Close Modal
        this.toggle();
    }

    render() {
        const { isAuthenticated } = this.props;

        return (
            <div>
                {
                    isAuthenticated &&
                <Button
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggle}
                >
                    Add Item
                </Button> 
                }
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add Shopping Item</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='item'>Item</Label>
                                <Input 
                                    type="text"
                                    name="name"
                                    id="item"
                                    placeholder="Add shopping item" 
                                    onChange={this.handleChange}
                                />
                                <Input 
                                    type="text"
                                    name="category"
                                    id="item"
                                    placeholder="set a category" 
                                    onChange={this.handleChange}
                                />
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                >Add Item</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    name: state.item.items.name,
    category: state.item.items.category,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})


export default connect(mapStateToProps, { addItem })(ItemModal);
