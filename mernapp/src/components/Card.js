import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    const handleAddToCart = async () => {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
        console.log(data);
    }

    let finalPrice = qty * parseInt(options[size]);

    useEffect(() => {
        setSize(priceRef.current.value);
    }, [setSize]);

    return (
        <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "420px", backgroundColor: "#ebebf0" }}>
            <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "140px", objectFit: "fill" }} />
            <div className="card-body">
                <h5 className="card-title" style={{ color: 'black', textAlign: 'center' }}>
                    {props.foodItem.name}
                </h5>
                <div className='container w-100'>
                    <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                        {Array.from(Array(6), (e, i) => {
                            return (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            )
                        })}
                    </select>
                    <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                        {priceOptions.map((data) => {
                            return <option key={data} value={data}>{data}</option>
                        })}
                    </select>
                    <div className='d-inline h-100 fs-5' style={{ color: 'black' }}>
                        ₹{finalPrice}/-
                    </div>
                    <div>
                        <hr></hr>
                        <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
