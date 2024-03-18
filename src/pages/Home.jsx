import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from '../store/thunks/products';
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import { getAuthThunk, signUpThunk } from '../store/thunks/auth';
import basket from "../assets/basket.png";
import { createBasketThunk, getBasketsThunk } from '../store/thunks/baskets';
import { logout } from '../store/slices/auth';

export default function Home() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [visible, setVisible] = useState(false);
    const [signForm, setSignForm] = useState(false)


    const [count, setCount] = useState();

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const showModalSignUp = () => {
        setSignForm(true);
    };

    const handleCancelSign = () => {
        setSignForm(false);
    };

    const productsLists = useSelector((state) => {
        return state.products.products
    })
    const baskets = useSelector((state) => {
        return state.basket.basketList;
    })
    const successLogin = useSelector((state) => {
        return state.auth.successLogin;
    })

    const isBasketAdded = useSelector((state) => {
        return state.basket.isAdded;
    })
    const token = useSelector((state) => {
        return state.auth.token
    })

    const message = useSelector((state) => {
        return state.auth.message;
    })

    const loginError = useSelector((state) => {
        return state.auth.loginError;
    })

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [])

    useEffect(() => {
        if (successLogin) {
            setVisible(false);
            dispatch(getProductsThunk())
        }
    }, [successLogin, token])

    useEffect(() => {

        dispatch(getBasketsThunk());
    }, [isBasketAdded])

    const onFinish = (values) => {
        dispatch(getAuthThunk(values));
    }




    const regMessage = useSelector((state) => {
        return state.auth.regMessage;
    })

    const onFinishSign = (values) => {
        dispatch(signUpThunk(values))
    }
    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            render: (_, __, index) => index + 1,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Price',
            key: 'price',
            render: (_, record) => { return `$${record?.price}` }
        },
        {
            title: 'Created',
            key: 'created',
            render: (_, record) => { return moment(record?.created_at).format('MMMM Do YYYY, h:mm:ss a') }
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                const isExist = baskets.find(item => (item.product_id === record.id));
                return (
                    token && <Button key={record.id} onClick={() => { dispatch(createBasketThunk({ productId: record.id, count: 1 })) }}>
                        {!isExist ? 'Add Basket' : 'Already Added'}
                    </Button>

                );
            }
        },
    ]


    return (
        <div>
            <div className="login">
                {!token ?
                    <>
                        <Button onClick={showModalSignUp}>Sign Up</Button>
                        <Button onClick={showModal}>Sign In</Button>
                    </>
                    :
                    <Button onClick={() => { dispatch(logout()) }}>Logout</Button>
                }
                <img src={basket} alt="basket" className="basket" onClick={() => { navigate("/basket") }} />
                {token && <span className="basketCount">{baskets.length}</span>}
            </div>

            <h1>Products Store</h1>
            <Table dataSource={productsLists} columns={columns}>
            </Table>



            <Modal
                title="Login"
                open={visible}
                onCancel={handleCancel}
                footer={null}
            >
                <p className='error'>{loginError}</p>
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}

                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="SignUp"
                open={signForm}
                onCancel={handleCancelSign}
                footer={null}
            >
                <p className='error'>{message}</p>
                <Form
                    name="signup"
                    initialValues={{ remember: true }}
                    onFinish={onFinishSign}

                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input type="email" placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input placeholder="Name" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>


    )
}
