import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import Page from "../components/Page";
import { fetchBrands, fetchOrdersTrackerStatus } from "../data/services";
import CompletedTable from "../components/Table/Views/Completed";

const CompletedPage: NextPage = () => {
  const [orders, setOrders] = useState(null);
  const [tasks, setWorkTasks] = useState(null);
  const [brands, setBrands] = useState(null);

  useEffect(() => {
    fetchOrdersTrackerStatus(3).then((data: any) => {
      setOrders(data.orders);
      setWorkTasks(data.workTasks);
    });

    const fetchData = async () => {
      // const order = await fetchOneOrder(props.id);
      // if (order) {
      //   setWorkOrder(order || {});
      // }

      // const specificFields = await findSpecificFieldsForOrder(
      //   props.id
      // );
      // if (specificFields) {
      //   setSpecifics(specificFields || {});
      // }

      const brandsData = await fetchBrands();
      if (brandsData) {
        setBrands(brandsData);
      }
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <>
      <Page layoutTitle="Completed Orders | Work Management System | TuPack">
        {orders && tasks? (
          <CompletedTable orders={orders} tasks={tasks} brands={brands} />
        ) : (
          <div>Loading Table...</div>
        )}
      </Page>
    </>
  );
};

export default CompletedPage;
