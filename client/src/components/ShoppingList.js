import React, { Component } from 'react';
import {
    Container,
    Button,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
// to generate uid before connecting to backend
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types'; 

class ShoppingList extends Component {


    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = (_id) => {
        this.props.deleteItem(_id);
    }

    render() {
        const { items } = this.props.item;
        console.log({items: items});
        return (
            <Container>
                
                <ListGroup>
                    <TransitionGroup className="shoppling-list">
                        { items.map( item => (
                            <CSSTransition key={item._id} timeout={300} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={
                                            this.onDeleteClick.bind(this, item._id)}
                                    >
                                        X
                                    </Button>
                                    <span className="m-2">{item.name}</span>
                                    <span className="m-2" style={{ fontSize: "13px"}}>{item.category}</span>
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>

        )
    }
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    //  console.log({"itemsStateToProps": state.item})
    return ({
    item: state.item
})
}
export default connect(mapStateToProps,  { getItems, deleteItem } )(ShoppingList);
