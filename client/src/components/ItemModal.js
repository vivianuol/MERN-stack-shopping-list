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
import { v4 as uuid } from 'uuid';

class ItemModal extends Component {
    state = {
        modal: false,
        name: '',
        category: ''
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
            category: this.state.category
        }

        //console.log({"newItem": newItem});

        //Add item via addItem action
        this.props.addItem(newItem);

        //Close Modal
        this.toggle();
    }

    render() {
        return (
            <div>
                <Button
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggle}
                >
                    Add Item
                </Button>
                
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
    category: state.item.items.category
})


export default connect(mapStateToProps, { addItem })(ItemModal);
