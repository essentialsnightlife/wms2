import { useEffect, useState } from "react";
import { supabaseClient } from "../lib/client";
import { NextPage } from "next";
import NotStartedTable from "../components/Table/Views/NotStarted";
import Page from "../components/Page";
import { fetchOrdersTrackerStatus } from "../data/services";

const NotStartedPage: NextPage = () => {
  const [orders, setOrders] = useState([{}]);
  const [tasks, setWorkTasks] = useState([{}]);

  useEffect(() => {
    let mounted = true;
    fetchOrdersTrackerStatus(1).then((data) => {
      if (data.workTasks) {
        setOrders(data.orders);
      }
      if (data.workTasks) {
        setWorkTasks(data.workTasks);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Page layoutTitle="Not Started Orders | Work Management System | TuPack">
        {orders && tasks ? (
          <NotStartedTable orders={orders} tasks={tasks} />
        ) : (
          <div>Loading Table...</div>
        )}
      </Page>
    </>
  );
};

export default NotStartedPage;
