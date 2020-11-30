import React, { Component } from 'react';
import {
    Container,
    Button,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// to generate uid before connecting to backend
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {
    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object
    }

    componentDidUpdate(prevProps, prevState) {
        const { isAuthenticated, user } = this.props;

        if (isAuthenticated !== prevProps.isAuthenticated && user !== null) { this.props.getItems(user.id); }
    }

    onDeleteClick = (_id) => {
        this.props.deleteItem(_id);
    }

    render() {
        const { items } = this.props.item;
        const { isAuthenticated } = this.props;
        return (
            <Container>

                <ListGroup>
                    {isAuthenticated ?
                        items.map(item => (
                            <TransitionGroup key={item._id} className="shoppling-list">
                                <CSSTransition timeout={300} classNames="fade">
                                    <ListGroupItem>
                                        <Button
                                            className="remove-btn"
                                            color="danger"
                                            size="sm"
                                            onClick={
                                                this.onDeleteClick.bind(this, item._id)}
                                        > X
                                            </Button>
                                        <span className="m-2">{item.name}</span>
                                        <span className="m-2" style={{ fontSize: "13px" }}>{item.category}</span>
                                    </ListGroupItem>
                                </CSSTransition>
                            </TransitionGroup>
                        ))
                        :
                        <h4 className="mb-3 ml-4">Please login to manage your list</h4>
                    }
                </ListGroup>
            </Container>

        )
    }
}

const mapStateToProps = (state) => {
    //  console.log({"itemsStateToProps": state.item})
    return ({
        item: state.item,
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
    })
}
export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
