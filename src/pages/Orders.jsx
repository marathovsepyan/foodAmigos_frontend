import { Button, Form, Input, Table } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createOrdersThunk, getOrdersThunk } from '../store/thunks/orders';
import moment from 'moment';

export default function Orders() {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => {
    return state.order.orders;
  })

  const isCreated = useSelector((state) => {
    return state.order.isOrderCreated;
  })

  useEffect(() => {
    dispatch(getOrdersThunk());

  }, [])

  useEffect(() => {
    if (isCreated)
      dispatch(getOrdersThunk());
  }, [isCreated])
 

  const onFinish = (values) => {
    dispatch(createOrdersThunk(values))
  };

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
      key: 'name'    
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number',

    },
    {
      title: 'Shipping Address',
      key: 'shipping_address',
      dataIndex:"shipping_address"    
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex:"status"    
    },
    {
      title: 'Total',
      key: 'total',
      dataIndex:"total"    
    },
    {
      title: 'Created',
      key: 'created',
      render: (_, record) => { return moment(record?.created_at).format('MMMM Do YYYY, h:mm:ss a') }
    }

  ]

  return (<>
    <div>Order</div>
    <Form
      name="order"
      initialValues={{ remember: true }}
      style={{ maxWidth: 600, margin: "0 auto" }}
      onFinish={onFinish} 

    >
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input placeholder="Name" />
      </Form.Item>

      <Form.Item
        name="phone_number"
        rules={[{ required: true, message: 'Please input your Phone number!' }]}
      >
        <Input placeholder="Phone Number" />
      </Form.Item>
      <Form.Item
        name="shipping_address"
        rules={[{ required: true, message: 'Please input your Shipping Address!' }]}
      >
        <Input placeholder="Shipping Address" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Order
        </Button>
      </Form.Item>
    </Form>

    <Table dataSource={orderList} columns={columns}></Table>
  </>
  )
}
