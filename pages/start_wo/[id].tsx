import { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { QueueSummary } from "../../components/WorkOrderScreens/StartQueue/QueueSummary";
import { SpecificDetails } from "../../components/WorkOrderScreens/SpecificDetails";
import { StartChoices } from "../../components/WorkOrderScreens/StartQueue/StartChoices";
import { ActionStartQueue } from "../../components/WorkOrderScreens/StartQueue/ActionStartQueue";
import {
  fetchWorkers,
  fetchOneOrder,
  fetchWorkTasks,
  findSpecificFieldsForOrder,
} from "../../data/services";
import { supabaseClient } from "../../lib/client";

const Index: NextPage = (props) => {
  const [workOrder, setWorkOrder] = useState({});
  const [specifics, setSpecifics] = useState({});
  const [task, setTasks] = useState({});
  const [workers, setWorkers] = useState({});

  useEffect(() => {
    const fetchNotStartedOrders = async () => {
      const order = await fetchOneOrder(props.id);
      setWorkOrder(order || {});
      const specificFields = await findSpecificFieldsForOrder(props.id);
      setSpecifics(specificFields || {});
      const workTasks = await fetchWorkTasks();
      setTasks(workTasks || {});
      const workers = await fetchWorkers();
      console.log(workTasks, workers);
      setWorkers(workers || {});
    };
    fetchNotStartedOrders().catch(console.error);
    return () => {
      setWorkOrder({});
      setSpecifics({});
      setTasks({});
      setWorkers({});
    };
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let formData = { tracker_status: 2 };

    Array.prototype.forEach.call(e.target.elements, (element: Element) => {
      console.log(element.id, " ", element.value);
      element.id == "declineReason"
        ? (formData = {
            ...formData,
            tracker_status: 99,
            decline_reason: element.value,
          })
        : null;
      element.id == "startDate"
        ? (formData = { ...formData, start_time: element.value })
        : null;
      element.id == "estFinishDate"
        ? (formData = {
            ...formData,
            expected_finish_date: element.value,
          })
        : null;
    });

    const { data, error } = await supabaseClient
      .from("order")
      .update(formData)
      .eq("id", props.id);
    console.log(data);
    if (error) {
      console.log(error.message);
    }
    if (data) {
      alert("Submitted successfully");
    }
  };

  return (
    <>
      {workOrder && task && workers && specifics && (
        <>
          <Layout
            title={`Order #${workOrder.tracking_id} | Queue | WMS | TuPack`}
          />
          <QueueSummary workOrder={workOrder} task={task} />
          <SpecificDetails specifics={specifics} workOrder={workOrder} />
          <form onSubmit={handleSubmit}>
            <StartChoices workers={workers} />
            <ActionStartQueue />
          </form>
        </>
      )}
    </>
  );
};

export default Index;

export async function getServerSideProps(context: any) {
  const id = context.query.id;
  return {
    props: {
      id,
    },
  };
}
