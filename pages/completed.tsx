import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import Page from "../components/Page";
import { fetchOrdersTrackerStatus } from "../data/services";
import CompletedTable from "../components/Table/Views/Completed";

const CompletedPage: NextPage = () => {
  const [orders, setOrders] = useState(null);
  const [workTasks, setWorkTasks] = useState(null);
  const [brands, setBrands] = useState(null);

  useEffect(() => {
    fetchOrdersTrackerStatus(3).then((data: any) => {
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
      <Page layoutTitle="Completed Orders | Work Management System | TuPack">
        {orders && brands && workTasks ? (
          <CompletedTable
            orders={orders}
            workTasks={workTasks}
            brands={brands}
          />
        ) : (
          <div>Loading Table...</div>
        )}
      </Page>
    </>
  );
};

export default CompletedPage;
