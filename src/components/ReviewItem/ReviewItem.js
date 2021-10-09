import React from 'react';

const ReviewItem = (props) => {
    const { name, img, price, key, quantity } = props.product;
    const { handleRemove } = props;
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
            <h4 className="product-name">{name}</h4>
            <p>price:{price}</p>
            <p>Quantity:{quantity}</p>
            <button onClick={()=>handleRemove(key)} className="btn-regular">Remove</button>
            </div>
        </div>
    );
};

export default ReviewItem;