import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBasketThunk, getBasketsThunk, updateBasketThunk } from '../store/thunks/baskets';
import { Button, Form, Input, Modal, Table } from 'antd';
import moment from 'moment';
import { getProductsThunk } from '../store/thunks/products';
import { useNavigate } from 'react-router-dom';

export default function Basket() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [basketId, setBasketId] = useState();
  const [note, setNote] = useState();
  const [count, setCount] = useState();
  const showModal = (record) => {
    setVisible(true);
    setBasketId(record.id);
    setNote(record.note);
    setCount(record.count)
    form.setFieldsValue({
      note: record.note,
      count: record.count
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDeleteConfirm = () => {
    console.log(basketId, 'basketId')
    dispatch(deleteBasketThunk(basketId));
    setConfirmVisible(false);
  };

  const handleDeleteCancel = () => {
    setConfirmVisible(false);
  };

  const baskets = useSelector((state) => {
    return state.basket.basketList;
  })
  const token = useSelector((state) => {
    return state.auth.token;
  })

  const productsLists = useSelector((state) => {
    return state.products.products
  })

  const isBasketUpdated = useSelector((state) => {
    return state.basket.isUpdated;
  })
  const isBasketDeleted = useSelector((state) => {
    return state.basket.isDeleted;
  })
  useEffect(() => {
    dispatch(getProductsThunk())
  }, [])

  useEffect(() => {
    dispatch(getBasketsThunk());
  }, [])

  useEffect(() => {
    if (isBasketUpdated || isBasketDeleted)
      dispatch(getBasketsThunk());
  }, [isBasketUpdated, isBasketDeleted])

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Product',
      dataIndex: 'product_id',
      key: 'product_id',
      render: (product_id) => {
        const product = productsLists.find(item => item.id === product_id);
        return product ? product.name : "Unknown";
      },
    },
    {
      title: 'Count',
      dataIndex: 'count',
      key: 'count',

    },
    {
      title: 'Price',
      key: 'price',
      render: (record) => {
        const product = productsLists.find(item => item.id === record.product_id);
        return product ? product.price * record.count : "Unknown";
      },

    },
    {
      title: 'Note',
      key: 'note',
      render: (_, record) => { return record.note }
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
        return <>

          <Button onClick={() => {
            showModal(record);
            setBasketId(record.id);
          }}>Update Basket</Button>
          <Button onClick={() => {
            setBasketId(record.id);
            setConfirmVisible(true)

          }}>Delete Basket</Button>
        </>
      }
    },


  ]

  const onFinish = useCallback((values) => {
    if (basketId) {
      dispatch(updateBasketThunk({ id: basketId, token: token, values }));
      setVisible(!visible);
    }
  }, [basketId, dispatch, token]);


  const totalAmount = baskets.reduce((total, item) => {
    const product = productsLists.find(product => product.id === item.product_id);
    if (product) {
      return total + (product.price * item.count);
    }
    return total;
  }, 0);

  return (
    <>
      <h1>Basket</h1>
      <Button onClick={() => {
        navigate(-1)
      }}>Back To Products</Button>
      <Table dataSource={baskets} columns={columns}></Table>
      <h2>Total Amount: ${totalAmount.toFixed(2)}</h2>
      <Button onClick={() => {
            navigate("/orders")
  
          }}>Create Order</Button>
          
      <Modal
        title="Basket Item"
        open={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basketModal"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}

        >
          <Form.Item
            name="note"
            rules={[{ required: true, message: 'Please input your note!' }]}
          >
            <Input placeholder="Note" />
          </Form.Item>

          <Form.Item
            name="count"
            rules={[{ required: true, message: 'Please input your count!' }]}
          >
            <Input type="number" placeholder="Number" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Delete Basket"
        open={confirmVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      >
        <p>Are you sure you want to delete this basket?</p>
      </Modal>
    </>

  )
}
