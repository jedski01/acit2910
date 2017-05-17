import React, {Component} from 'react'
import '../../css/order/menu.css'
//import the actions
import {selectItem, addItemToOrder, confirmAction} from '../../actions/order/index';
import NumberFormat from 'react-number-format';
import ActiveItem from './active-item';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
/**
 * This component represents each item in the menu
 * */
class MenuItem extends Component {

    addToOrder() {
        this.props.addItem(this.props.item, true);
    }

    showDetails() {
        this.props.confirmAction("Food details",
                                 "",
                                 <ActiveItem item={this.props.item} isNew={true}/>, null);

    }
    render() {
        /**
         * the structure of the item object is {
         * name: the item name,
         * description: the item description,
         * price: the item price,
         * image: the url of the item's image
         * }
         * use wisely :)
         * the item can be access using this.props.item
         * */
        return (
            <div className="card card-danger text-center menu-item" id="itemInner"
                 >

                <div className="card-header">{this.props.item.name}</div>
                <div className="card-block">
                    <div className="form-group">
                        <button className="btn btn-success col-12"
                                onClick={() => this.props.isClickable && this.showDetails()}>
                            Details
                        </button>
                        <hr/>
                        <button className="btn btn-success col-12"
                            onClick={()=> this.addToOrder()}>Add</button>
                    </div>

                </div>
                <div className="card-footer"><strong>
                    <div className="currency currency-white currency-small"></div>
                    <NumberFormat value={this.props.item.price}
                                  decimalPrecision={2}
                                  displayType={'text'} thousandSeparator={true}
                    /></strong>
                </div>
            </div>
        );
    }
}

/**
 * to hook action to redux we need to do this
 * this is basically making the function as a property
 * rather than using it directly (remember the .props)
 * */
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        selectItem: selectItem,
        addItem: addItemToOrder,
        confirmAction: confirmAction
        //so basically what happens here is that the selectItem function that we imported
        //can now be access via the selectItem as a prop: this.props.selectItem.
    }, dispatch)
}

/**
 * To be able to use the function above we need this function
 * we are basically making this component aware of the action
 * so this component can use it
 *
 * connect is from react-redux
 * */
export default connect(null, matchDispatchToProps)(MenuItem);