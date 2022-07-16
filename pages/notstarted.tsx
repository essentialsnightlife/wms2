import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import NotStartedTable from '../components/Table/Views/NotStarted';
import Page from '../components/Page';
import { fetchOrdersTrackerStatus } from '../data/services';
import Title from '../components/Title';

const NotStartedPage: NextPage = () => {
  const [orders, setOrders] = useState([{}]);
  const [tasks, setWorkTasks] = useState([{}]);
  const [brands, setBrands] = useState([{}]);

  useEffect(() => {
    fetchOrdersTrackerStatus(1).then((data) => {
      if (data.orders) {
        setOrders(data.orders);
      }
      if (data.workTasks) {
        setWorkTasks(data.workTasks);
      }
      if (data.brands) {
        setBrands(data.brands);
      }
    });
  }, []);

  return (
    <>
      <Page
        layoutTitle="Not Started Orders | Work Management System | TuPack"
        pageName="Not Started Orders"
      >
        {orders && tasks && brands ? (
          <NotStartedTable
            orders={orders}
            tasks={tasks}
            brands={brands}
          />
        ) : (
          <div>Loading Table...</div>
        )}
      </Page>
    </>
  );
};

export default NotStartedPage;
