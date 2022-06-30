import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Page from '../components/Page';
import { fetchOrdersTrackerStatus } from '../data/services';
import NewOrdersTable from '../components/Table/Views/NewOrders';

const IndexPage: NextPage = () => {
  const [orders, setOrders] = useState([{}]);
  const [tasks, setWorkTasks] = useState([{}]);

  useEffect(() => {
    let mounted = true;
    fetchOrdersTrackerStatus(0).then((data: any) => {
      setOrders(data.orders || [{}]);
      setWorkTasks(data.workTasks || [{}]);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Page layoutTitle="New Orders | Work Management System | TuPack">
        {orders ? (
          <NewOrdersTable orders={orders} tasks={tasks} />
        ) : (
          <div>Loading Table...</div>
        )}
      </Page>
    </>
  );
};

export default IndexPage;
